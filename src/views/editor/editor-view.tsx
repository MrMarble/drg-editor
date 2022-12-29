import { DWARFS } from "@/constant";
import { Layout } from "@/layouts/Layout";
import { SideBar, TABS } from "@/layouts/SideBar";
import { memo, useState } from "react";
import Dwarf from "./tabs/dwarf";
import Resources from "./tabs/resources";
import Season from "./tabs/season";

export const EditorView = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].name);
  console.log("EditorView");
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Layout>
      <SideBar handleClick={handleTabClick}>
        <RenderSwitch activeTab={activeTab} />
      </SideBar>
    </Layout>
  );
};

const RenderSwitch = memo(function RenderSwitch({
  activeTab,
}: {
  activeTab: string;
}) {
  console.log("RenderSwitch");

  switch (activeTab) {
    case TABS[0].name:
      return <Resources key={activeTab} />;
    case TABS[1].name:
      return <Season key={activeTab} />;
    default:
      return <Dwarf dwarf={activeTab as DWARFS} key={activeTab} />;
  }
});
