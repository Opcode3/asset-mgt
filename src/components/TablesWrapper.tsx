import { useAuthStore } from "../store/authStore";
import { useTabStore, type TabType } from "../store/tabStore";
import { AssetTable } from "./tables/AssetTable";
import { AssignAssetTable } from "./tables/AssignAssetTable";
import { ReturnedAssetTable } from "./tables/ReturnedAssetTable";
import { StaffTable } from "./tables/StaffTable";

export default function TablesWrapper() {
  const { tab, setTab } = useTabStore();
  const { user } = useAuthStore();
  const tabs: {
    name: string;
    type: TabType;
    role?: string;
  }[] = [
    { name: "Staff", type: "staff", role: "admin" },
    { name: "Assets", type: "assets" },
    { name: "Assignments", type: "assignments" },
    { name: "Returns", type: "return" },
  ];

  return (
    <div className="py-9 w-full px-[140px] mx-auto  ">
      <div className="pb-4 bg-white rounded-md shadow overflow-hidden">
        <ul className="flex items-center text-gray-600 bg-gray-50 font-medium w-fit">
          {tabs
            .filter((item) => {
              if (item.role) {
                if (!user) {
                  setTab("assets");
                  return false;
                }
                return item.role === user.role;
              }
              return true;
            })
            .map((item) => (
              <li
                className={` block rounded-md px-5 py-3 text-sm cursor-pointer ${item.type === tab ? "bg-gray-200" : ""}`}
                key={item.name}
                onClick={() => {
                  setTab(item.type);
                }}
              >
                {item.name}
              </li>
            ))}
        </ul>

        {loadTableUi(tab)}
        {/* <StaffTable /> */}
      </div>
    </div>
  );
}

const loadTableUi = (tab: TabType) => {
  switch (tab) {
    case "staff":
      return <StaffTable />;
    case "assets":
      return <AssetTable />;
    case "assignments":
      return <AssignAssetTable />;
    case "return":
      return <ReturnedAssetTable />;
    default:
      return (
        <div className="p-4 text-center bg-gray-50 mt-5">No Table yet.</div>
      );
  }
};
