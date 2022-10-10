import { useState } from "react";
import { Resources } from "../Resources";
import { Season } from "../Season";
import { SideBar, TABS } from "../SideBar";

export const Editor = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].name);

  return (
    <div className="flex flex-col md:flex-col lg:flex-row max-w-7xl">
      <div>
        <SideBar onChange={(tab) => setActiveTab(tab)} />
      </div>
      <div className="p-6 flex flex-row box-border">
        {activeTab === "Resources" && <Resources />}
        {activeTab === "Season" && <Season />}
      </div>
    </div>
  );
};
