import React from 'react';
import { Paper, MuiThemeProvider, Chip, AppBar, MenuItem, IconMenu, 
  IconButton, Divider, Avatar, withStyles, Menu, ListItemText, ListItemSecondaryAction } from 'material-ui';
import deepOrange from 'material-ui/colors/deepOrange';
import { MoreVert, Edit } from 'material-ui-icons';

const styles = {
  chip: {
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gridColumnStart: 1,
    gridColumnEnd: 1,
    margin: 10,
    minHeight: '32px'

  },
  menu: {
    gridColumnStart: 2,
    gridColumnEnd: 2,
    height: '20px'

  },
  grid:{
    backgroundColor: 'LightGrey',
    display: 'grid',
    gridTemplateColumns: 'Auto 50px',
    gridTemplateRows: 'Auto'
  },
  avatar: {
    margin: 10,
    color: '#fff'
  },
};


class FilterComponent extends React.Component {

  constructor(props) {
    super(props);
    this.filterSelected = this.filterSelected.bind(this);
    this.editFilter = this.editFilter.bind(this);
    this.state = {
      filters: [
        { name: 'EMEA', selected: false },
        { name: 'Top 10', selected: true },
        { name: 'My Desk', selected: true, color: 'Red' }
      ],
      menuanchorEl: null 
    };
  }

  handleMenu = event => {
    this.setState({ menuanchorEl: event.currentTarget });
  };


  handleMenuClose = () => {
    this.setState({ menuanchorEl: null });
  };
  handleRequestDelete(filter) {
    filter.selected = false;
    this.setState({ filters: this.state.filters });
  }

  editFilter(e, filter){
    e.stopPropagation();
    this.menuPopUp.close();
    this.props.editFilterCallback(filter);
  }

  filterSelected(filter){
    filter.selected = !filter.selected;
    this.setState({filters: this.state.filters, menuanchorEl: null});
  }

  render() {
    const { classes } = this.props;
    const { menuanchorEl } = this.state;
    const menuopen = Boolean(menuanchorEl);
    var filters = [];
    var selectedItems = [];
    this.state.filters.map(function (filter, idx) {
      if (filter.selected) {
        selectedItems.push(
          <Chip key={idx}
            avatar={
              <Avatar style={{backgroundColor: filter.color}} className={classes.avatar}>
                <Edit onClick={(e) => this.editFilter(e, filter)} />
              </Avatar>
            }
            label={filter.name}
            styles={styles.chip}
            onDelete={() => this.handleRequestDelete(filter)}>
            
          </Chip>
        );
      }
      filters.push(
        <MenuItem key={idx}
          checked={filter.selected}
          onClick={() => this.filterSelected(filter)}
        >
          <ListItemText classes={{ text: classes.text }} primary={filter.name} />
          <ListItemSecondaryAction>
            <IconButton className={classes.icon}>
              <Edit onClick={(e) => this.editFilter(e, filter)} />
            </IconButton>
          </ListItemSecondaryAction>
        </MenuItem>
      );
    }.bind(this));
    return (
      <Paper>
        some data
      <p>
          some more data
      </p>

      <div style={styles.grid}>
        <div style={styles.wrapper}>
          {selectedItems}
        </div>
        <div style={styles.menu}>
            <IconButton className={classes.menuButton}
              color="contrast"
              aria-label="Menu"
              aria-owns={menuopen ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}>
              <MoreVert />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={menuanchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={menuopen}
              onClose={this.handleMenuClose}>
              <MenuItem>New Filter</MenuItem>
              <Divider />
              {filters}
            </Menu>
        </div>
      </div>

      </Paper>
    );
  }

}

export default withStyles(styles)(FilterComponent);
