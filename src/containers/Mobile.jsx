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

import Autocomplete from '../components/Autocomplete';
import Paper from 'material-ui/Paper';


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
    label: "Recents",
    path: "/",
    component: <RestoreIcon />
  },
  featured: {
    label: "Featured",
    path: "/featured",
    component: <StarRate />
  },
  search: {
    label: "Search",
    path: "/search",
    component: <SearchIcon />
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
    const routerFiltered = Object.keys(navRoutes).filter(r => navRoutes[r].path === activePath)
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
      <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
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
    flexGrow: 1
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
  }
});
class ButtonAppBar extends React.Component {
constructor(props){
  super(props)
  this.handleNavigate = this.handleNavigate.bind(this)
  this.state = {
    searchMode: false
  }
}
handleNavigate(routeValue){
  console.log("routeValue", routeValue)
  this.props.history.push(`${routeValue}`)
}
renderSearchBar(){
  const { classes } = this.props;
  return (
    <Paper  className={classes.rootPaper} elevation={1}>
      <Autocomplete onSearch={this.handleSearch} />
    </Paper>
  )
}
render() {
  // <Button color="contrast">Login</Button>
  
  const { classes } = this.props;
  console.log("this.props", this.props)
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
        <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
                <MenuIcon />
              </IconButton>
          { ! this.state.searchMode ? [
              <Typography type="title" color="inherit" className={classes.flex}>
                Loopvid
              </Typography>
            ] : this.renderSearchBar()
          }
          <IconButton onClick={e => this.setState({ searchMode: !this.state.searchMode })} color="contrast">
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: 73 }} >
        {this.props.children}
        <LabelBottomNavigationStyled activePath={this.props.history.location.pathname} onNavigate={this.handleNavigate} />        
      </div>
    </div>
  );
}
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);