// Asset Registration Form
export interface AssetRegistrationType {
  assetNo: string; // Alphanumeric (must include letters + numbers)
  serialNo: string; // Unique manufacturer/asset serial number
  assetType: string; // Enum for standardization
  description: string; // Asset description
  location: string; // Asset location
  registeredBy: string; // Name or ID of the person registering the asset
  registrationDate: string; // Date of registration (ISO format)
  status: "active" | "inactive" | "maintenance"; // Asset status
  comment?: string; // Optional comment
}

// Asset Assignment Form
export interface AssetAssignmentType {
  assignedTo: string; // Employee name or ID
  assigneeEmail: string; // Employee email
  assetId: string; // Asset ID being assigned
  // assignmentDate: string; // Date of assignment (ISO format)
  // returnDate?: string; // Optional expected return date (ISO format)
  assignedBy: string; // Manager/Admin name or ID
  comment?: string; // Optional comment
  returnedComment?: string; // Optional comment
}

// export interface AssignAssetPayload {
//   userId: string;
//   assignedDate?: string;
//   dueDate?: string;
//   note?: string;
// }

export type AssetResponseType = {
  _id: string;
  assetNo: string;
  serialNo: string;
  assetType: string;
  imageUrls: string[];
  description: string;
  location: string;
  status: "available" | "unavailable" | "assigned" | string; // adjust if you have fixed statuses
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
};

export interface AssignmentResponseType {
  id: string;
  status: string;
  comment: string;
  returnedComment: string;
  createdAt: string;
  updatedAt: string;

  assignedTo: {
    name: string;
    email: string;
  };

  assignedBy: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;

  asset: {
    id: string;
    assetNo: string;
    serialNo: string;
    assetType: string;
    imageUrls: string[];
    description: string;
    location: string;
    status: string;
  } | null;
}
