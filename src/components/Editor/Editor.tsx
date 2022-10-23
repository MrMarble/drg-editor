import { useState } from "react";
import type { DWARFS } from "../../constant/dwarfs";
import { Dwarf } from "../Dwarf";
import { Resources } from "../Resources";
import { Season } from "../Season";
import { SideBar, TABS } from "../SideBar";

export const Editor = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].name);

  return (
    <div className="flex max-w-7xl flex-col md:flex-col lg:flex-row">
      <div>
        <SideBar onChange={(tab) => setActiveTab(tab)} />
      </div>
      <div className="box-border flex h-full w-auto flex-row p-6 lg:h-[700px] lg:w-[1200px]">
        {activeTab === "Resources" && <Resources />}
        {activeTab === "Season" && <Season />}
        {!["Resources", "Season"].includes(activeTab) && (
          <Dwarf key={activeTab} dwarf={activeTab as DWARFS} />
        )}
      </div>
    </div>
  );
};

export default Editor;
