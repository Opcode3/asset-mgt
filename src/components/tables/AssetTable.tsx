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
      },
      {
        accessorKey: "assetNo",
        header: "Asset Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <p className="capitalize min-w-[150px]">{row.original.assetNo}</p>
          </div>
        ),
      },
      {
        accessorKey: "assetType",
        header: "Asset Type",
        cell: ({ row }) => (
          <p className="text-green-600">
            {capitalizeFirstLetter(row.original.assetType)}
          </p>
        ),
      },
      {
        id: "serialNo",
        header: "Serial Number",
        cell: ({ row }) => <p>{row.original.serialNo}</p>,
      },
      {
        id: "created_by",
        header: "Created By",
        cell: ({ row }) => {
          const createdBy = row.original.createdBy;
          return <p>{createdBy?.name ?? "N/A"}</p>;
        },
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => <p className="capitalize">{row.original.status}</p>,
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex justify-end gap-2 font-medium text-sm">
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
        ),
      },
    ],
    []
  );

  // 👇 Function to export every field from AssetResponseType
  const downloadCSV = () => {
    if (!assets || assets.length === 0) return;

    // Define headers for all fields
    const headers = [
      "S/N",
      "_id",
      "assetNo",
      "serialNo",
      "assetType",
      "imageUrls",
      "description",
      "location",
      "status",
      "createdBy._id",
      "createdBy.name",
      "createdBy.email",
      "createdAt",
      "updatedAt",
      "__v",
    ];

    // Map all assets into flat rows
    const rows = assets.map((asset, index) => [
      index + 1,
      asset._id,
      asset.assetNo,
      asset.serialNo,
      capitalizeFirstLetter(asset.assetType),
      asset.imageUrls?.join(" | ") || "",
      asset.description || "",
      asset.location || "",
      asset.status,
      asset.createdBy?._id || "",
      asset.createdBy?.name || "",
      asset.createdBy?.email || "",
      new Date(asset.createdAt).toLocaleString(),
      new Date(asset.updatedAt).toLocaleString(),
      asset.__v,
    ]);

    // Build CSV string
    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`) // escape quotes
          .join(",")
      )
      .join("\n");

    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "assets_full.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return <TableSkeleton rows={4} columns={7} />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <button
          onClick={downloadCSV}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Download All as CSV
        </button>
      </div>

      <DataTable data={assets ?? []} columns={columns} />
    </div>
  );
}
