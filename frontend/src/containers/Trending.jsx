import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Listing from 'components/Listing';
import Filters from 'components/Filters';
import { withStyles } from 'material-ui/styles';
import { graphql, compose } from 'react-apollo';
import Q from 'apollo/queries';

class Trending extends Component {
  render(){
    const { videos } = this.props
    return (
      <Fragment>
          <Listing items={videos.videos} query={videos} />   
      </Fragment>
    )
  }
}


export default withStyles({})(compose(
  graphql(Q.QUERY_CLIENT_STATE_UI, { name: 'state' }),  
  graphql(Q.QUERY_VIDEOS, { name: 'videos', 
    options: { 
      variables: { 
        page: 1,
        pageSize: 10 
      } 
    },
    props({ videos: { fetchMore, variables, ...restProps }, ownProps }) {
      return {
        ...ownProps,
        videos: {
          ...restProps,
          fetchNextPage() {
            return fetchMore({
              variables: {
                ...variables,
                page: variables.page + 1,
                pageSize: 3
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) { return previousResult; }
                return ({...previousResult, videos: [...previousResult.videos, ...fetchMoreResult.videos] })
              }
            })
          }
        }
      }
    }
  })
)(Trending));