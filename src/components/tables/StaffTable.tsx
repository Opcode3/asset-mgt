import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";

import type { UserResponseType } from "../../types/auth";
import { useStaff } from "../../hooks/useStaff";
import { capitalizeFirstLetter } from "../../utils/helpers";
import { TableSkeleton } from "../TableSkeleton";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function StaffTable() {
  const { staffs, isLoading, disableStaff } = useStaff();
  const queryClient = useQueryClient();

  const columns = useMemo<ColumnDef<UserResponseType>[]>(
    () => [
      {
        id: "sn",
        header: "S/N",
        cell: ({ row }) => row.index + 1,
        size: 50, // optional
      },
      {
        accessorKey: "name",
        header: "Full Name",
        cell: ({ row }) => (
          <div
            className="flex items-center gap-3"
            onClick={() => {
              //   setWhich("show_content");
              //   openModal();
            }}
          >
            <p className=" capitalize min-w-[150px]">{row.original.name} </p>
          </div>
        ),
      },

      {
        accessorKey: "email",
        header: "Email Address",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-green-600">
            <button>
              <p className="">{capitalizeFirstLetter(row.original.email)}</p>
            </button>
          </div>
        ),
      },
      {
        id: "role",
        header: "Role",
        cell: ({ row }) => (
          <div className="flex justify-start gap-2 font-medium text-sm px-2 capitalize">
            {row.original.role}
          </div>
        ),
      },
      {
        id: "created_by",
        header: "Created By",
        cell: ({ row }) => {
          const createdBy = row.original.createdBy;
          const hasCreator = !!createdBy;

          return (
            <div className="flex justify-start gap-2 font-medium text-sm px-2">
              {hasCreator ? (
                <span>{createdBy.name || "Unnamed"}</span>
              ) : (
                <span className="text-gray-400 italic">N/A</span>
              )}
            </div>
          );
        },
      },

      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          return (
            <div className="flex justify-end gap-2 font-medium text-sm ">
              <button
                onClick={() => {
                  // setWhich("show_content");
                  // setContentData(row.original);
                  // openModal();
                }}
                className="py-2 px-2 rounded-md"
              ></button>

              <button
                onClick={() => {
                  disableStaff(row.original._id, {
                    onSuccess: () => {
                      queryClient.invalidateQueries({
                        queryKey: ["staff_list"],
                      });
                      toast.success("Process was successful!");
                    },
                    onError: (error: any) => {
                      console.log(error);
                      const message =
                        error?.response?.data?.message ||
                        "Transaction failed. Please try again.";
                      toast.error(message);
                    },
                  });
                }}
                className="py-2 px-2 rounded-md bg-red-500 text-white"
              >
                {row.original.status == "inactive" ? "Enable" : "Disable"}
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  if (isLoading) {
    return <TableSkeleton rows={3} columns={6} />;
  }

  return (
    <div className=" flex flex-col gap-6 ">
      <DataTable data={staffs ?? []} columns={columns} />
    </div>
  );
}
