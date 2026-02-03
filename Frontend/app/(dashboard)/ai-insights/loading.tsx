import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex flex-col p-4 sm:p-6 space-y-4 sm:space-y-6 mx-auto w-full max-w-[640px] sm:max-w-5xl">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40 sm:w-64" />
          <Skeleton className="h-4 w-56 sm:w-72" />
        </div>
        <Skeleton className="h-9 w-24" />
      </div>

      <div className="flex flex-col md:flex-row gap-2 sm:gap-4">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-24" />
      </div>

      <div className="w-full">
        <div className="flex gap-2 overflow-x-auto">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-8 w-28" />
        </div>
        <div className="mt-4">
          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-64 mt-2" />
            </CardHeader>
            <CardContent className="pt-2 pb-4 sm:p-6">
              <Skeleton className="h-40 sm:h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
