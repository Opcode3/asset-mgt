import { useModalStore } from "../../store/modalStore";
import Button from "../forms/Button";
import type { AssetResponseType } from "../../types/asset";
import { formatReadableDate } from "../../utils/helpers";
import React from "react";
import Select from "../forms/Select";

import DownloadableQRCode from "../atoms/DownloadableQRCode";
import { useAssets } from "../../hooks/useAssets";

export default function ViewAssetModal() {
  const { closeModal, resetWhich, data } = useModalStore();

  const [isEditStatus, setIsEditStatus] = React.useState(false);

  const [status, setStatus] = React.useState<string>("");
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
  const [isEditting, setIsEditting] = React.useState(false);

  const { deleteAsset, editAssetStatus } = useAssets();

  const statusOptions = [
    { value: "", label: "Select an option" },
    ...["available", "maintenance", "retired"].map((status) => ({
      value: status,
      label: status.charAt(0).toUpperCase() + status.slice(1), // Capitalizes first letter
    })),
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { value } = e.target;
    setStatus(value);
  };

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted status:", status);

    if (status && status.trim().length > 0) {
      setIsEditting(true);
      editAssetStatus(
        { status, id: (data as AssetResponseType)._id },
        {
          onSuccess: () => {
            // toast.success("Asset status updated successfully");
            setIsEditStatus(false);
            resetWhich();
            closeModal();
          },
          onError: () => {
            // toast.error("Failed to update asset status. Please try again.");
          },
          onSettled: () => {
            setIsEditting(false);
          },
        }
      );
    }
    // Here, you would typically handle the form submission,
    // such as sending the updated status to the server.
    setIsEditStatus(false);
  };

  const asset = data as AssetResponseType | null;
  if (!asset) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">No assignment data available.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 xl:gap-5 md:w-[600px] max-w-full">
      {/* Header */}
      <div>
        <h2 className="text-secondary font-semibold text-xl xl:text-2xl mb-1">
          {isEditStatus ? "Edit Asset Status" : "Asset Details"}
        </h2>
      </div>

      {isEditStatus ? (
        <>
          <div className="flex flex-col gap-4">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-1 text-sm">
              <form onSubmit={formHandler}>
                <Select
                  name="assetStatus"
                  label="Select asset status"
                  options={statusOptions}
                  error=""
                  onChange={handleChange}
                />{" "}
                <Button
                  type="submit"
                  loading={isEditting}
                  className="!bg-blue-500  font-semibold px-4"
                >
                  Update Asset Status
                </Button>
              </form>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 mt-2">
            {asset.status === "retired" && (
              <Button
                type="button"
                loading={isDeleting}
                onClick={() => {
                  setIsDeleting(true);
                  deleteAsset(asset._id, {
                    onSettled: () => {
                      setIsDeleting(false);
                    },
                    onSuccess: () => {
                      resetWhich();
                      closeModal();
                    },
                  });
                  // assetService
                  //   .deleteAsset(asset._id)
                  //   .then(() => {
                  //     toast.success("Asset deleted successfully");
                  //     resetWhich();
                  //     closeModal();
                  //   })
                  //   .catch(() => {
                  //     toast.error("Failed to delete asset. Please try again.");
                  //   });
                }}
                className="!bg-red-500  font-semibold px-4"
              >
                Delete Asset gggg
              </Button>
            )}

            <Button
              type="button"
              onClick={() => {
                setIsEditStatus(false);
              }}
              className="!bg-gray-500  font-semibold px-4"
            >
              Go Back
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {/* Asset Info */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-1 text-sm">
              <p>
                <span className="font-medium">Asset Name:</span> {asset.assetNo}
              </p>
              <p>
                <span className="font-medium">Type:</span> {asset.assetType}
              </p>
              <p>
                <span className="font-medium">Serial No:</span> {asset.serialNo}
              </p>
              <p>
                <span className="font-medium">Location:</span> {asset.location}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span className="capitalize">{asset.status}</span>
              </p>
              <p>
                <span className="font-medium">Description:</span>{" "}
                {asset.description || "—"}
              </p>
              <p>
                <span className="font-medium">Created On:</span>{" "}
                {formatReadableDate(asset.createdAt)}
              </p>

              {asset?.imageUrls && asset?.imageUrls?.length > 0 && (
                <div className="pt-5">
                  <div className="flex flex-wrap gap-3">
                    {asset.imageUrls.map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        alt={`asset-${idx}`}
                        className="w-40 h-40 object-cover rounded border border-gray-200"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 mt-0.5">
              {asset.status === "retired" && (
                <Button
                  type="button"
                  loading={isDeleting}
                  onClick={() => {
                    setIsDeleting(true);
                    console.log("Is deleting now");
                    deleteAsset(asset._id, {
                      onSettled: () => {
                        setIsDeleting(false);
                      },
                      onSuccess: () => {
                        // toast.success("Asset deleted successfully");
                        // resetWhich();
                        // closeModal();
                      },
                    });
                  }}
                  className="!bg-red-500  font-semibold px-4"
                >
                  Delete Asset
                </Button>
              )}

              <Button
                type="button"
                onClick={() => {
                  setIsEditStatus(true);
                }}
                className="!bg-blue-500 !py-1.5 font-semibold px-4"
              >
                Edit Status
              </Button>
              <Button
                type="button"
                onClick={() => {
                  resetWhich();
                  closeModal();
                }}
                className="!text-gray-700 !py-1.5 bg-gray-200 font-semibold px-4"
              >
                Close
              </Button>
            </div>

            <DownloadableQRCode asset={asset} />
          </div>
        </>
      )}
    </div>
  );
}
