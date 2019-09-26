import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {Link} from "react-router-dom";
import {getAuthenticationState} from "./redux/selectors";
import {connect} from "react-redux";

let isOpen = false;

const mapStateToProps = (state) => {
    const authenticationState = getAuthenticationState(state);
    return {authenticationState}
};

export const SmokeFreakHeader = ({authenticationState}) => {
    const onLogout = () => {
        if (authenticationState.keycloak) {
            authenticationState.keycloak.logout();
        }
    };

    const toggle = () => isOpen = !isOpen;
    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">SmokeFreak</NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                <img src="./img/pannekoek.jpg" alt="Avatar" width="30px"/>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Logged in as <b>gijs</b>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/profile">Your profile</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/about">About</Link>
                                </DropdownItem>
                                <DropdownItem divider/>
                                <DropdownItem onClick={onLogout}>
                                    Sign out
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );

};

export default connect(mapStateToProps)(SmokeFreakHeader);