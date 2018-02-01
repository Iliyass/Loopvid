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
      { label: "All", value: 'all' },
      { label: "SD", value: "SD" },
      { label: "HD", value: "HD" }
    ],
    selectedValue: 'all'
  },
  sort: {
    label: "Sort",
    values: [ 
      { label: "Revelence", value: "revelence" },
      { label: "Upload date", value: "UploadDate" },
      { label: "View count", value: "ViewCount" },
      { label: "Rating", value: "Rating" },
    ],
    selectedValue: "revelence"
  },
  duration: {
    label: "Duration",
    values: [ 
      { label: "Short (<4 minutes)", value: "SHORT" },
      { label: "Long (>20 minutes)", value: "LONG" }
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
    // TODO: Set filters status from props
    const { selectedValues } = props
    this.state = {
      filters: {
        ...filters,
        resolution: {
          ...filters.resolution,
          selectedValue: props.selectedValues.resolution || 'all'
        },
        sort: {
          ...filters.sort,
          selectedValue: props.selectedValues.sort || "revelence"
        },
        duration: {
          ...filters.duration,
          selectedValue: props.selectedValues.duration
        },
      }
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      filters: {
        ...filters,
        resolution: {
          ...filters.resolution,
          selectedValue: nextProps.selectedValues.resolution || 'all'
        },
        sort: {
          ...filters.sort,
          selectedValue: nextProps.selectedValues.sort || "revelence"
        },
        duration: {
          ...filters.duration,
          selectedValue: nextProps.selectedValues.duration
        },
      }
    })
  }
  handleFilterClick({ filter, value }){
    this.setState({ filters: {
        ...this.state.filters, 
        [filter]: {
          ...this.state.filters[filter], 
          selectedValue: (this.state.filters[filter].selectedValue !== value) ? value : null
        } 
      } 
    }, () => {
      debugger
    })
  }
  render(){
    const { classes, onChange } = this.props
    const { filters } = this.state
    return (
        <Grid container className={classes.demo} justify="space-around" spacing={Number(23)}>
          {
            Object.keys(filters)
            .map((f, i) => (
              <Grid key={`${i}-Filters`} item>
                  <Typography className={classes.filterLabel}>{filters[f].label}</Typography>
                  <Divider className={classes.divider} light />
                  <Grid alignItems="flex-start" direction="column" key={i} container>
                    {
                      filters[f].values.map((v, _i) => (  
                        <Button key={`${_i}-Filters-Button`} dense onClick={() => { onChange({ filter: f, value: v.value}) }}  
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Filters);