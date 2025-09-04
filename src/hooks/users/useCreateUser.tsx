import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateUserRequest, User } from '../../models/user.model';
import { userService } from '../../services/user.service';

export function useCreateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: createUser,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation<User, Error, CreateUserRequest>({
    mutationFn: userService.createUser,
    onSuccess: () => {
      // Invalidar la lista para que se refresque
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return { createUser, isPending, isError, error, isSuccess };
}
