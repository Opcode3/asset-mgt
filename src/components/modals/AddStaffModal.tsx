import React, { useState } from "react";
import Input from "../forms/Input";
// import { useModalStore } from "../../store/modalStore";
import Button from "../forms/Button";
// import { addTMValidation, type TMValidationErrors } from "../../lib/validation";
import { toast } from "react-toastify";
// import { useTM, type TMPayload } from "../../hooks/useTM";
import type { UserPayload } from "../../types/auth";
import {
  addStaffValidation,
  type StaffValidationErrors,
} from "../../lib/validation";
import { useStaff } from "../../hooks/useStaff";
import { useModalStore } from "../../store/modalStore";
import Select from "../forms/Select";

export default function AddStaffModal() {
  const { addStaff } = useStaff();

  const [formData, setFormData] = React.useState<UserPayload>({
    name: "",
    role: "admin",
    password: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errors, setError] = useState<StaffValidationErrors>({});
  const validate = () => {
    return Object.keys(errors).length == 0;
  };
  const submitFormHandler = () => {
    if (validate()) {
      console.log({ payload: formData });
      setIsLoading(true);
      addStaff(formData, {
        onSuccess: () => {
          toast.success("Team member added successfully 🎉");
          // resetWhich();
          closeModal();
        },
        onError: (error: any) => {
          console.log(error);
          const message =
            error?.response?.data || "Failed to add member. Please try again.";
          toast.error(message);
        },
        onSettled: () => {
          setIsLoading(false);
        },
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setError(addStaffValidation(formData));

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onBlurHandler = () => {
    setError(addStaffValidation(formData));
  };

  const { closeModal } = useModalStore();

  const roles = [
    {
      value: "admin",
      label: "Admin",
    },
    {
      value: "assignee",
      label: "Assignee",
    },
  ];

  return (
    <div className="flex flex-col gap-6 xl:gap-5 md:w-[500px]">
      <div className="">
        <h2 className="text-secondary font-semibold text-2xl mb-1">
          Add New Staff
        </h2>
        <p className="text-base font-light text-secondary">
          Enter the staff details to include them on the site.
        </p>
      </div>
      <div className="flex flex-col gap-1.5 pt-2 ">
        <Input
          type="text"
          placeholder="Full name"
          id="name"
          name="name"
          onChange={handleChange}
          label="Full Name"
          error={errors ? errors["name"] : ""}
          onBlur={onBlurHandler}
        />

        <Input
          type="email"
          placeholder=""
          id="email"
          label="Company email"
          onChange={handleChange}
          name="email"
          error={errors ? errors["email"] : ""}
          onBlur={onBlurHandler}
        />

        <Select
          name="role"
          label="Staff Role"
          options={roles}
          id="role"
          error={errors ? errors["role"] : ""}
          onBlur={onBlurHandler}
          onChange={handleChange}
          // onChange={(e) => console.log(e.target.value)}
        />

        <Input
          type="password"
          placeholder="*******"
          id="password"
          label="Password"
          onChange={handleChange}
          name="password"
          error={errors ? errors["password"] : ""}
          onBlur={onBlurHandler}
        />
        {/* <CloudinaryUpload
          setImage={setImage}
          image={formData.image}
          error={errors ? errors["image"] : ""}
          label="Picture"
        /> */}

        {/* <div className="">
          <span className="float-right text-xs">
            <b className="text-primary">Max:</b> 200 Char
          </span>
          <Textarea
            placeholder=""
            id="desc"
            label="About member"
            onChange={handleChange}
            name="desc"
            error={errors ? errors["desc"] : ""}
            onBlur={onBlurHandler}
          />
        </div> */}
      </div>

      <div className="flex items-center gap-2 justify-end mt-2">
        <Button
          type="button"
          onClick={() => {
            // resetWhich();
            closeModal();
          }}
          className=" !text-gray-600 font-semibold px-4"
        >
          Cancel
        </Button>
        <Button
          type="button"
          disabled={formData.name.trim().length < 3}
          loading={isLoading}
          onClick={() => submitFormHandler()}
          className=" bg-gray-600 hover:bg-primary-dark px-4"
        >
          Add Staff
        </Button>
      </div>
    </div>
  );
}
