import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Categoria extends Component{
    constructor(props){
        super(props)
        this.loadData = this.loadData.bind(this)
        this.state = {
            games: [],
            categoria: {},
            id: null
        }
        this.renderGame = this.renderGame.bind(this)
    }
    loadData(id){
        this.setState({ id })
        this.props.loadGames(id)//ok 
        this.props.loadCategoria(id)
    }
    componentDidMount(){
        const id = this.props.match.params.catId
        this.loadData(id)
    }
    componentWillReceiveProps(newProps){
        if(newProps.match.params.catId !== this.state.id){
            this.loadData(newProps.match.params.catId)
        }
    }
    renderGame(game){
        return (
            <p className='well' key={game.id}>
            {game.game}
            <button onClick={() => { 
                this.props.removeGame(game)
                .then(res=> this.loadData(this.props.match.params.catId))
            }} >Excluir</button>
            <Link to={'/games/editar/'+game.id}>Editar</Link>
            </p>
        )

    }
    render(){
        return( 
            <div>
                <h1>{this.props.categoria.categoria}</h1>
                {this.props.games.length === 0 && 
                    <p className='alert alert-danger'>Nenhum produto.</p>
                }
                {this.props.games.map(this.renderGame)}
            </div>
        )   
    }
}

export default Categoria
