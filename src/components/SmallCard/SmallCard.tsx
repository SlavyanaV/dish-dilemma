import { FC, useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Button,
  Tooltip,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Link } from 'react-router-dom';
import { colors, link } from '../../shared/styles/sharedStyles';
import { useUserContext } from '../../hooks/useUserContext';
import { likeRecipe } from '../../shared/services/likesService';
import { transformLikes } from '../../shared/utils';
import { CardType, LikesType } from '../../shared/types';
import { AlertMessage } from '../../shared/components/AlertMessage/AlertMessage';

type Props = {
  card: CardType;
  likesData?: LikesType[];
  isOwn: boolean;
};

export const SmallCard: FC<Props> = ({ card, likesData, isOwn }) => {
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
        image={card?.picture}
        alt="Dish picture"
      />
      <CardHeader
        sx={{ textAlign: 'center', color: colors.dark }}
        title={card?.title}
        subheader={card?.category}
      />
      <CardActions
        disableSpacing
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Link to={`/recipe-details/${card.id}`} style={link}>
          <Button variant="outlined" color="inherit">
            See details
          </Button>
        </Link>
        {isOwn ? (
          <></>
        ) : (
          <Tooltip
            title={`${likes?.length} likes ${
              !userId ? '(Log in to like)' : ''
            }`}
          >
            <span>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<ThumbUpIcon />}
                onClick={handleOnLike}
                disabled={isLikeDisabled}
              >
                Like
              </Button>
            </span>
          </Tooltip>
        )}
      </CardActions>
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
