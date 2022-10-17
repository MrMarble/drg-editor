import { Suspense, useState } from "react";
import { lazyWithPreload } from "react-lazy-with-preload";
import type { DWARFS } from "../../constant/dwarfs";
import { Resources } from "../Resources";
import { SideBar, TABS } from "../SideBar";

const Season = lazyWithPreload(() => import("../Season/Season"));
const Dwarf = lazyWithPreload(() => import("../Dwarf/Dwarf"));

export const Editor = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].name);

  const onHover = (tab: string) => {
    switch (tab) {
      case "Resources":
        break;
      case "Season":
        Season.preload();
        break;
      default:
        Dwarf.preload();
        break;
    }
  };

  return (
    <>
      <div className="drg-title justify-center font-medium text-2xl drg-framer text-center min-w-[400px] max-w-[90%] w-auto py-2 mb-6 uppercase">
        DRG Editor
      </div>
      <div className="shadow-md max-w-[90%] p-6 bg-gray-800 drg-framer !border-b-[15px] max-h-[90%] overflow-auto transition-all duration-1000 drg-scrollbar">
        <div className="flex flex-col md:flex-col lg:flex-row max-w-7xl">
          <div>
            <SideBar onChange={(tab) => setActiveTab(tab)} onHover={onHover} />
          </div>
          <div className="p-6 flex flex-row box-border w-auto h-full lg:w-[1200px] lg:h-[700px]">
            {activeTab === "Resources" && <Resources />}
            <Suspense>{activeTab === "Season" && <Season />}</Suspense>
            {!["Resources", "Season"].includes(activeTab) && (
              <Suspense>
                <Dwarf key={activeTab} dwarf={activeTab as DWARFS} />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
