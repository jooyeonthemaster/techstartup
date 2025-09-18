"use client";

import React from "react";

type GoogleMapEmbedProps = {
  /**
   * Google Maps 공유 → 지도 퍼가기에서 받은 iframe src 전체 또는 장소/주소 문자열
   */
  srcOrQuery: string;
  /**
   * 세로 높이(px). 기본 450
   */
  height?: number;
  /**
   * 둥근 모서리 등 외곽 스타일을 Tailwind로 조절할 때 래퍼 클래스
   */
  className?: string;
  /**
   * 접근성용 제목
   */
  title?: string;
};

/**
 * Google 지도 API 키 없이 iframe 임베드로 표시하는 컴포넌트
 * - 공유 → 지도 퍼가기의 iframe src를 그대로 넣거나
 * - 주소/장소명을 넣으면 검색 쿼리 기반 공개 URL을 사용합니다
 */
export default function GoogleMapEmbed({
  srcOrQuery,
  height = 450,
  className,
  title = "Google Map",
}: GoogleMapEmbedProps) {
  const isFullEmbedSrc = /^(https?:)?\/\/.*(google\.com\/maps|goo\.gl\/maps)/i.test(srcOrQuery);

  const iframeSrc = isFullEmbedSrc
    ? srcOrQuery
    : `https://www.google.com/maps?q=${encodeURIComponent(srcOrQuery)}&output=embed`;

  return (
    <div className={className}>
      <div className="w-full" style={{ height: `${height}px` }}>
        <iframe
          title={title}
          src={iframeSrc}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );
}


