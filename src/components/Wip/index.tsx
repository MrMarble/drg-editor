import { TbBarrierBlock } from "react-icons/tb";
export const WIP = () => {
  return (
    <div className="col-span-full flex max-h-full w-full justify-center overflow-hidden opacity-60">
      <div className="flex flex-col items-center justify-center">
        <TbBarrierBlock size="10em" className="text-gray-800" />
        <h1 className="text-3xl text-gray-600">Work in progress...</h1>
      </div>
    </div>
  );
};
