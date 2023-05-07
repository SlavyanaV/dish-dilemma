import { Collapse, CardContent, Typography } from '@mui/material';
import { colors } from '../../../shared/styles/sharedStyles';
import { FC } from 'react';
import { Ingredient } from '../../../shared/types';

type Props = {
  isExpanded: boolean;
  description: string;
  ingredients?: Ingredient[];
  cardType?: string;
};

export const ExpandedDetails: FC<Props> = ({
  isExpanded,
  cardType,
  ingredients,
  description,
}) => {
  return (
    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
      <CardContent sx={{ maxWidth: 650, color: colors.dark }}>
        <>
          <Typography paragraph sx={{ fontWeight: 'bold' }}>
            Ingredients:
          </Typography>
          <ul>
            {ingredients?.map((ingredient: Ingredient) => (
              <li key={ingredient.id}>{ingredient.text}</li>
            ))}
          </ul>
        </>
        <Typography paragraph sx={{ fontWeight: 'bold' }}>
          Instructions:
        </Typography>
        <Typography
          paragraph
          sx={{
            textAlign: 'justify',
            overflowWrap: 'anywhere',
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Collapse>
  );
};
