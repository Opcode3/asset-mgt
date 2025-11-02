import Button from "../atoms/Button";
import { FaPlus, FaPowerOff, FaUserPlus } from "react-icons/fa";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "@tanstack/react-router";
import { getSingleName } from "../../utils/helpers";
import TablesWrapper from "../TablesWrapper";
import { Modal } from "../Modal";
import { useModalStore } from "../../store/modalStore";
import { useTabStore } from "../../store/tabStore";

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuthStore();

  const { openModal, setWhich } = useModalStore();
  const { tab } = useTabStore();

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated || !user) {
    navigate({ to: "/" });
    return null;
  }

  return (
    <div className="">
      <header className="flex items-center justify-between p-4 max-w-full border-b border-b-gray-200 px-[40px] 2xl:px-[120px] mx-auto">
        {/* <div className="bg-black/80 text-white py-1 px-2 cursor-pointer text-2xl rounded-sm">
          [asset]
        </div> */}
        <div className=" bg-red-400 flex items-center">
          <img src="/logo.png" alt="logo" className="w-32" />
        </div>
        <Button
          text="Logout"
          onClick={handleLogout}
          icon={<FaPowerOff className=" stroke-1" />}
          bgColor="bg-red-600"
        />
      </header>
      <div className="flex items-center justify-between py-9 w-full px-[45px] 2xl:px-[140px] mx-auto">
        <div className="">
          <h2 className="font-semibold text-xl">
            Hallo, {getSingleName(user.name)}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {tab == "staff" && user.role == "admin" && (
            <Button
              text="Add Staff"
              icon={<FaUserPlus />}
              bgColor="bg-black"
              onClick={() => {
                setWhich("add_staff");
                openModal();
              }}
            />
          )}

          {tab == "assets" && (
            <Button
              text="Add Asset"
              icon={<FaPlus />}
              bgColor="bg-black"
              onClick={() => {
                setWhich("add_asset");
                openModal();
              }}
              // bgColor=" border border-gray-200 !text-black"
            />
          )}
          {/* 
          {tab == "assignments" && (
            <Button
              text="Assign Asset"
              icon={<FaPlus />}
              bgColor="bg-black"

              // bgColor=" border border-gray-200 !text-black"
            />
          )} */}
        </div>
      </div>
      <TablesWrapper />

      <Modal />
    </div>
  );
}
