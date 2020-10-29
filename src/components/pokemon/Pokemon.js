import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const TYPE_COLORS = {
    steel: 'B5B5C3',
    dark: '4F3A2D',
    bug: 'B1C12E',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    water: '3295F6'
  };

  const StyledCard = styled.div`
    border-radius: 20px;
`;

    const InvDiv = styled.div`
        background-color: transparent!important;
    `;

export default class Pokemon extends Component {

    state = {
        name: '',
        imgUrl: '',
        pokemonIndex: '',
        types: [],
        stats: {
            hp: '',
            atk: '',
            def: '',
            spd: ''
        },
        exp: ''
    };

    async componentDidMount() {
        const {pokemonIndex} = this.props.match.params;
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        // const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;
    
        const pokemonRes = await axios.get(pokemonUrl);

        const name = pokemonRes.data.name;
        const imgUrl = pokemonRes.data.sprites.front_default;
        const exp = pokemonRes.data.base_experience;
        const types = pokemonRes.data.types.map(type => type.type.name);

        let {hp, atk, def, spd} = '';

        pokemonRes.data.stats.map(stat => {
            switch (stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat']
                    break;
                case 'attack':
                    atk = stat['base_stat']
                    break;
                case 'defense':
                    def = stat['base_stat']
                    break;
                case 'speed':
                    spd = stat['base_stat']
                    break;
                default:
                    break;
            }
        });

        this.setState({
            name,
            imgUrl,
            pokemonIndex,
            types,
            stats: {
                hp,
                atk,
                def,
                spd
            },
            exp
        });

    }

    render() {
        return (
            <div className="align-items-center">
                <div className="card bg-transparent border-0">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <StyledCard className="card col-md-3 mb-4">
                                <img
                                src={this.state.imgUrl}
                                className="card-img-top rounded mx-auto mt-2"
                                />
                                <h4 className="mx-auto text-capitalize mb-3">
                                    {this.state.name}
                                </h4>
                                {this.state.types.map(type => (
                                    <div className="align-self-center mb-2">
                                        <span
                                        key={type}
                                        className="badge badge-pill mr-1 text-capitalize"
                                        style={{
                                            backgroundColor: `#${TYPE_COLORS[type]}`,
                                            color: 'white',
                                            width: '8rem'
                                        }}
                                        >
                                        {type}
                                        </span>
                                    </div>
                                ))}
                                <div className="mb-3"></div>
                            </StyledCard>
                            <div className="col-md-1"></div>
                            <div className="col-md-8 mb-4">
                                <h4 className="text-center text-white mb-4">
                                    Base Stats
                                </h4>
                                <div className="row align-items-center mb-2">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth} text-white`}>
                                        HP
                                    </div>
                                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar bg-danger"
                                                role="progressbar"
                                                style={{
                                                    width: `${this.state.stats.hp}%`,
                                                    backgroundColor: `#${this.state.themeColor}`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.hp}/100</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-2">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth} text-white`}>
                                        ATK
                                    </div>
                                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar bg-warning"
                                                role="progressbar"
                                                style={{
                                                    width: `${this.state.stats.atk}%`,
                                                    backgroundColor: `#${this.state.themeColor}`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.atk}/100</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-2">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth} text-white`}>
                                        DEF
                                    </div>
                                    <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar "
                                                role="progressbar"
                                                style={{
                                                    width: `${this.state.stats.def}%`,
                                                    backgroundColor: `#${this.state.themeColor}`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.def}/100</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center mb-2">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth} text-white`}>
                                        SPD
                                    </div>
                                <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                    <div className="progress">
                                        <div
                                            className="progress-bar bg-secondary"
                                            role="progressbar"
                                            style={{
                                                width: `${this.state.stats.spd}%`,
                                                backgroundColor: `#${this.state.themeColor}`
                                            }}
                                            aria-valuenow="25"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            <small>{this.state.stats.spd}/100</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <div className="row align-items-center mb-2">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth} text-white`}>
                                        EXP
                                    </div>
                                <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                    <div className="progress">
                                        <div
                                            className="progress-bar bg-success"
                                            role="progressbar"
                                            style={{
                                                width: `${this.state.exp * 100 / 300}%`,
                                                backgroundColor: `#${this.state.themeColor}`
                                            }}
                                            aria-valuenow={this.state.exp}
                                            aria-valuemin="0"
                                            aria-valuemax="300"
                                        >
                                            <small>{this.state.exp}/300</small>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                        </div>
                    <div className="row mt-1">
                        <div className="col">
                            <p className="">{this.state.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
        )
    }
}
