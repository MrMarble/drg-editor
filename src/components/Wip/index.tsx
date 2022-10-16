import { TbBarrierBlock } from "react-icons/tb";
export const WIP = () => {
  return (
    <div className="w-full col-span-full flex justify-center opacity-60 max-h-full overflow-hidden">
      <div className="flex flex-col justify-center items-center">
        <TbBarrierBlock size="10em" className="text-gray-800" />
        <h1 className="text-3xl text-gray-600">Work in progress...</h1>
      </div>
    </div>
  );
};
