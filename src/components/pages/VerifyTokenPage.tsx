import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { confirmVerificationToken } from "../../../hooks/useStaff";
import { toast } from "react-toastify";

export default function VerifyTokenPage() {
  const navigate = useNavigate();
  const { token } = useSearch({ from: "/verify-email" });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [msg, setMsg] = useState<boolean>(true);
  // const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (token && isLoading) {
      confirmVerificationToken({
        token: token || "",
        type: "verifying",
      })
        .then((res) => {
          setIsLoading(false);
          // setMsg(res?.message || "Account Verification was successful.");
          console.log(res);
          toast.success("Verification was successful.");
          navigate({ to: "/login" });
        })
        .catch((err) => {
          setIsLoading(false);
          setMsg(err?.response?.data.message);
          if (err?.response.status == 422) {
            return;
          }
          toast.error(
            err?.response?.data.message ||
              "Failed to verify account. Please try again later.",
            {
              toastId: "zim",
            }
          );
          const timer = setTimeout(() => {
            navigate({ to: "/login", replace: true });
          }, 2000);

          return () => clearTimeout(timer);
        });
    }
  }, [token]);

  return (
    <div className=" text-center py-16 xs:py-24 md:py-28 xl:py-40">
      {isLoading ? (
        <div className="text-lg xs:text-xl md:text-2xl xl:text-3xl font-medium font-marcellus">
          <div className=" w-full h-[200px] relative flex items-center flex-col justify-center">
            <div className="loader-page size-10">Loading...</div>
          </div>
          <h2 className="">Verifying your account</h2>
        </div>
      ) : (
        <div className="text-lg xs:text-xl md:text-2xl xl:text-3xl font-medium">
          <h2 className="text-primary">{msg}</h2>
          <small className="">Redirecting you to login page.</small>
        </div>
      )}
    </div>
  );
}
