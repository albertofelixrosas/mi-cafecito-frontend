import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../../services/user.service';

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteUser,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (id: number) => userService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return { deleteUser, isPending, isError, error, isSuccess };
}
