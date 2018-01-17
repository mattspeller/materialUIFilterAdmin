import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, AppBar, Toolbar, Typography, Button, IconButton, MenuItem, Dialog, Divider, Menu } from 'material-ui';
import { Menu as MenuIcon, ArrowDropRight, ViewQuilt } from 'material-ui-icons';
import FilterComponent from './FilterComponent';

const styles = {
  appBar: {
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class AppComponent extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      views: [
        { name: 'All', selected: false },
        { name: 'AMER', selected: true },
        { name: 'APAC', selected: false },
        { name: 'EMEA', selected: false }
      ],
      viewanchorEl: null,
      menuanchorEl: null
    }
    this.viewSelected = this.viewSelected.bind(this);
    this.editFilterCallback = this.editFilterCallback.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  viewSelected(view) {
    this.state.views.forEach(v => v.selected = false);
    view.selected = true;
    this.setState({ views: this.state.views, viewanchorEl: null });
  }

  getSelectedViewName(){
    var name;
    this.state.views.forEach(v => {
      if (v.selected)
        name = v.name;
    });
    return name;
  }

  handleClose() {
    this.setState({ open: false });
  }

  editFilterCallback(filter){
    this.setState({ open: true, filter: filter });
  }

  handleMenu = event => {
    this.setState({ menuanchorEl: event.currentTarget });
  };

  handleViewMenu = event => {
    this.setState({ viewanchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ menuanchorEl: null });
  };

  handleViewMenuClose = () => {
    this.setState({ viewanchorEl: null });
  };

  render(){
    const { classes } = this.props;
    const { menuanchorEl, viewanchorEl } = this.state;
    const menuopen = Boolean(menuanchorEl);
    const viewopen = Boolean(viewanchorEl);

    var views = [];
    this.state.views.map(function (view, idx) {
      views.push(
        <MenuItem key={idx} checked={view.selected} onClick={() => this.viewSelected(view)}>{view.name}</MenuItem>
      );
    }.bind(this));

    const actions = [
      <Button
        label="Cancel"
        color='primary'
        onClick={this.handleClose}
      />,
      <Button
        label="Submit" 
        color='primary'
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];


    return (
      <div className={classes.root}>
        <AppBar position="static"
          style={styles.appBar}>
          <Toolbar>
            <IconButton className={classes.menuButton}
              color="contrast"
              aria-label="Menu"
              aria-owns={menuopen ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}>
              <MenuIcon />
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
              <MenuItem>About</MenuItem>
              <MenuItem>Connections</MenuItem>
              <MenuItem>Debug</MenuItem>
              <MenuItem>Layout Management</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Switch Function</MenuItem>
              <MenuItem>Help</MenuItem>
            </Menu>
            <IconButton className={classes.menuButton}
              color="contrast"
              aria-label="View Menu"
              aria-owns={viewopen ? 'menu-viewbar' : null}
              aria-haspopup="true"
              onClick={this.handleViewMenu}>
              <ViewQuilt />
            </IconButton>
            <Menu
              id="menu-viewbar"
              anchorEl={viewanchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={viewopen}
              onClose={this.handleViewClose}>
              <MenuItem>New View...</MenuItem>
              <MenuItem>{'Rename ' + this.getSelectedViewName() + "..."}</MenuItem>
              <MenuItem>{'Save ' + this.getSelectedViewName() + " As..."}</MenuItem>
              <MenuItem>{'Delete ' + this.getSelectedViewName()}</MenuItem>
              <Divider />
              <MenuItem>Import File...</MenuItem>
              <MenuItem>{'Export ' + this.getSelectedViewName()}</MenuItem>
              <Divider />
              {views}
            </Menu>
            <Typography type="title" color="inherit" className={classes.flex}>
              {"Some App - " + this.getSelectedViewName()}
            </Typography>
            <Button color="contrast">Sign Out</Button>
          </Toolbar>
        </AppBar>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          The actions in this window were passed in as an array of React objects.
        </Dialog>
        <FilterComponent />
        <FilterComponent />
        <FilterComponent />
      </div>
    );
  }
}

AppComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppComponent);