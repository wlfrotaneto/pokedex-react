import React, { Component } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import styled from 'styled-components';

const Sprite = styled.img`
    width: 5em;
    height: 5em;
    display: none;
`;

export default class PokemonList extends Component {

    state = {
        url: "https://pokeapi.co/api/v2/pokemon/?limit=48",
        pokemon: null
    }

    async componentDidMount() {
        const res = await axios.get(this.state.url);
        this.setState({pokemon: res.data['results']});
    }

    render() {
        return (
            <React.Fragment>
            {this.state.pokemon ? (
                <div className="row">
                    {
                        this.state.pokemon.map(pokemon => (
                            <PokemonCard 
                                key={pokemon.name} 
                                name={pokemon.name}
                                url={pokemon.url}
                            />
                        ))
                    }
                </div>) 
            : (
                <h1>Loading</h1>
            )}
            </React.Fragment>
        )
    }
}
