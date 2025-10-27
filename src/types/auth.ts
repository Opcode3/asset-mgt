export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  password: string;
}

export interface UserPayload {
  email: string;
  name: string;
  role: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginResponse {
  data: {
    user: User;
    access_token: string;
  };
}

export interface UserResponseType {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: CreatedByType | undefined;
  __v: number;
}

export interface CreatedByType {
  _id: string;
  name: string;
  email: string;
}
