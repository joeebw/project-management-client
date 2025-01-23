import { Grid3x3, List } from "lucide-react";
import { useState } from "react";

const TABS = [
  { value: "board", label: "Board", icon: Grid3x3 },
  { value: "list", label: "List", icon: List },
];

const TabsProject = () => {
  const [selectedTab, setSelectedTab] = useState("board");

  return (
    <div className="w-full">
      <div className="flex gap-5 mx-5 border-b border-gray-300">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedTab(tab.value)}
            className={`px-4 py-3 relative ${
              selectedTab === tab.value
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <tab.icon className="w-5 h-5" /> {tab.label}
            </div>
            {selectedTab === tab.value && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabsProject;
