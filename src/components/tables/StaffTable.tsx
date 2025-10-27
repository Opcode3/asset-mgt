import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";

import { useNavigate } from "@tanstack/react-router";
import type { UserResponseType } from "../../types/auth";
import { useStaff } from "../../hooks/useStaff";
import { capitalizeFirstLetter } from "../../utils/helpers";

export function StaffTable() {
  
  const { staffs, isLoading } = useStaff();

  console.log({ staffs });

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
              >
                Edit Profile
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className=" flex flex-col gap-6 ">
      <DataTable data={staffs ?? []} columns={columns} />
    </div>
  );
}
