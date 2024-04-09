import { Skeleton } from "@repo/ui/skeleton";

export const TransactionSkeleton = () => {
  return (
    <div>
      <div className="flex justify-between items-center py-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-[72px]" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-2 w-28" />
        <Skeleton className="h-2 w-24" />
      </div>
    </div>
  );
};
