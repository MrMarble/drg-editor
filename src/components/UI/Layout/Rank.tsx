import type { FC, PropsWithChildren } from "react";

const Rank: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="not-first:mt-10">
      <span className="border-b-2 border-drg-primary-500 capitalize text-sm">
        Rank
      </span>
      <div className="mt-3 md:w-auto grid grid-cols grid-rows-1 gap-2 md:grid-cols-2 lg:grid-cols-2 lg:gap-x-10 xl:grid-cols-3">
        {children}
      </div>
    </div>
  );
};

export default Rank;
