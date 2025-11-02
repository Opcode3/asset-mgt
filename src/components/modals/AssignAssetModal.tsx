import React, { useEffect, useState } from "react";
import Input from "../forms/Input";
import { useModalStore } from "../../store/modalStore";
import Button from "../forms/Button";
import { toast } from "react-toastify";
import Textarea from "../forms/Textarea";
import { useAssets, type AssignmentPayload } from "../../hooks/useAssets";

export default function AssignAssetModal() {
  const { closeModal, resetWhich, data } = useModalStore();
  const { addAssignAsset } = useAssets();

  const [formData, setFormData] = useState<AssignmentPayload>(
    {} as AssignmentPayload
  );

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        assetId: "_id" in data ? data._id : "",
      }));
    }
  }, [data]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitFormHandler = () => {
    setIsLoading(true);

    console.log({ formData });

    addAssignAsset(formData, {
      onSuccess: () => {
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

  return (
    <div className="flex flex-col gap-6 xl:gap-5 md:w-[500px]">
      <div>
        <h2 className="text-secondary font-semibold text-xl xl:text-2xl mb-1">
          Assign Asset
        </h2>
      </div>

      <div className="flex flex-col gap-1 pt-2 ">
        {data && (
          <div className="pb-3">
            <p className="font-medium">
              Assigning Asset Name: {"assetNo" in data ? data?.assetNo : ""}
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-2">
          <Input
            type="text"
            label="Assignee Name"
            name="assignedToName"
            id="assignedToName"
            value={formData.assignedToName}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            label="Assignee Email Address"
            name="assignedToEmail"
            id="assignedToEmail"
            value={formData.assignedToEmail}
            onChange={handleChange}
            required
          />
        </div>

        <Textarea
          label="Asset Condition Note"
          name="description"
          value={formData.comment}
          onChange={handleChange}
          required
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
          disabled={
            isLoading || !formData.assignedToName || !formData.assignedToEmail
          }
          loading={isLoading}
          onClick={submitFormHandler}
          className="bg-gray-600 hover:bg-black px-4"
        >
          Assign Asset
        </Button>
      </div>
    </div>
  );
}
