// ─────────────────────────────────────────────────────
// Input validation for EvaluationPackage create/update payloads.
//
// Used by:
//   - POST /api/ai-evaluation/packages
//   - PATCH /api/ai-evaluation/packages/[id]
//
// Returns a `valid` flag plus a `fieldErrors` map suitable for direct
// return to the client. A separate `normalized` object is also provided
// with trimmed/canonicalised values ready to write to Firestore.
// ─────────────────────────────────────────────────────

import type { AnalystAgent, AnalystCriterion } from '@/types/ai-evaluation'

export interface PackageInputBody {
  name?: unknown
  description?: unknown
  sharedPreamble?: unknown
  synthesisPrompt?: unknown
  agents?: unknown
  isDefault?: unknown
}

export interface NormalizedPackage {
  name: string
  description: string
  sharedPreamble: string
  synthesisPrompt: string
  agents: AnalystAgent[]
  isDefault: boolean
}

export interface PackageValidation {
  valid: boolean
  fieldErrors: Record<string, string>
  normalized?: NormalizedPackage
}

const AGENT_ID_PATTERN = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/
const MAX_AGENTS = 15
const MIN_AGENTS = 1
const WEIGHT_TOLERANCE = 0.5

export function validatePackageInput(raw: unknown): PackageValidation {
  const errors: Record<string, string> = {}

  if (!raw || typeof raw !== 'object') {
    return { valid: false, fieldErrors: { _root: '요청 본문이 비어 있습니다.' } }
  }

  const body = raw as PackageInputBody

  const name = asString(body.name).trim()
  if (!name) errors.name = '이름은 필수입니다.'
  else if (name.length > 200) errors.name = '이름은 200자 이하여야 합니다.'

  const description = asString(body.description).trim()
  if (!description) errors.description = '설명은 필수입니다.'
  else if (description.length > 2000)
    errors.description = '설명은 2000자 이하여야 합니다.'

  const sharedPreamble = asString(body.sharedPreamble).trim()
  if (!sharedPreamble) errors.sharedPreamble = '공통 preamble은 필수입니다.'

  const synthesisPrompt = asString(body.synthesisPrompt).trim()
  if (!synthesisPrompt) errors.synthesisPrompt = '종합 프롬프트는 필수입니다.'

  // ── agents ─────────────────────────────────────────
  if (!Array.isArray(body.agents)) {
    errors.agents = 'agents는 배열이어야 합니다.'
    return { valid: false, fieldErrors: errors }
  }

  const agentsRaw = body.agents
  if (agentsRaw.length < MIN_AGENTS)
    errors.agents = `최소 ${MIN_AGENTS}명의 에이전트가 필요합니다.`
  if (agentsRaw.length > MAX_AGENTS)
    errors.agents = `에이전트는 최대 ${MAX_AGENTS}명까지 허용됩니다.`

  const normalizedAgents: AnalystAgent[] = []
  const seenIds = new Set<string>()
  let weightSum = 0

  agentsRaw.forEach((a: unknown, idx: number) => {
    if (!a || typeof a !== 'object') {
      errors[`agents[${idx}]`] = '에이전트 객체가 필요합니다.'
      return
    }
    const ag = a as Record<string, unknown>

    const id = asString(ag.id).trim()
    if (!id) {
      errors[`agents[${idx}].id`] = 'id가 필요합니다.'
    } else if (!AGENT_ID_PATTERN.test(id)) {
      errors[`agents[${idx}].id`] =
        'id는 영문 소문자·숫자·하이픈만 허용됩니다. (예: vc-analyst)'
    } else if (seenIds.has(id)) {
      errors[`agents[${idx}].id`] = `중복된 id: ${id}`
    } else {
      seenIds.add(id)
    }

    const role = asString(ag.role).trim()
    if (!role) errors[`agents[${idx}].role`] = 'role이 필요합니다.'

    const tagline = asString(ag.tagline).trim()
    if (!tagline) errors[`agents[${idx}].tagline`] = 'tagline이 필요합니다.'

    const persona = asString(ag.persona).trim()
    if (!persona) errors[`agents[${idx}].persona`] = 'persona가 필요합니다.'

    const systemPrompt = asString(ag.systemPrompt).trim()
    if (!systemPrompt)
      errors[`agents[${idx}].systemPrompt`] = 'systemPrompt가 필요합니다.'

    const scoringRubric = asString(ag.scoringRubric).trim()
    if (!scoringRubric)
      errors[`agents[${idx}].scoringRubric`] = 'scoringRubric이 필요합니다.'

    const focusAreas = Array.isArray(ag.focusAreas)
      ? (ag.focusAreas as unknown[]).map((x) => asString(x).trim()).filter(Boolean)
      : []
    if (focusAreas.length === 0) {
      errors[`agents[${idx}].focusAreas`] = '최소 1개의 focusArea가 필요합니다.'
    }

    const weightRaw = ag.weight
    const weight =
      typeof weightRaw === 'number'
        ? weightRaw
        : typeof weightRaw === 'string'
          ? Number(weightRaw)
          : NaN
    if (!Number.isFinite(weight) || weight < 0 || weight > 100) {
      errors[`agents[${idx}].weight`] = 'weight는 0~100 숫자여야 합니다.'
    } else {
      weightSum += weight
    }

    const orderRaw = ag.order
    const order =
      typeof orderRaw === 'number'
        ? orderRaw
        : typeof orderRaw === 'string'
          ? Number(orderRaw)
          : idx + 1

    const accentColor = asString(ag.accentColor).trim() || '#4F46E5'

    const criteriaRaw = ag.criteria
    let criteria: AnalystCriterion[] | undefined
    if (Array.isArray(criteriaRaw) && criteriaRaw.length > 0) {
      criteria = []
      let cWeightSum = 0
      criteriaRaw.forEach((c: unknown, cIdx: number) => {
        if (!c || typeof c !== 'object') {
          errors[`agents[${idx}].criteria[${cIdx}]`] = '기준 객체가 필요합니다.'
          return
        }
        const cr = c as Record<string, unknown>
        const cid = asString(cr.id).trim()
        const label = asString(cr.label).trim()
        const cdesc = asString(cr.description).trim()
        const cw =
          typeof cr.weight === 'number'
            ? cr.weight
            : typeof cr.weight === 'string'
              ? Number(cr.weight)
              : NaN
        if (!cid) errors[`agents[${idx}].criteria[${cIdx}].id`] = 'id가 필요합니다.'
        if (!label)
          errors[`agents[${idx}].criteria[${cIdx}].label`] = 'label이 필요합니다.'
        if (!cdesc)
          errors[`agents[${idx}].criteria[${cIdx}].description`] = '설명이 필요합니다.'
        if (!Number.isFinite(cw) || cw < 0 || cw > 100) {
          errors[`agents[${idx}].criteria[${cIdx}].weight`] =
            'weight는 0~100 숫자여야 합니다.'
        } else {
          cWeightSum += cw
        }
        criteria!.push({ id: cid, label, description: cdesc, weight: cw })
      })
      if (Math.abs(cWeightSum - 100) > WEIGHT_TOLERANCE) {
        errors[`agents[${idx}].criteria`] = `criteria 가중치 합이 100이 아닙니다. (${cWeightSum})`
      }
    }

    normalizedAgents.push({
      id,
      role,
      tagline,
      persona,
      systemPrompt,
      focusAreas,
      scoringRubric,
      weight,
      order,
      accentColor,
      criteria,
    })
  })

  if (Math.abs(weightSum - 100) > WEIGHT_TOLERANCE) {
    errors.agentsWeight = `모든 에이전트 weight 합계는 100이어야 합니다. (현재 ${weightSum})`
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, fieldErrors: errors }
  }

  return {
    valid: true,
    fieldErrors: {},
    normalized: {
      name,
      description,
      sharedPreamble,
      synthesisPrompt,
      agents: normalizedAgents,
      isDefault: body.isDefault === true,
    },
  }
}

function asString(v: unknown): string {
  return typeof v === 'string' ? v : ''
}
