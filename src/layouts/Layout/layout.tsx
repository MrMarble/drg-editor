import { Outlet } from "react-router-dom";
import GithubButton from "../../components/UI/GithubButton";

export const Layout = () => (
  <div className="flex flex-col items-center w-full h-screen justify-center py-4">
    <div className="drg-title justify-center font-medium text-2xl drg-framer text-center min-w-[400px] max-w-[90%] w-auto py-2 mb-6 uppercase">
      DRG Editor
    </div>
    <div className="shadow-md max-w-[90%] p-6 bg-gray-800 drg-framer !border-b-[15px] max-h-[90%] overflow-auto transition-all duration-1000 drg-scrollbar">
      <Outlet />
    </div>
    <GithubButton />
  </div>
);
