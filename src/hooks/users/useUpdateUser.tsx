import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateUserRequest } from '../../models/user.model';
import { userService } from '../../services/user.service';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (userData: UpdateUserRequest) => userService.updateUser(userData),
    onSuccess: () => {
      // ✅ Invalida el listado completo de usuarios
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  });

  return { updateUser, isPending, isError, error, isSuccess };
}
