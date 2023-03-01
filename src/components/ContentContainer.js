import {
  Box,
  CardActionArea,
  Typography,
  CardMedia,
  CardContent,
  Card,
} from '@mui/material';

export const ContentContainer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '93.4vh',
        backgroundImage:
          'url(https://i.ibb.co/Yb2fMzQ/Psychozub-Realistic-wooden-kitchen-board-with-kitchen-utensils-f6c72a8a-d4c0-4be8-9e3b-aca73ea1dff6.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Card sx={{ width: '80%', height: '80%' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://thecozycook.com/wp-content/uploads/2022/04/Lasagna-Recipe-f.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Recipe name
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Show details here
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};
