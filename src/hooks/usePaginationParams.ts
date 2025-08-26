import { useSearchParams } from 'react-router-dom';

export function usePaginationParams(param: string = 'page') {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get(param) || 1);

  const setPage = (page: number) => {
    // Clonamos los params para no perder otros filtros
    const newParams = new URLSearchParams(searchParams);
    newParams.set(param, String(page));
    setSearchParams(newParams);
  };

  return { page: currentPage, setPage };
}
