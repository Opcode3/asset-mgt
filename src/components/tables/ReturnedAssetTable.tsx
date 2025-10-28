import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";

import { capitalizeFirstLetter, formatReadableDate } from "../../utils/helpers";
import { useAssets } from "../../hooks/useAssets";
import type { AssignmentResponseType } from "../../types/asset";
import { useModalStore } from "../../store/modalStore";
import { TableSkeleton } from "../TableSkeleton";

export function ReturnedAssetTable() {
  const { returnedAssets, isReturning } = useAssets();
  const { openModal, setWhich, setData } = useModalStore();

  console.log({ returnedAssets });
  const columns = useMemo<ColumnDef<AssignmentResponseType>[]>(
    () => [
      {
        id: "sn",
        header: "S/N",
        cell: ({ row }) => row.index + 1,
        size: 50, // optional
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div
            className="flex items-center gap-3"
            onClick={() => {
              //   setWhich("show_content");
              //   openModal();
            }}
          >
            <p className=" capitalize min-w-[150px]">
              {row.original.assignedTo.name}{" "}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email Address",
        cell: ({ row }) => (
          <div
            className="flex items-center gap-3"
            onClick={() => {
              //   setWhich("show_content");
              //   openModal();
            }}
          >
            <p className=" capitalize min-w-[150px]">
              {capitalizeFirstLetter(row.original.assignedTo.email)}{" "}
            </p>
          </div>
        ),
      },

      {
        accessorKey: "assetNo",
        header: "Asset Number",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-green-600">
            <button>
              <p className="">
                {capitalizeFirstLetter(row.original.asset?.assetNo || "N/A")}
              </p>
            </button>
          </div>
        ),
      },
      {
        id: "assignedBy.name",
        header: "Assigned By",
        cell: ({ row }) => (
          <div className="flex justify-start gap-2 font-medium text-sm px-2 capitalize">
            {row.original.assignedBy?.name || "N/A"}
          </div>
        ),
      },
      {
        id: "collectedBy.name",
        header: "Collected By",
        cell: ({ row }) => (
          <div className="flex justify-start gap-2 font-medium text-sm px-2 capitalize">
            {row.original.collectedBy?.name || "N/A"}
          </div>
        ),
      },
      {
        id: "createdAt",
        header: "Issued Date",
        cell: ({ row }) => (
          <div className="flex justify-start gap-2 font-medium text-sm px-2 capitalize">
            {formatReadableDate(row.original.createdAt)}
          </div>
        ),
      },
      {
        id: "createdAt",
        header: "Collected Date",
        cell: ({ row }) => (
          <div className="flex justify-start gap-2 font-medium text-sm px-2 capitalize">
            {formatReadableDate(row.original.updatedAt)}
          </div>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => {
          return (
            <div className="flex justify-end gap-2 font-medium text-sm ">
              <button
                onClick={() => {
                  setData(row.original);
                  setWhich("view_assigned_asset");
                  openModal();
                }}
                className="py-2 px-2 rounded-md bg-blue-500 text-white"
              >
                See more
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  if (isReturning) {
    return <TableSkeleton rows={4} columns={7} />;
  }

  return (
    <div className=" flex flex-col gap-6 ">
      <DataTable data={returnedAssets ?? []} columns={columns} />
    </div>
  );
}
