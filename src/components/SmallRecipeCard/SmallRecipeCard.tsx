import { FC, useEffect, useState } from 'react';
import { Card, CardHeader, CardMedia } from '@mui/material';
import { colors } from '../../shared/styles/sharedStyles';
import { useUserContext } from '../../hooks/useUserContext';
import { likeRecipe } from '../../shared/services/likesService';
import { transformLikes } from '../../shared/utils';
import { CardType, LikesType } from '../../shared/types';
import { AlertMessage } from '../../shared/components/AlertMessage/AlertMessage';
import { SmallRecipeActions } from './features/SmallRecipeActions';

type Props = {
  card: CardType;
  likesData?: LikesType[];
  isOwn: boolean;
};

export const SmallRecipeCard: FC<Props> = ({ card, likesData, isOwn }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [likes, setLikes] = useState<string[]>([]);

  const {
    user: { userId },
  } = useUserContext();

  const isLikeDisabled =
    !userId || card.ownerId === userId || likes?.includes(userId);

  useEffect(() => {
    if (likesData) {
      const transformedLikes = transformLikes(likesData, card.id!);
      setLikes(transformedLikes);
    }
  }, [card.id, likesData]);

  const handleOnLike = async () => {
    try {
      await likeRecipe({ cardId: card.id!, likedBy: userId });

      setLikes((prevState) => [...prevState, userId]);
      setAlertMessage('Successfully liked the recipe!');
      setIsOpen(true);
    } catch (err) {
      setAlertMessage('Failed to like the recipe!');
      setIsOpen(true);
    }
  };

  return (
    <Card sx={{ backgroundColor: colors.light }}>
      <CardMedia
        component="img"
        height="300"
        image={card?.pictureUrl}
        alt="Dish picture"
      />
      <CardHeader
        sx={{ textAlign: 'center', color: colors.dark }}
        title={card?.title}
        subheader={card?.category}
      />
      <SmallRecipeActions
        id={card.id}
        isOwn={isOwn}
        ownerEmail={card.ownerEmail}
        likes={likes}
        handleOnLike={handleOnLike}
        isLikeDisabled={isLikeDisabled}
      />
      <AlertMessage
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        severity={
          alertMessage === 'Failed to like the recipe!' ? 'error' : 'success'
        }
        alertTitle={
          alertMessage === 'Failed to like the recipe!' ? 'Error' : 'Success'
        }
        alertMessage={alertMessage}
      />
    </Card>
  );
};
