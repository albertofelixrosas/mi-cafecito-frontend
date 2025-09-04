import { useQuery, keepPreviousData } from '@tanstack/react-query';
import type { User } from '../../models/user.model';
import { userService } from '../../services/user.service';

export const useUsers = () => {
  const { data, error, isLoading, isFetching, refetch } = useQuery<User[], Error>({
    queryKey: ['users'], // 👈 clave estable
    queryFn: () => userService.getUsers(),
    placeholderData: keepPreviousData, // mantiene datos previos mientras carga
  });

  return {
    users: data ?? [],
    isLoading,
    isFetching,
    error,
    refetch,
  };
};
