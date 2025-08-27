import { useSearchParams } from 'react-router-dom';

export const usePaginationParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || 1);

  const setPage = (newPage: number) => {
    searchParams.set('page', String(newPage));
    setSearchParams(searchParams);
  };

  return { page, setPage };
};
