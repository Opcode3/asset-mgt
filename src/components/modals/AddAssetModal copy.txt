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

  const [formData, setFormData] = React.useState<AssetPayload>(
    {} as AssetPayload
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const submitFormHandler = () => {
  //   setIsLoading(true);

  //   addAsset(formData, {
  //     onSuccess: (res) => {
  //       toast.success("Nominee updated successfully 🎉");
  //       console.log({ res });
  //       resetWhich();
  //       closeModal();
  //     },
  //     onError: (error: any) => {
  //       console.log(error);
  //       const message =
  //         error?.response?.data ||
  //         "Failed to update nominee. Please try again.";
  //       toast.error(message);
  //     },
  //     onSettled: () => {
  //       setIsLoading(false);
  //     },
  //   });
  // };

  const submitFormHandler = () => {
    setIsLoading(true);

    const data = new FormData();

    // append text fields
    data.append("assetNo", formData.assetNo || "");
    data.append("assetType", formData.assetType || "");
    data.append("serialNo", formData.serialNo || "");
    data.append("location", formData.location || "");
    data.append("description", formData.description || "");

    // append images (multiple)
    if (formData.images && formData.images.length > 0) {
      formData.images.forEach((file) => {
        data.append("images", file);
      });
    }

    addAsset(data, {
      onSuccess: (res) => {
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (file: File) => {
    console.log("Uploaded file:", file);
    formData.images = [file];
  };

  return (
    <div className="flex flex-col gap-6 xl:gap-5 md:w-[500px]">
      <div className="">
        <h2 className="text-secondary font-semibold text-xl xl:text-2xl mb-1">
          Add an Asset
        </h2>
      </div>
      <div className="flex flex-col gap-1 pt-2 ">
        <div className="grid md:grid-cols-2 gap-2">
          <Input
            type="text"
            placeholder=""
            id="assetNo"
            label="Asset number"
            onChange={handleChange}
            name="assetNo"
            value={formData.assetNo}
          />
          <Input
            type="text"
            placeholder=""
            id="assetType"
            label="Asset Type "
            onChange={handleChange}
            name="assetType"
            value={formData.assetType}
          />
        </div>

        <Input
          type="text"
          placeholder=""
          id="serialNo"
          label="Serial Number"
          onChange={handleChange}
          name="serialNo"
          value={formData.serialNo}
        />
        <Input
          type="text"
          placeholder=""
          id="location"
          label="Location"
          onChange={handleChange}
          name="location"
          value={formData.location}
        />

        <UploadMedia
          onFileSelect={handleFileUpload}
          label="Upload Image"
          name="image"
        />

        <Textarea
          placeholder=""
          id="description"
          label="About Asset"
          onChange={handleChange}
          name="description"
          value={formData.description}
        />
      </div>

      <div className="flex items-center gap-2 justify-end mt-2">
        <Button
          type="button"
          onClick={() => {
            resetWhich();
            closeModal();
          }}
          className=" !text-gray-700 bg-gray-200 font-semibold px-4"
        >
          Cancel
        </Button>
        <Button
          type="button"
          disabled={isLoading}
          loading={isLoading}
          onClick={() => submitFormHandler()}
          className=" bg-gray-600 hover:bg-black px-4"
        >
          Update Nominee
        </Button>
      </div>
    </div>
  );
}
