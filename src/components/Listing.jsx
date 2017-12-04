import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Grid from 'material-ui/Grid';

class Listing extends React.Component {
  render(){
    return (
      <Grid container  justify="space-around" alignItems="center" direction="column">
        {this.props.items.map((c, i) => (
          <Grid style={{ width: "100%"}} item key={i}>
            <Card {...c} />              
          </Grid>
        ))}      
      </Grid> 
    )
  }
}  

export default Listing