export default function NewsArticleLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        {/* Back button skeleton */}
        <div className="mb-8">
          <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Category badge + date skeleton */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Title skeleton */}
        <div className="space-y-3 mb-8">
          <div className="h-9 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-9 w-3/4 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Image skeleton */}
        <div className="aspect-video w-full bg-gray-200 rounded-xl animate-pulse mb-10" />

        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-4/6 bg-gray-100 rounded animate-pulse" />
          <div className="h-8 w-0 bg-transparent" />
          <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}
