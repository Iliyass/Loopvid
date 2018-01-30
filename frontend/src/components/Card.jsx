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
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'react-apollo';
import moment from 'moment';

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
    margin: 10,
    color: 'rgb(117, 117, 117)'
    
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
    this.handleThumbup = this.handleThumbup.bind(this)
    this.handleThumbdown = this.handleThumbdown.bind(this)
  }
  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps', nextProps)
  }
  handleCardMenuClick(){

  }
  handleThumbdown(){
    const { id } = this.props
    this.props.mutateThumbdown();
  }
  handleThumbup(){
    const { id, upvotes } = this.props
    this.props.mutateThumbup({
      variables: { videoId: id},
      optimisticResponse: {
        __typename: 'Mutation',
        like: {
          id: id,
          __typename: 'Video',
          upvotes: upvotes + 1,
        },
      },
    });
  }
  render() {
    const { classes, _id, isVisible, title, thumbnail, 
            upvotes, downvotes, published_at, src, user,
            mutateThumbup, mutateThumbdown } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar src={user.avatar} aria-label="Recipe" className={classes.avatar}>
              
            </Avatar>
          }
          action={
            <CardMenu />
          }
          title={title}
          subheader={moment(published_at).format("YYYY-MM-DD")}
        />
        <Video poster={thumbnail} videoSrc={src} isVisible={isVisible} />
        <CardActions >
          <div className={classes.controls}>
            <IconButton onClick={this.handleThumbup} className={classes.likeButton}>
              <ThumbUp />
              <Typography className={classes.iconButton} >{upvotes}</Typography>
            </IconButton>
            <IconButton onClick={this.handleThumbdown}>
              <ThumbDown />
              <Typography className={classes.iconButton} >{downvotes}</Typography>
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

const mutationLike = gql`
  mutation like($videoId: ID!) {
    like(videoId: $videoId){
      id
      upvotes
    }
  }
`
const mutationDislike = gql`
  mutation dislike($videoId: ID!) {
    dislike(videoId: $videoId){
      id
      downvotes
    }
}
`

export default withStyles(styles)(compose ( 
  graphql(mutationLike, { 
    name: 'mutateThumbup',
    options: (props) => ({
      variables: { videoId: props.id }
    })
  }),
  graphql(mutationDislike, { 
    name: 'mutateThumbdown',
    options: (props) => ({
      variables: { videoId: props.id }
   })
  })
)(LVCard));
