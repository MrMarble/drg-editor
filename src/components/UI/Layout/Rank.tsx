import type { FC, PropsWithChildren } from "react";

const Rank: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="not-first:mt-10">
      <span className="border-drg-primary-500 border-b-2 text-sm capitalize">
        Rank
      </span>
      <div className="grid-cols mt-3 grid grid-rows-1 gap-2 md:w-auto md:grid-cols-2 lg:grid-cols-2 lg:gap-x-10 xl:grid-cols-3">
        {children}
      </div>
    </div>
  );
};

export default Rank;
