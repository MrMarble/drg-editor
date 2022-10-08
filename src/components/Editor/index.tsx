import { useState } from "react";
import { Resources } from "../Resources";
import { SideBar, TABS } from "../SideBar";

export const Editor = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].name);
  return (
    <div className="flex m-h-100">
      <SideBar onChange={(tab) => setActiveTab(tab)} />
      <div className="p-6">
        {activeTab === "Resources" && <Resources />}
        {activeTab === "Drill" && <div>Resources</div>}
      </div>
    </div>
  );
};
