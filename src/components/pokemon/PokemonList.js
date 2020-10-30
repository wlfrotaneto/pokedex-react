import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import styled from 'styled-components';
import InfiniteScroll from "react-infinite-scroll-component";

// const Sprite = styled.img`
//     width: 5em;
//     height: 5em;
//     display: none;
// `;

const Loading = styled.div`
    width: 200px;
    margin: 20px auto;
    text-align: center;
`;

export default class PokemonList extends Component {

    state = {
        url: `https://pokeapi.co/api/v2/pokemon/?limit=90`,
        pokemon: null,
        dataLength: '',
        nextUrl: '',
    }

    async componentDidMount() {
        const res = await axios.get(this.state.url);
        this.setState({pokemon: res.data['results']});

        this.setState({
            dataLength: 90,
            nextUrl: res.data.next
        })
    }

    render() {

        console.log(this.state.nextUrl);
        return (
            <React.Fragment>
                <InfiniteScroll
                    dataLength={this.state.dataLength}
                    next={async () => {
                        const res = await axios.get(this.state.nextUrl);
                        this.setState({pokemon: this.state.pokemon.concat(res.data['results'])});
                        this.setState({
                            dataLength: this.state.dataLength + 90,
                            nextUrl: res.data.next
                        })
                    }}
                    hasMore={this.state.nextUrl == null ? false : true}
                    loader={<h4 className="text-white text-center">Loading...</h4>}
                    endMessage={
                        <p className="text-white text-center">
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
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
                        <h1 className='text-center text-white'>Loading</h1>
                    )}
                </InfiniteScroll>
            </React.Fragment>
        )
    }
}
