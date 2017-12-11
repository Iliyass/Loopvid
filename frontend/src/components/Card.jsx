import React, { Component } from 'react';
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
import CardMenu from './CardMenu';

const styles = theme => ({
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
  iconButton: {
    ...theme.typography.button,
    margin: 10
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,

  },
  likeButton: {
    ...theme.typography.iconButton,
    marginLeft: 15,
    marginRight: 34,
  }
})

class LVCard extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
    this.handleCardMenuClick = this.handleCardMenuClick.bind(this)
  }
  handleCardMenuClick(){

  }
  render() {
    const { classes, isVisible, title, poster, videoSrc } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
                </Avatar>
          }
          action={
            <CardMenu />
          }
          title={title}
          subheader="September 14, 2016"
        />
        <Video poster={poster} videoSrc={videoSrc} isVisible={isVisible} />
        <CardActions >
          <div className={classes.controls}>
            <IconButton className={classes.likeButton}>
              <ThumbUp />
              <Typography className={classes.iconButton} >233K</Typography>
            </IconButton>
            <IconButton>
              <ThumbDown />
              <Typography className={classes.iconButton} >23</Typography>
            </IconButton>
          </div>
          <div className={classes.flexGrow} />
          {/* <IconButton aria-label="Show more">
              <ShareIcon />
            </IconButton> */}
        </CardActions>
      </Card>
    );
  }

}

LVCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LVCard);