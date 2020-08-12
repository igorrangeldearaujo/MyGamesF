import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Games extends Component {
    constructor(props){
        super(props)
        this.handleNewGame = this.handleNewGame.bind(this)
        this.state = {
            redirect: false
        }
    }
    handleNewGame(){
        const game = {
            game: this.refs.game.value,
            categoria: this.refs.categoria.value
        } 
        this.props.createGame(game)
            .then((res)=> this.setState({ redirect: '/games/categoria/'+game.categoria }))
    }
    render(){
        const { categorias } = this.props
        if(this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }
        return (<div>
                    <h2>Novo Game</h2>
                    <select ref='categoria'>
                        {categorias
                            .map((c) => <option key={c.id} value={c.id}>{c.categoria}</option>)
                        }
                    </select>
                    <input 
                        placeholder='Nome do novo game'
                        className='form-control'
                        ref='game'/>  
                    <button onClick={this.handleNewGame}>Salvar</button> 
               </div>)
    }
}

export default Games