export interface LoginCredentials {
  identity: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    role: string;
    token: string;
    access: string;
  };
  message: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  platform: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive';
  phone?: string;
  avatar?: string;
}

export interface UsersResponse {
  success: boolean;
  data: User[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
    from: number;
    to: number;
  };
  message: string;
}

export interface UsersParams {
  periode?: string;
  page?: number;
  quantity?: number;
  search?: string;
  role?: string;
  platform?: string;
}