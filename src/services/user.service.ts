import type { CreateUserRequest, UpdateUserRequest, User } from '../models/user.model';
import { apiService } from './api.service';

const baseURL = '/users';

export class UserService {
  async getUsers(): Promise<User[]> {
    return apiService.get<User[]>(baseURL);
  }

  async deleteUser(id: number): Promise<void> {
    return apiService.delete<void>(`${'/users'}/${id}`);
  }

  async createUser(user: CreateUserRequest): Promise<User> {
    return apiService.post<User>('/users', user);
  }

  async updateUser(user: UpdateUserRequest): Promise<User> {
    const { userId, ...data } = user;
    return apiService.patch<User>(`/users/${userId}`, data);
  }

  async getUserById(id: number): Promise<User> {
    return apiService.get<User>(`${'/users'}/${id}`);
  }
}

export const userService = new UserService();
