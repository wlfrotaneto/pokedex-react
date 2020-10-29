import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import spinner from "../../img/spinner.gif";

// const TYPE_COLORS = {
//     steel: 'B5B5C3',
//     dark: '4F3A2D',
//     bug: 'B1C12E',
//     dragon: '755EDF',
//     electric: 'FCBC17',
//     fairy: 'F4B1F4',
//     fighting: '823551D',
//     fire: 'E73B0C',
//     flying: 'A3B3F7',
//     ghost: '6060B2',
//     grass: '74C236',
//     ground: 'D3B357',
//     ice: 'A3E7FD',
//     normal: 'C8C4BC',
//     poison: '934594',
//     psychic: 'ED4882',
//     rock: 'B9A156',
//     water: '3295F6'
//   };

const Sprite = styled.img`
    width: 5em;
    height: 5em;
    display: none;
`;

const Card = styled.div`
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.10), 0 1px 2px rgba(0, 0, 0, 0.20);
    transition: all 0.2s cubic-bezier(0.20, 0.10, 0.20, 1);
    &:hover {
        box-shadow: 0 10px 30px rgba(200, 200, 200, 0.30), 0 10px 10px rgba(200, 200, 200, 0.30)
    }
    -moz-user-select: none;
    -website-user-select: none;
    -o-user-select: none;
    user-select: none;
    border-radius: 20px;
`;

const StyledLink = styled(Link)`
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
        text-decoration: none;
        color:black;
    }
`;

export default class PokemonCard extends Component {

    state = {
        name: '',
        imgUrl: '',
        pokemonIndex: '',
        imgLoading: true,
        imgErrorLoading: false
    }

    componentDidMount() {
        const {name, url} = this.props;
        const pokemonIndex = url.split("/")[url.split("/").length - 2];
        const imgUrl = `https://github.com/pokeapi/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
        this.setState({
            name,
            imgUrl,
            pokemonIndex
        })
    }


    render() { 

        // var randomColor = () => {
        //     var keys = Object.keys(TYPE_COLORS);
        //     return TYPE_COLORS[keys[ keys.length * Math.random() << 0]];
        // };
        // style={{backgroundColor: `#${randomColor}`}}

        return (
            <div className='center-box col-lg-2 col-md-4 col-sm-6 mb-5'>
                <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
                    <Card className="card" >
                        {/* <h5 className="card-header">{this.state.pokemonIndex}</h5> */}
                        {this.state.imgLoading ? (
                            <img 
                                src={spinner}
                                style={{width: "5em", height: "5em"}}
                                className="card-img-top mx-auto d-block rounded mt-2">
                            </img>
                        ) : null}
                        <Sprite 
                            className="card-img-top mx-auto mt-2 rounded" 
                            src={this.state.imgUrl} 
                            style={
                                this.state.imgErrorLoading ? {display: "none"} 
                                : this.state.imgLoading ? null : {display:"block"}
                            } 
                            onError={() => this.setState({imgErrorLoading: true})}
                            onLoad={() => this.setState({imgLoading: false})} 
                        />
                        {this.state.imgErrorLoading ? (
                            <h6 className="mx-auto">
                                <span className="badge badge-danger mt-2">Error Loading</span>
                            </h6>
                        ) : null}
                        <div className="card-body mx-auto">
                            <h6 className="card-title text-capitalize">
                                {this.state.name}
                            </h6>
                        </div>
                    </Card>
                </StyledLink> 
            </div>
        )
    }
}
