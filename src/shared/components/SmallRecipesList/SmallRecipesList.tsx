import { Grid, Pagination, Stack, Alert } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { SmallRecipeCard } from './SmallRecipeCard/SmallRecipeCard';
import { colors, grid } from '../../styles/sharedStyles';
import { usePagination } from '../../../hooks/usePagination';
import { ChangeEvent, FC, useState } from 'react';
import { CardType, LikesType } from '../../types';

type Props = {
  cardsDataState: CardType[];
  likesData?: LikesType[];
};

const RECIPES_PER_PAGE = 9;

export const SmallRecipesList: FC<Props> = ({ cardsDataState, likesData }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const currentPageData = usePagination(
    cardsDataState,
    RECIPES_PER_PAGE,
    currentPage
  );

  const count = Math.ceil(cardsDataState.length / RECIPES_PER_PAGE);

  const handleOnPageChange = (_: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      {cardsDataState.length ? (
        <>
          <Grid
            container
            sx={{
              mb: 2.5,
              ...grid,
            }}
          >
            {currentPageData.map((card, index) => (
              <Grid item key={index}>
                <SmallRecipeCard
                  card={card}
                  likesData={likesData}
                  isOwn={false}
                />
              </Grid>
            ))}
          </Grid>
          <Pagination
            sx={{ display: 'flex', justifyContent: 'center' }}
            count={count}
            size="large"
            page={currentPage}
            shape={'rounded'}
            onChange={handleOnPageChange}
          />
        </>
      ) : (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert
            severity="info"
            sx={{
              minWidth: 800,
              backgroundColor: colors.light,
              color: colors.dark,
            }}
            icon={<InfoIcon sx={{ color: colors.dark }} />}
          >
            Currently there are no recipes in database
          </Alert>
        </Stack>
      )}
    </>
  );
};
