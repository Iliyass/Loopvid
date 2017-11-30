import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Video from './Video';
import classnames from 'classnames';

const styles = {
  root: {
    flex: "1 0 auto"
  },
  card: {
    // maxWidth: 345,
    // width: document.body.clientWidth ,
    width: "100%",
    minHeight: "120%" 

  },
  media: {
    // height: 200,
  },
};

function SimpleMediaCard(props) {
  const { classes, isVisible, title, poster, videoSrc } = props;
  return (
      <Card className={classes.card}>
        <CardHeader
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  R
                </Avatar>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title={title}
              subheader="September 14, 2016"
            />
        <Video poster={poster} videoSrc={videoSrc}  play={isVisible} pause={!isVisible} />
        <CardActions >
            <IconButton>
              <ThumbUp />
            </IconButton>
            <IconButton>
              <ThumbDown />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
          </CardActions>
      </Card>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);