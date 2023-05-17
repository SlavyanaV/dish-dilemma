import { CardActions, Button, Box, Typography, Tooltip } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Link } from 'react-router-dom';
import { colors, link } from '../../../../styles/sharedStyles';
import { FC } from 'react';
import { useUserContext } from '../../../../../hooks/useUserContext';

type Props = {
  isOwn: boolean;
  ownerEmail: string;
  likes: string[];
  handleOnLike: () => Promise<void>;
  isLikeDisabled: boolean;
  id?: string;
};

export const SmallRecipeActions: FC<Props> = ({
  id,
  isOwn,
  ownerEmail,
  likes,
  handleOnLike,
  isLikeDisabled,
}) => {
  const {
    user: { userId },
  } = useUserContext();

  return (
    <CardActions
      disableSpacing
      sx={{ display: 'flex', justifyContent: 'space-between' }}
      className="small-card-actions"
    >
      <Link to={`/recipe-details/${id}`} style={link}>
        <Button variant="outlined" color="inherit">
          See details
        </Button>
      </Link>
      {isOwn ? (
        <></>
      ) : (
        <>
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: 14 }} color={colors.secondary}>
              Added by:
            </Typography>
            <Typography
              variant="h5"
              color={colors.dark}
              sx={{ fontSize: '1.25em' }}
            >
              {ownerEmail || 'Unknown user'}
            </Typography>
          </Box>
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
        </>
      )}
    </CardActions>
  );
};
