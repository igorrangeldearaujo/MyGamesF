import React, { Component } from 'react'
import{
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './Home'
import Sobre from './Sobre'
import Games from './Games'

class App extends Component {
  constructor(props){
    super(props)
    this.loadCategorias = this.loadCategorias.bind(this)
    this.createCategoria = this.createCategoria.bind(this)
    this.removeCategoria = this.removeCategoria.bind(this)
    this.editCategoria = this.editCategoria.bind(this)
    
    this.readGame = this.readGame.bind(this)
    this.createGame = this.createGame.bind(this)//ok
    this.loadGames = this.loadGames.bind(this)//ok
    this.loadCategoria = this.loadCategoria.bind(this)
    this.removeGame = this.removeGame.bind(this)
    this.editGame = this.editGame.bind(this)


    this.state = {
      categorias: [],
      categoria: [],
      games: []
    }
  } 
  loadCategorias(){
    // buscar categorias
        this.props.api.loadCategorias()
        .then(res => {
            this.setState({
                categorias: res.data
            })
        })
  }
  removeCategoria(categoria){
    this.props.api.deleteCategoria(categoria.id)
    .then((res) => this.loadCategorias())
  }
  createCategoria(categoria){
    this.props.api.createCategoria(categoria)
      .then((res) => this.loadCategorias())
  }
  editCategoria(categoria){
    this.props.api.editCategoria(categoria)
      .then((res) => this.loadCategorias())
  }
  createGame(game){//ok
    return this.props.api.createGame(game)//ok
  }
  loadGames(categoria){//ok
    this.props.api.loadGames(categoria)//ok
    .then((res) => {
      this.setState({
        games: res.data
      })
    })
  }
  loadCategoria(categoria){
    this.props.api.readCategoria(categoria)
      .then((res)=>{
        this.setState({
          categoria: res.data
        })
      })
  }
  removeGame(game){
    return this.props.api.deleteGame(game.id)
  }
  readGame(id){
    return this.props.api.readGame(id)
  }
  editGame(game){
    return this.props.api.editGame(game)
  }
  render(){
    return (
      <Router>
        <div className="App">
          <nav className='navbar navbar-inverse'>
            <div className='container'>
              <div className='navbar-header'>
                <a href='/' className='navbar-brand'>
                  Gerenciador de Games
                </a>
              </div>
              <ul className='nav navbar-nav'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/games'>Games</Link></li>
                <li><Link to='/sobre'>Sobre</Link></li>
              </ul>
            </div>
          </nav>
          <div className='container'>
            <Route exact path='/' component={Home} />
            <Route exact path='/sobre' component={Sobre} />
            <Route path='/games' render={(props) => {
                return (<Games 
                  {...props} 
                  loadCategorias={this.loadCategorias}
                  createCategoria={this.createCategoria}
                  removeCategoria={this.removeCategoria}
                  editCategoria={this.editCategoria}
                  categorias={this.state.categorias}
                  
                  editGame={this.editGame}
                  readGame={this.readGame}
                  createGame={this.createGame}//ok
                  loadGames={this.loadGames}//ok
                  loadCategoria={this.loadCategoria}
                  games={this.state.games}
                  categoria={this.state.categoria}
                  removeGame={this.removeGame}
                />)
            }
              }/>
          </div>
        </div>
      </Router>
    )


  }
  
}

export default App;
