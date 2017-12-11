import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';

const filters = {
  resolution: {
    label: "Resolution",
    values: [ 
      { label: "All", value: "all" },
      { label: "SD", value: "sd" },
      { label: "HD", value: "hd" }
    ],
    selectedValue: "all"
  },
  sort: {
    label: "Sort",
    values: [ 
      { label: "Revelence", value: "revelence" },
      { label: "Upload date", value: "upload_date" },
      { label: "View count", value: "view_count" },
      { label: "Rating", value: "rating" },
    ],
    selectedValue: "revelence"
  },
  duration: {
    label: "Duration",
    values: [ 
      { label: "Short (<4 minutes)", value: "short" },
      { label: "Long (>20 minutes)", value: "long" }
    ],
    selectedValue: null
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
    color: "rgba(0, 0, 0, 0.26)"
  },
  filterLabel: {
    marginLeft: 5
  },
  divider: {
    marginBottom: 13
  },
  demo: {
    marginTop: "18%",
    marginBottom: "2%"
  }
});
class Filters extends Component {
  constructor(props){
    super(props)
    this.handleFilterClick = this.handleFilterClick.bind(this)
    this.state = {
      filters
    }
  }
  handleFilterClick({ filter, value }){
    this.setState({ filters: {...this.state.filters, [filter]: {...this.state.filters[filter], selectedValue: (this.state.filters[filter].selectedValue !== value) ? value : null } } })
  }
  render(){
    const { classes } = this.props
    const { filters } = this.state
    return (
        <Grid container className={classes.demo} justify="space-around" spacing={Number(23)}>
          {
            Object.keys(filters)
            .map((f, i) => (
              <Grid key={i} item>
                  <Typography className={classes.filterLabel}>{filters[f].label}</Typography>
                  <Divider className={classes.divider} light />
                  <Grid alignItems="flex-start" direction="column" key={i} container>
                    {
                      filters[f].values.map(v => (  
                        <Button dense onClick={() => this.handleFilterClick({ filter: f, value: v.value})}  
                                      raised={filters[f].selectedValue === v.value}  
                                      className={classes.button}>{v.label}</Button>   
                      ))
                    }
                  </Grid>
              </Grid>
            ))
          }
          </Grid>
    )
  }
}
Filters.propTypes = {
  classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(Filters);