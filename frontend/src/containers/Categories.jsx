import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%'
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

const images = [
  {
    url: 'http://lorempixel.com/400/400/people/',
    title: 'Toys',
    width: '40%',
  },
  {
    url: 'http://lorempixel.com/400/401/people/',
    title: 'Animals',
    width: '30%',
  },
  {
    url: 'http://lorempixel.com/400/402/people/',
    title: 'Cars',
    width: '30%',
  },

  {
    url: 'http://lorempixel.com/400/403/people/',
    title: 'Computers',
    width: '30%',
  },

  {
    url: 'http://lorempixel.com/400/404/people/',
    title: 'Smartphones',
    width: '30%',
  },
];

class Categories extends Component{
  constructor(props) {
    super(props)
    this.handleCategoryClick = this.handleCategoryClick.bind(this)
  }
  handleCategoryClick(cat){
    this.props.history.push(`/categories/${cat.title}`)
  }
  render(){
    const { classes } = this.props;
    
      return (
        <div className={classes.root}>
          {images.map(image => (
            <ButtonBase
              onClick={() => this.handleCategoryClick(image)}
              focusRipple
              key={image.title}
              className={classes.image}
              style={{
                width: image.width,
                minHeight: 180
              }}
            >
              <div
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${image.url})`,
                }}
              />
              <div className={classes.imageBackdrop} />
              <div className={classes.imageButton}>
                <Typography
                  component="h3"
                  type="subheading"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {image.title}
                  <div className={classes.imageMarked} />
                </Typography>
              </div>
            </ButtonBase>
          ))}
        </div>
      ); 
  }
}

Categories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Categories);