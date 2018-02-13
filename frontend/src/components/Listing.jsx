import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Grid from 'material-ui/Grid';
import TrackVisibility from 'react-on-screen';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import { CircularProgress } from 'material-ui/Progress';
import InfiniteScroll from 'react-infinite-scroll-component';
import CardLoader from './CardLoader';

const styles = theme => ({
  subheading: {
    display: "flex",
    alignSelf: "flex-start",
    marginTop: 20,
    marginLeft: 25
  },
  progress: {
    alignSelf: "center",
    marginTop: 40
  }
});

class Listing extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      page: 1
    }
    this.fetchNextPage = this.fetchNextPage.bind(this)
  }
  fetchNextPage(){
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.props.query.refetch({
        page: this.state.page
      })
    })
  }
  render(){
    const { classes, query } = this.props
    return (
        <InfiniteScroll
          // pullDownToRefresh // TODO: when switiching routes there is an error thrown of style is null
          pullDownToRefreshContent={
            <h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>
          }
          releaseToRefreshContent={
            <h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>
          }
          refreshFunction={query.refetch}
          next={query.fetchNextPage}
          hasMore={true}
          loader={[<CardLoader key={`${1}-CardLoader`} />, <CardLoader key={`${2}-CardLoader`} />]}
          endMessage={
            <p style={{textAlign: 'center'}}>
              <b>Yay! You have seen it all</b>
            </p>
          }>   
          {/* {
            query.loading &&
              <CircularProgress className={classes.progress} size={50} />
          } */}
          { 
            ! query.loading && this.props.items.map((c, i) => (
              [
                  i === 0 ?
                    <Typography key={`${i}-Card-Header`} className={classes.subheading}  type="subheading" gutterBottom>
                      Subheading
                    </Typography>
                  : null
                ,
                <Grid style={{ width: "100%", marginBottom: 20 }} item key={`${i}-Card-Video`}>
                  <TrackVisibility>
                    <Card {...c} />  
                  </TrackVisibility>            
                </Grid>
              ]
            ))
          } 
        </InfiniteScroll> 
    )
  }
}  

export default withStyles(styles)(Listing);