import gql from 'graphql-tag';

const QUERY_VIDEOS = gql`
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

const QUERY_CLIENT_STATE_UI = gql`
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

export default {
  QUERY_VIDEOS,
  QUERY_CLIENT_STATE_UI
}