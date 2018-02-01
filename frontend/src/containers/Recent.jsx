import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Utils from '../utils/';

import Listing from '../components/Listing';
import Filters from '../components/Filters';
import { withStyles } from 'material-ui/styles';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { CircularProgress } from 'material-ui/Progress';

const queryVideos = gql`
  query allVideos($page: Int = 0, $pageSize: Int = 10 $filter: Filter = {}, $sort: Sort = {}){
    videos(page: $page, pageSize: $pageSize, filter: $filter, sort: $sort){
      id
      title
      src
      thumbnail
      viewCount
      upvotes
      downvotes
      published_at
      user {
        id
        fullName
        avatar
      }
    }
  }
`

const queryStateUI = gql`
  query getState {
    stateUI @client{
      searchMode
      searchTerm
      filtersResolution
      filtersSort
      filtersDuration
      searchFiltersOpen
    }
  }
`

const styles = theme => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  progress: {
    alignSelf: "center",
    marginTop: 40
  }
});
class Recent extends Component {
  componentWillReceiveProps(nextProps){
    console.log('Recent componentWillReceiveProps ownProps', this.props.videos.videos)
    console.log('Recent componentWillReceiveProps nextProps', nextProps.videos.videos)
    const previousStateUI = this.props.state.stateUI
    const nextStateUI = nextProps.state.stateUI

    const previousFilters = {
      resolution: previousStateUI.filtersResolution,
      duration: previousStateUI.filtersDuration,
      sort: previousStateUI.filtersSort
    }
    const nextFilters = {
      resolution: nextStateUI.filtersResolution,
      duration: nextStateUI.filtersDuration,
      sort: nextStateUI.filtersSort
    }

    if(Utils.deepDifference(previousFilters, nextFilters)){
      const sort = nextFilters.sort ? {  [nextFilters.sort]: true } : {}
      this.props.videos.refetch({
          filter: { 
            resolution: nextStateUI.filtersResolution,
            duration: nextStateUI.filtersDuration
          },
          sort
      })
    }  
  }
  render(){
    const { classes, videos } = this.props
    if(videos.error) return "Sorry, Uknown error happend...";
    return (
        <Fragment>
            <Listing items={videos.videos} query={videos} />   
        </Fragment>
    )
  }
}


export default withStyles(styles)(compose(
  graphql(queryStateUI, { name: 'state' }),  
  graphql(queryVideos, { name: 'videos', 
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
                page: variables.page + 1
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) { return previousResult; }
                return Object.assign({}, previousResult, {
                  // Append the new feed results to the old one
                  videos: [...previousResult.videos, ...fetchMoreResult.videos],
                });
              }
            })
          }
        }
      }
    }
  })
)(Recent));