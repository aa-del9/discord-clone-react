import { Skeleton } from "../ui/skeleton";

export const MemberItemSkeleton = () => {
  return (
    <div className="flex items-center space-x-4 px-5 py-2">
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-4 flex-1" />
    </div>
  );
};
