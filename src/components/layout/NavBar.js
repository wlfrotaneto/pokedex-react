import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import logo from "../../img/logo_poke.png";

const NavBarStyled = styled.nav`
    background-color: #D53B47;
    border-radius: 0px 0px 20px 20px; 
`;

export default class NavBar extends Component {
    render() {
        return (
            <div>
                <Link to={'/'}>
                    <NavBarStyled className="navbar navbar-expand-md fixed-top">
                        <img alt="Pokedex Logo" class="mx-auto d-block" src={logo}></img>
                    </NavBarStyled>
                </Link>
            </div>
        );
    }
}
