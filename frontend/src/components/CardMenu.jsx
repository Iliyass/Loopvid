import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import { withStyles } from 'material-ui/styles';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import FlagIcon from 'material-ui-icons/Flag';

const options = [
  'Report'
];

const ITEM_HEIGHT = 48;

const styles = theme => ({
  menuItem: {
    '&:focus': {
      background: theme.palette.primary[500],
      '& $text, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  text: {},
  icon: {},
});

class LongMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const open = Boolean(this.state.anchorEl);
    const { classes } = this.props
    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={this.state.anchorEl}
          open={open}
          onRequestClose={this.handleRequestClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {options.map(option => (
            <MenuItem key={option}  onClick={this.handleRequestClose}>
              <ListItemIcon className={classes.icon}>
                <FlagIcon />
              </ListItemIcon>
              <ListItemText classes={{ text: classes.text }} inset primary={option} />
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}

LongMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LongMenu);