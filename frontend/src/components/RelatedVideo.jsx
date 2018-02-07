import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import SwipeableViews from 'react-swipeable-views';
import _ from 'lodash';

const styles = theme => ({
  root: {
    bottom: 90,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    zIndex: 1
  },
  swipeContainer: {
    width: 10
  },
  card: {
    maxWidth: 200,
    zIndex: 1,
    height: 150,
    width: 200,
    marginLeft: 5
  },
  media: {
    height: 150,
    width: 200
  },
  slideItem: {
    width: 200
  }
});

class SimpleMediaCard extends React.PureComponent {
  render() {
    const { classes } = this.props;
    console.log('SimpleMediaCard')
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={`https://picsum.photos/200/${_.random(50, 55)}`}
          title="Contemplative Reptile"
        />
      </Card>
    );
  }
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const SimpleMediaCardConnected = withStyles(styles)(SimpleMediaCard);

class Container extends React.PureComponent {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return false;
  // }
  render() {
    const { classes } = this.props
    return (
      <SwipeableViews className={classes.root} slideStyle={{ width: 200 }} containerStyle={{ width: 345 }} >
        <SimpleMediaCardConnected />
        <SimpleMediaCardConnected />
        <SimpleMediaCardConnected />
      </SwipeableViews>
    )
  }
}

export default withStyles(styles)(Container);