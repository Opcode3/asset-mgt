import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { assetService } from "../../services/assetService";
import type { AssetResponseType } from "../../types/asset";
import { formatReadableDate } from "../../utils/helpers";

export default function ViewAssetPage() {
  const { id } = useSearch({ from: "/asset" });
  const [isLoading, setIsLoading] = useState(true);
  const [asset, setAsset] = useState<AssetResponseType | null>(null);

  const navigate = useNavigate();

  // React Query mutation

  useEffect(() => {
    if (id && isLoading) {
      // ✅ use mutateAsync (returns a Promise
      assetService
        .getAssetById(id)
        .then((res: any) => {
          setIsLoading(false);
          setAsset(res);
        })
        .catch((err) => {
          setIsLoading(false);
          const errorMessage =
            err?.response?.data?.message ||
            "Failed to verify account. Please try again later.";

          if (err?.response?.status !== 422) {
            toast.error(errorMessage, { toastId: "zim" });
          }
        });
    }
  }, [id]);

  return (
    <div className=" bg-gray-200 min-h-screen">
      <div className="bg-white px-14 py-4">
        <img
          src="/logo.png"
          alt="logo"
          className="w-34"
          onClick={() => navigate({ to: "/" })}
        />
      </div>
      <div className="">
        {asset ? (
          <div className="p-6 max-w-[650px] mx-auto ">
            <h1 className="text-xl font-bold mb-2">Asset Details</h1>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-sm space-y-1">
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

              {asset.imageUrls && asset.imageUrls.length > 0 && (
                <div className="pt-4">
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

            {/* Add more fields as necessary */}
          </div>
        ) : (
          <div className="text-center py-16 xs:py-24 md:py-28 xl:py-40">
            {isLoading ? (
              <div className="text-lg xs:text-xl md:text-2xl xl:text-3xl font-medium font-marcellus">
                <div className="w   -full h-[200px] relative flex items-center flex-col justify-center">
                  <div className="loader-page size-10">Loading...</div>
                </div>
              </div>
            ) : (
              <div className="text-lg xs:text-xl md:text-2xl xl:text-3xl font-medium">
                <h2 className="text-primary">No asset data available.</h2>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
