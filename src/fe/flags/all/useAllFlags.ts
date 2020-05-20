import { usePage } from 'fe/lib/helpers/usePage';
import { useAllFlagsQuery } from './useAllFlags.generated';
import { useMemo } from 'react';

export const useAllFlags = () => {
  const allFlagsQ = useAllFlagsQuery();
  const flagsPage = usePage(allFlagsQ.data?.flags);
  return useMemo(() => {
    return {
      flagsPage
    };
  }, [flagsPage]);
};
