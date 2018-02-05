import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Grid from 'material-ui/Grid';
import TrackVisibility from 'react-on-screen';
import BottomNavigation, { BottomNavigationButton } from 'material-ui/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import FavoriteIcon from 'material-ui-icons/Favorite';
import LocationOnIcon from 'material-ui-icons/LocationOn';
import FolderIcon from 'material-ui-icons/Folder';
import HomeIcon from 'material-ui-icons/Home';
import SearchIcon from 'material-ui-icons/Search';
import StarRate from 'material-ui-icons/Star';
import Subscriptions from 'material-ui-icons/Subscriptions';
import Whatshot from 'material-ui-icons/Whatshot';
import ArrowBack from 'material-ui-icons/ArrowBack';

import Autocomplete from '../components/Autocomplete';
import Paper from 'material-ui/Paper';

import Filters from '../components/Filters';
import FilterListIcon from 'material-ui-icons/FilterList';

import Sidebar from '../components/Sidebar';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

const stylesNav = {
  root: {
    width: "100%",
    position: "fixed",
    zIndex: 999999,
    bottom: 0
  },
};

const navRoutes = {
  recents:{
    label: "Home",
    path: "/",
    component: <HomeIcon />
  },
  trending: {
    label: "Trending",
    path: "/trending",
    component: <Whatshot />
  },
  categories: {
    label: "Categories",
    path: "/categories",
    component: <Subscriptions />
  }
}
class LabelBottomNavigation extends React.Component {
  constructor(props){
    super(props)
  }
  
  state = {
    value: this.getCurrentBotton()
  };

  getCurrentBotton(){
    const activePath = this.props.activePath || "/"
    const routerFiltered = Object.keys(navRoutes).filter(r => activePath === navRoutes[r].path)
    return routerFiltered.length ? routerFiltered[0] : 'recents'
  }
  handleChange = (event, value) => {
    this.setState({ value });
    this.props.onNavigate(navRoutes[value].path);
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation showLabels value={value} onChange={this.handleChange} className={classes.root}>
        {
          Object.keys(navRoutes)
              .map(route => ({...navRoutes[route], value: route}))
              .map((r, i) => <BottomNavigationButton key={i} label={r.label} value={r.value} icon={r.component} />)
        }
      </BottomNavigation>
    )
  }
}

LabelBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

const LabelBottomNavigationStyled = withStyles(stylesNav)(LabelBottomNavigation);

const styles = theme => ({
  root: {
    marginTop: 55,
    flexGrow: 1,
    // alignItems: "center",
    // justifyContent: "center",
    flexDirection: "column"
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  rootPaper: {
    height: 26,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});
class ButtonAppBar extends React.PureComponent {
constructor(props){
  super(props)
  this.handleNavigate = this.handleNavigate.bind(this)
  this.state = {
    searchMode: false,
    nestedRoute: false,
    searchFiltersOpen: false,
    sidebarOpen: false
  }
}
handleNavigate(routeValue){
  this.props.history.push(`${routeValue}`)
}
renderSearchBar(){
  const { classes } = this.props;
  return (
      <Autocomplete onSearch={this.handleSearch} />
  )
}
render() {  
  const { classes } = this.props;
  const { data: { stateUI: { searchMode, searchFiltersOpen, filtersResolution, filtersSort, 
    filtersDuration } }, updateStateUI } = this.props
  console.log('this.props.history.location.pathname', this.props.history.location.pathname)
  return (
    <div className={classes.root}>
      <Sidebar open={this.state.sidebarOpen} onClose={() => this.setState({ sidebarOpen: !this.state.sidebarOpen })} onRequestClose={() => this.setState({ sidebarOpen: !this.state.sidebarOpen })} />
      <AppBar position="fixed">
        <Toolbar>
          { ! searchMode ? [
              this.state.nestedRoute ? 
                <IconButton key={"menu-1"} className={classes.menuButton} color="contrast" aria-label="Menu">
                  <ArrowBack />
                </IconButton>
                : <IconButton onClick={() => this.setState({ sidebarOpen: !this.state.sidebarOpen })} key={"menu-2"} className={classes.menuButton} color="contrast" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
              ,
              <Typography key={"logo-1"} type="title" color="inherit" className={classes.flex}>
                Loopvid
              </Typography>
            ] : this.renderSearchBar()
          }

          { searchMode &&
            <IconButton color="contrast" onClick={e => updateStateUI('searchFiltersOpen', !searchFiltersOpen)}>
                <FilterListIcon className={classes.leftIcon}/>
            </IconButton>
          }
          <IconButton onClick={e => updateStateUI('searchMode', !searchMode)} color="contrast">
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
        { searchFiltersOpen &&
          <Filters onChange={({ filter, value }) => { 
                      const map = { 
                        resolution: 'filtersResolution', 
                        sort: 'filtersSort', 
                        duration: 'filtersDuration' 
                      }
                      const previousValue = this.props.data.stateUI[map[filter]]
                      updateStateUI(map[filter], value === previousValue ? null : value ) 
                    }} 
                    selectedValues={{ resolution: filtersResolution, sort: filtersSort, duration: filtersDuration }} />
        }
        <div>
          {this.props.children}
        </div>
        <LabelBottomNavigationStyled 
          activePath={this.props.history.location.pathname} 
          onNavigate={this.handleNavigate} />        
    </div>
  );
}
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
const q__GET_SEARCH_STATE = gql`
  query getState {
    stateUI @client{
      searchMode
      searchTerm
      filtersResolution
      filtersSort
      filtersDuration
      searchFiltersOpen
    }
  }`
const m__UPDATE_STATE = gql`
  mutation updateStateIU($key: String!, $value: String!) {
    updateUI(key: $key, value: $value) @client
  }
`
export default withStyles(styles)(compose(
  graphql(q__GET_SEARCH_STATE),
  graphql(m__UPDATE_STATE, {
  props: ({ mutate }) => ({
    updateStateUI : (key, value) => mutate({ variables: { key, value} })
  })
}))(ButtonAppBar));