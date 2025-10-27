import React, { useState } from "react";
import Input from "../forms/Input";
import { useModalStore } from "../../store/modalStore";
import Button from "../forms/Button";
import { toast } from "react-toastify";
import Textarea from "../forms/Textarea";
import { useAssets, type AssetPayload } from "../../hooks/useAssets";
import UploadMedia from "../forms/UploadMedia";

export default function AddAssetModal() {
  const { closeModal, resetWhich } = useModalStore();
  const { addAsset } = useAssets();

  const [formData, setFormData] = useState<Partial<AssetPayload>>({
    images: [],
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitFormHandler = () => {
    setIsLoading(true);
    const data = new FormData();

    // Append text fields
    data.append("assetNo", formData.assetNo || "");
    data.append("assetType", formData.assetType || "");
    data.append("serialNo", formData.serialNo || "");
    data.append("location", formData.location || "");
    data.append("description", formData.description || "");

    // ✅ Append multiple files (max 5)
    if (formData.images && formData.images.length > 0) {
      formData.images.forEach((file) => {
        data.append("images", file);
      });
    }

    console.log({ formData, data });

    addAsset(data, {
      onSuccess: (res) => {
        // toast.success("Asset added successfully 🎉");
        resetWhich();
        closeModal();
      },
      onError: (error: any) => {
        console.error(error);
        const message =
          error?.response?.data?.message ||
          "Failed to add asset. Please try again.";
        toast.error(message);
      },
      onSettled: () => setIsLoading(false),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle multiple image uploads
  const handleFileUpload = (files: File[]) => {
    setFormData((prev) => ({
      ...prev,
      images: files.slice(0, 5), // enforce max 5
    }));
  };

  return (
    <div className="flex flex-col gap-6 xl:gap-5 md:w-[500px]">
      <div>
        <h2 className="text-secondary font-semibold text-xl xl:text-2xl mb-1">
          Add an Asset
        </h2>
      </div>

      <div className="flex flex-col gap-1 pt-2 ">
        <div className="grid md:grid-cols-2 gap-2">
          <Input
            type="text"
            label="Asset Number"
            name="assetNo"
            value={formData.assetNo}
            onChange={handleChange}
          />
          <Input
            type="text"
            label="Asset Type"
            name="assetType"
            value={formData.assetType}
            onChange={handleChange}
          />
        </div>

        <Input
          type="text"
          label="Serial Number"
          name="serialNo"
          value={formData.serialNo}
          onChange={handleChange}
        />
        <Input
          type="text"
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <UploadMedia
          onFileSelect={handleFileUpload}
          label="Upload Images (max 5)"
          name="images"
          multiple
        />

        <Textarea
          label="About Asset"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="flex items-center gap-2 justify-end mt-2">
        <Button
          type="button"
          onClick={() => {
            resetWhich();
            closeModal();
          }}
          className="!text-gray-700 bg-gray-200 font-semibold px-4"
        >
          Cancel
        </Button>
        <Button
          type="button"
          disabled={isLoading}
          loading={isLoading}
          onClick={submitFormHandler}
          className="bg-gray-600 hover:bg-black px-4"
        >
          Save Asset
        </Button>
      </div>
    </div>
  );
}
