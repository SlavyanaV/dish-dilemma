import { FC, useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Button,
  Tooltip,
  Snackbar,
  Alert,
  AlertTitle,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Link } from 'react-router-dom';
import { colors, link } from '../../shared/styles/sharedStyles';
import { useUserContext } from '../../hooks/useUserContext';
import { likeRecipe } from '../../shared/services/likesService';
import { transformLikes } from '../../shared/utils';
import { CardType, LikesType } from '../../shared/types';

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
    user: { accessToken, _id },
  } = useUserContext();

  const isLikeDisabled = !_id || card._ownerId === _id || likes?.includes(_id);

  useEffect(() => {
    if (likesData) {
      const transformedLikes = transformLikes(likesData, card._id);
      setLikes(transformedLikes);
    }
  }, [card._id, likesData]);

  const handleOnLike = async () => {
    try {
      await likeRecipe({ cardId: card._id, likedBy: _id }, accessToken);

      setLikes((prevState) => [...prevState, _id]);
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
        <Link to={`/recipe-details/${card._id}`} style={link}>
          <Button variant="outlined" color="inherit">
            See details
          </Button>
        </Link>
        {isOwn ? (
          <></>
        ) : (
          <Tooltip
            title={`${likes?.length} likes ${!_id ? '(Log in to like)' : ''}`}
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
      <Snackbar
        open={isOpen}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setIsOpen(false)}
      >
        <Alert
          onClose={() => setIsOpen(false)}
          severity={
            alertMessage === 'Failed to like the recipe!' ? 'error' : 'success'
          }
          variant="filled"
          sx={{ width: '100%', color: colors.light }}
        >
          <AlertTitle>
            {alertMessage === 'Failed to like the recipe!'
              ? 'Error'
              : 'Success'}
          </AlertTitle>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};
