import React, { useEffect, useState } from "react";
import { useModalStore } from "../../store/modalStore";
import Button from "../forms/Button";
import { toast } from "react-toastify";
import Textarea from "../forms/Textarea";
import { useAssets, type ReturnAssignmentPayload } from "../../hooks/useAssets";
import Select from "../forms/Select";

export default function ReturnedAssetModal() {
  const { closeModal, resetWhich, data } = useModalStore();
  const { addReturnAsset } = useAssets();

  const [formData, setFormData] = useState<ReturnAssignmentPayload>(
    {} as ReturnAssignmentPayload
  );

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        assignmentId: "id" in data ? data.id : "",
      }));
    }
  }, [data]);

  console.log({ formData });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitFormHandler = () => {
    setIsLoading(true);
    addReturnAsset(formData, {
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

  const statusOptions = [
    { value: "", label: "Select an option" },
    ...["available", "assigned", "maintenance", "retired"].map((status) => ({
      value: status,
      label: status.charAt(0).toUpperCase() + status.slice(1), // Capitalizes first letter
    })),
  ];

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
              Assigning Asset Number: {"assetNo" in data ? data?.assetNo : ""}
            </p>
          </div>
        )}
        <Select
          name="assetStatus"
          label="Select asset status"
          options={statusOptions}
          error=""
          onChange={handleChange}
        />{" "}
        <Textarea
          label="Asset Condition Note"
          name="returnedComment"
          value={formData.returnedComment}
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
            isLoading || !formData.returnedComment || !formData.assetStatus
          }
          loading={isLoading}
          onClick={submitFormHandler}
          className="bg-gray-600 hover:bg-black px-4"
        >
          Return Asset
        </Button>
      </div>
    </div>
  );
}
