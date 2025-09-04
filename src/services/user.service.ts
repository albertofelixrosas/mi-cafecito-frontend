import type { User } from '../models/user.model';
import { apiService } from './api.service';

const baseURL = '/users';

export class UserService {
  async getUsers(): Promise<User[]> {
    return apiService.get<User[]>(baseURL);
  }

  async deleteUser(id: number): Promise<void> {
    return apiService.delete<void>(`${'/users'}/${id}`);
  }
}

export const userService = new UserService();
