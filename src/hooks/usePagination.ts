import { useEffect, useState } from 'react';
import { CardType } from '../shared/types';

export const usePagination = (
  data: CardType[],
  recipesPerPage: number,
  currentPage: number
) => {
  const [currentPageData, setCurrentPageData] = useState<CardType[]>([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * recipesPerPage;
    const endIndex = startIndex + recipesPerPage;
    const pageData = data.slice(startIndex, endIndex);

    setCurrentPageData(pageData);
  }, [currentPage, data, recipesPerPage]);

  return currentPageData;
};
