import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";

import { capitalizeFirstLetter } from "../../utils/helpers";
import { useAssets } from "../../hooks/useAssets";
import type { AssetResponseType } from "../../types/asset";
import { useModalStore } from "../../store/modalStore";
import { TableSkeleton } from "../TableSkeleton";

export function AssetTable() {
  const { assets, isLoading } = useAssets();
  const { openModal, setWhich, setData } = useModalStore();

  const columns = useMemo<ColumnDef<AssetResponseType>[]>(
    () => [
      {
        id: "sn",
        header: "S/N",
        cell: ({ row }) => row.index + 1,
        size: 50, // optional
      },
      {
        accessorKey: "assetNo",
        header: "Asset Name",
        cell: ({ row }) => (
          <div
            className="flex items-center gap-3"
            onClick={() => {
              //   setWhich("show_content");
              //   openModal();
            }}
          >
            <p className=" capitalize min-w-[150px]">{row.original.assetNo} </p>
          </div>
        ),
      },

      {
        accessorKey: "assetType",
        header: "Asset Type",
        cell: ({ row }) => (
          <div className="flex items-center gap-2 text-green-600">
            <button>
              <p className="">
                {capitalizeFirstLetter(row.original.assetType)}
              </p>
            </button>
          </div>
        ),
      },
      {
        id: "serialNo",
        header: "serial Number",
        cell: ({ row }) => (
          <div className="flex justify-start gap-2 font-medium text-sm px-2 capitalize">
            {row.original.serialNo}
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
        id: "status",
        header: "Status",
        cell: ({ row }) => (
          <div className="flex justify-start gap-2 font-medium text-sm px-2 capitalize">
            {row.original.status}
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
                  setWhich("view_asset");
                  setData(row.original);
                  openModal();
                }}
                className="py-2 px-2 rounded-md bg-blue-500 text-white"
              >
                Edit Asset
              </button>
              <button
                onClick={() => {
                  setData(row.original);
                  setWhich("assign_asset");
                  openModal();
                }}
                className="py-2 px-2 rounded-md bg-green-500 text-white"
              >
                Assign Asset
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  if (isLoading) {
    return <TableSkeleton rows={4} columns={7} />;
  }

  return (
    <div className=" flex flex-col gap-6 ">
      <DataTable data={assets ?? []} columns={columns} />
    </div>
  );
}
