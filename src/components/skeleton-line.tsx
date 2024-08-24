import { Skeleton } from "./ui/skeleton";

export function SkeletonLine() {
  return (
    <div className="flex w-full items-center space-x-4">
      <div className="w-full space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
