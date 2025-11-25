import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { verifyAccountEmail } from "../../hooks/useAuth";

export default function VerifyTokenPage() {
  const navigate = useNavigate();
  const { token } = useSearch({ from: "/verify-email" });
  const [isLoading, setIsLoading] = useState(true);
  const [msg, setMsg] = useState<string>("Verifying your account...");

  // React Query mutation
  const verifyEmailMutation = verifyAccountEmail();
  const { mutateAsync, isPending } = verifyEmailMutation;

  useEffect(() => {
    if (token && isLoading) {
      // ✅ use mutateAsync (returns a Promise
      mutateAsync(token)
        .then((res: any) => {
          setIsLoading(false);
          setMsg(res?.message || "Account verification successful!");
          toast.success("Verification was successful!");
          navigate({ to: "/" });
        })
        .catch((err) => {
          setIsLoading(false);

          console.log(err);
          const errorMessage =
            err?.response?.data?.message ||
            "Failed to verify account. Please try again later.";
          setMsg(errorMessage);

          if (err?.response?.status !== 422) {
            toast.error(errorMessage, { toastId: "zim" });
          }

          const timer = setTimeout(() => {
            navigate({ to: "/", replace: true });
          }, 2000);

          return () => clearTimeout(timer);
        });
    }
  }, [token]);

  return (
    <div className="text-center py-16 xs:py-24 md:py-28 xl:py-40">
      {isLoading || isPending ? (
        <div className="text-lg xs:text-xl md:text-2xl xl:text-3xl font-medium font-marcellus">
          <div className="w-full h-[200px] relative flex items-center flex-col justify-center">
            <div className="loader-page size-10">Loading...</div>
          </div>
          <h2>Verifying your account</h2>
        </div>
      ) : (
        <div className="text-lg xs:text-xl md:text-2xl xl:text-3xl font-medium">
          <h2 className="text-primary">{msg}</h2>
          <small>Redirecting you to the login page...</small>
        </div>
      )}
    </div>
  );
}
