import { Collapse, CardContent, Typography } from '@mui/material';
import { colors } from '../../../shared/styles/sharedStyles';
import { FC } from 'react';
import { Ingredient } from '../../../shared/types';

type Props = {
  isExpanded: boolean;
  description: string;
  ingredients?: Ingredient[];
};

export const ExpandedDetails: FC<Props> = ({
  isExpanded,
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
        {/* in order to display properly some of the recipes, that are returned as html string by the api */}
        <Typography
          paragraph
          sx={{
            textAlign: 'justify',
            overflowWrap: 'anywhere',
          }}
          dangerouslySetInnerHTML={{ __html: description }}
        ></Typography>
      </CardContent>
    </Collapse>
  );
};
