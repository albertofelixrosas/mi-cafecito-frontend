// hooks/useProductById.ts
import { useQuery } from '@tanstack/react-query';
import { userService } from '../../services/user.service';
import type { User } from '../../models/user.model';

export const useUserById = (id: number) => {
  return useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => userService.getUserById(id),
    enabled: !!id, // solo ejecuta si id existe
  });
};
