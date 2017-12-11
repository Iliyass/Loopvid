import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Grid from 'material-ui/Grid';
import TrackVisibility from 'react-on-screen';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';


const styles = theme => ({
  subheading: {
    display: "flex",
    alignSelf: "flex-start",
    marginTop: 20,
    marginLeft: 25
  }
})

class Listing extends React.Component {
  render(){
    const { classes } = this.props
    return (
      <Grid container  justify="space-around" alignItems="center" direction="column">
        {this.props.items.map((c, i) => (
          [
              i === 0 ?
                <Typography className={classes.subheading} alignSelf="flex-start" type="subheading" gutterBottom>
                  Subheading
                </Typography>
              : null
            ,
            <Grid style={{ width: "100%"}} item key={i}>
              <TrackVisibility>
                <Card {...c} />  
              </TrackVisibility>            
            </Grid>
          ]
        ))}      
      </Grid> 
    )
  }
}  

export default withStyles(styles)(Listing);