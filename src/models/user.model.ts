export interface User {
  userId: number;
  name: string;
  lastname: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  name: string;
  lastname: string;
  role: string;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  userId: number;
  createdAt: string;
}
