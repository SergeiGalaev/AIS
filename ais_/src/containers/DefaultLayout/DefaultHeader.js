import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'
import sygnet from '../../assets/img/brand/logo1.png'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 90, height: 30, alt: '' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: '' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">0</Badge></NavLink>
          </NavItem>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <i className="fa fa-user-circle"></i>{` ${this.props.username}`} 
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i>  Выйти</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
