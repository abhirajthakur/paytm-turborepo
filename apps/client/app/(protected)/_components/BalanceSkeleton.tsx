import { Skeleton } from "@repo/ui/skeleton";

export const BalanceSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-2 w-32" />
        <Skeleton className="h-2 w-20" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-2 w-28" />
        <Skeleton className="h-2 w-20" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-2 w-24" />
        <Skeleton className="h-2 w-20" />
      </div>
    </div>
  );
};
