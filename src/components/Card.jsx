import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Video from './Video';

const styles = {
  card: {
    maxWidth: 345,
    width: document.body.clientWidth ,
  },
  media: {
    height: 200,
  },
};

function SimpleMediaCard(props) {
  const { classes, isVisible } = props;
  return (
      <Card className={classes.card}>
        <Video play={isVisible} pause={!isVisible} />
        <CardContent>
          <Typography type="headline" component="h2">
            Lizard
          </Typography>
        </CardContent>
      </Card>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);