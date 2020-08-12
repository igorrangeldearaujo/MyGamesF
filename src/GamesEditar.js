import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class GamesEditar extends Component{
    constructor(props){
        super(props)
        this.handleEditGame = this.handleEditGame.bind(this)
        this.state = {
            redirect: ''
        }
    }
    componentDidMount(){
        this.props.readGame(this.props.match.params.id)
            .then(res => {
                this.refs.game.value = res.data.game
                this.refs.categoria.value = res.data.categoria    
            })
    }
    handleEditGame(){
        const game = {
            id: this.props.match.params.id,
            game: this.refs.game.value,
            categoria: this.refs.categoria.value
        } 
        this.props.editGame(game)
            .then((res)=> this.setState({ redirect: '/games/categoria/'+game.categoria }))
    }
    render(){
        const { categorias } = this.props
        if(this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }
        return (<div>
            <h2>Editar Game</h2>
            <select ref='categoria'>
                {categorias
                    .map((c) => <option key={c.id} value={c.id}>{c.categoria}</option>)
                }
            </select>
            <input 
                placeholder='Nome do game'
                className='form-control'
                ref='game'
               
                />  
            <button onClick={this.handleEditGame}>Salvar</button> 
       </div>)
    }
}

export default GamesEditar