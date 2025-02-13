// Code by Francis
import { Skeleton } from '@/components/ui/skeleton'


const Loading = () => {
  return (
    <div className="p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="bg-accent h-8 w-1/3" />
          <Skeleton className="bg-accent h-4 w-1/2" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="bg-accent h-32 w-full rounded-lg" />
          <Skeleton className="bg-accent h-32 w-full rounded-lg" />
          <Skeleton className="bg-accent h-32 w-full rounded-lg" />
          <Skeleton className="bg-accent h-32 w-full rounded-lg" />
        </div>
        <div>
          <Skeleton className="bg-accent h-96 w-full rounded-lg" />
        </div>
      </div>
  )
}

export default Loading