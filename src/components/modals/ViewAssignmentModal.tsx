import { useModalStore } from "../../store/modalStore";
import Button from "../forms/Button";
import type { AssignmentResponseType } from "../../types/asset";
import { formatReadableDate } from "../../utils/helpers";

export default function ViewAssignmentModal() {
  const { closeModal, resetWhich, data } = useModalStore();

  const assignment = data as AssignmentResponseType | null;
  if (!assignment) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">No assignment data available.</p>
      </div>
    );
  }

  const { asset, assignedTo, assignedBy } = assignment;

  return (
    <div className="flex flex-col gap-6 xl:gap-5 md:w-[600px] max-w-full">
      {/* Header */}
      <div>
        <h2 className="text-secondary font-semibold text-xl xl:text-2xl mb-1">
          Assignment Details
        </h2>
        <p className="text-gray-500 text-sm">
          View detailed information about this asset assignment.
        </p>
      </div>

      {/* Main Grid: Asset + Assignment Info */}
      <div className="flex flex-col gap-4">
        {/* Asset Info */}
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-1 text-sm">
          <h3 className="font-semibold text-lg mb-2 text-gray-700">Asset</h3>
          {asset ? (
            <>
              <p>
                <span className="font-medium">Asset No:</span> {asset.assetNo}
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
            </>
          ) : (
            <p className="text-sm text-gray-500">No asset details available.</p>
          )}
        </div>

        {/* Assignment + User Info */}
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-1 text-sm">
          <h3 className="font-semibold text-lg mb-2 text-gray-700">
            Assignment Info
          </h3>

          <p>
            <span className="font-medium">Status:</span>{" "}
            <span className="capitalize">{assignment.status}</span>
          </p>
          {/* <p>
            <span className="font-medium">Comment:</span>{" "}
            {assignment.comment || "—"}
          </p> */}
          <p>
            <span className="font-medium">Assigned On:</span>{" "}
            {formatReadableDate(assignment.createdAt)}
          </p>

          <div className="pt-2">
            <h4 className="font-semibold text-gray-700 text-sm mb-1">
              Assigned To
            </h4>
            <p>
              <span className="font-medium">Name:</span> {assignedTo.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {assignedTo.email}
            </p>
          </div>

          {assignedBy && (
            <div className="pt-2">
              <h4 className="font-semibold text-gray-700 text-sm mb-1">
                Assigned By
              </h4>
              <p>
                <span className="font-medium">Name:</span> {assignedBy.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {assignedBy.email}
              </p>
              <p>
                <span className="font-medium">Role:</span>{" "}
                <span className="capitalize">{assignedBy.role}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Images Section */}
      {asset?.imageUrls && asset?.imageUrls?.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 className="font-semibold text-lg mb-2 text-gray-700">Images</h3>
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

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 mt-2">
        <Button
          type="button"
          onClick={() => {
            resetWhich();
            closeModal();
          }}
          className="!text-gray-700 bg-gray-200 font-semibold px-4"
        >
          Close
        </Button>
      </div>
    </div>
  );
}
