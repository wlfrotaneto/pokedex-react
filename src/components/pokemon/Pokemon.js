import React, { Component } from 'react';
import axios from 'axios';

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
            
            // <div className="row">
            //     <div className="card">
            //         <div className="card-body">
            //             <div className="col align-items-center">
            //                 <div>
            //                     <img src={this.state.imgUrl} className="card-img-top rounded mt-2 mx-auto" alt=""/>
            //                 </div>
            //                 <div className="align-center">
            //                     <h4 className="text-capitalize mx-auto" style={{textAlign: "center"}}>
            //                         {this.state.name}
            //                     </h4>
            //                 </div>
            //                 <div className="col justify-content-center">
            //                     {this.state.types.map(type => (
            //                         <span 
            //                             key={type} 
            //                             className="badge badge-light badge-pill text-capitalize mr-1"
            //                             style={{
            //                                 color: `#${TYPE_COLORS[type]}`
            //                             }}
            //                         > 
            //                             {type}
            //                         </span>
            //                     ))}
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>

            <div className="col">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-5">
                                <h5>{this.state.pokemonIndex}</h5>
                            </div>
                            <div className="col-7">
                                <div className="float-right">
                                    {this.state.types.map(type => (
                                        <span
                                        key={type}
                                        className="badge badge-pill mr-1 text-capitalize"
                                        style={{
                                            backgroundColor: `#${TYPE_COLORS[type]}`,
                                            color: 'white'
                                        }}
                                        >
                                        {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className=" col-md-3 ">
                                <img
                                src={this.state.imgUrl}
                                className="card-img-top rounded mx-auto mt-2"
                                />
                            </div>
                            <div className="col-md-9">
                                <h4 className="mx-auto">
                                    {this.state.name
                                        .toLowerCase()
                                        .split(' ')
                                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                        .join(' ')}
                                </h4>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
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
                                                <small>{this.state.stats.hp}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
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
                                                <small>{this.state.stats.atk}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
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
                                                <small>{this.state.stats.def}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
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
                                            <small>{this.state.stats.spd}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                                        EXP
                                    </div>
                                <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                                    <div className="progress">
                                        <div
                                            className="progress-bar bg-success"
                                            role="progressbar"
                                            style={{
                                                width: `${this.state.exp}%`,
                                                backgroundColor: `#${this.state.themeColor}`
                                            }}
                                            aria-valuenow={this.state.exp}
                                            aria-valuemin="0"
                                            aria-valuemax="240"
                                        >
                                            <small>{this.state.exp}</small>
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
