import { motion, AnimatePresence } from "framer-motion";
import { useModalStore, type WhichType } from "../store/modalStore";
import { HiOutlineXMark } from "react-icons/hi2";
// import ChangePasswordModal from "./modal/ChangePasswordModal";
// import ChangeNameModal from "./modal/ChangeNameModal";
import AddStaffModal from "./modals/AddStaffModal";
import AddAssetModal from "./modals/AddAssetModal";

export const Modal = () => {
  const { isOpen, closeModal, which, resetWhich } = useModalStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-start sm:items-center justify-center z-50 px-4 sm:px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          //   onClick={closeModal}
        >
          <div className=" relative">
            <button
              onClick={() => {
                resetWhich();
                closeModal();
              }}
              className=" z-50 bg-white rounded-full size-8 sm:size-10 flex items-center justify-center absolute -right-2 top-4 sm:-top-4"
            >
              <HiOutlineXMark className="fill-secondary size-6 sm:size-7 stroke-1" />
            </button>
            <motion.div
              className="bg-white rounded-md lg:rounded-lg shadow-xl px-4 py-5 sm:p-6 w-full mt-[3vh] sm:mt-0 max-w-xl relative max-h-[85vh] overflow-hidden overflow-y-auto"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {loadUi(which)}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function loadUi(type: WhichType) {
  switch (type) {
    // case "change_password":
    //   return <ChangePasswordModal />;
    // case "change_name":
    //   return <ChangeNameModal />;
    case "add_staff":
      return <AddStaffModal />;
    case "add_asset":
      return <AddAssetModal />;
    default:
      break;
  }
}
