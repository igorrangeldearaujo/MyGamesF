import React, { Component } from 'react'
import { Route, Link} from 'react-router-dom'
import GamesHome from './GamesHome'
import GamesNovo from './GamesNovo' 
import GamesEditar from './GamesEditar'
import Categoria from './categoria'

class Games extends Component{
    constructor(props){ // montar componente na tela
        super(props)

        this.state = {
            editingCategoria: ''
        }

        this.renderCategoria = this.renderCategoria.bind(this)
        this.handleNewCategoria = this.handleNewCategoria.bind(this)
        this.editCategoria = this.editCategoria.bind(this)
        this.cancelEditing = this.cancelEditing.bind(this)
        this.handleEditCategoria = this.handleEditCategoria.bind(this)
    }
    
    componentDidMount(){
        this.props.loadCategorias()
    }

    editCategoria(categoria){
        this.setState({
            editingCategoria: categoria.id
        })
    }

    cancelEditing(){
        this.setState({
            editingCategoria: ''
        }) 
    }
    
    renderCategoria(cat){
        return(
            <li key={cat.id}>
                { this.state.editingCategoria === cat.id && //editingCategoria
                    <div className='input-group'>
                        <div className='input-group-btn'>
                            <input ref={'cat-'+cat.id} onKeyUp={this.handleEditCategoria} className='form-control' type='text' defaultValue={cat.categoria} />
                            <button className='btn' onClick={this.cancelEditing}>cancel</button>
                        </div>
                    </div>
                }
                { this.state.editingCategoria !== cat.id &&//this.props.editCategoria(cat)
                    <div>
                        <button className='btn btn-sm' onClick={()=>this.props.removeCategoria(cat)}>
                            <span className='glyphicon glyphicon-remove'></span>
                        </button>
                        <button className='btn btn-sm' onClick={()=>this.editCategoria(cat)}>
                            <span className='glyphicon glyphicon-pencil'></span>
                        </button>
                        <Link to={`/games/categoria/${cat.id}`}>{cat.categoria}</Link>
                    </div>
                }   
            </li>    
        )
    }
    handleNewCategoria(key){
        if(key.keyCode === 13){
            this.props.createCategoria({
                categoria: this.refs.categoria.value
            })
            this.refs.categoria.value = ''
        }
        
    }
    handleEditCategoria(key){
        if(key.keyCode === 13){
            this.props.editCategoria({
                id: this.state.editingCategoria, 
                categoria: this.refs['cat-'+this.state.editingCategoria].value  
            })
            this.setState({
                editingCategoria: ''
            })
        }       
    }
    render(){
        const { match, categorias } = this.props
        return(
            <div className='row'>
                <div className='col-md-2'>
                    <h3>Categorias</h3>
                    <ul style={{listStyle: 'none', padding: 0}}>
                        {categorias.map(this.renderCategoria)}
                    </ul>
                    <div className='well well-sm'>
                        <input 
                            onKeyUp={this.handleNewCategoria}
                            type='text'
                            className='form-control'
                            ref='categoria'
                            placeholder='Nova Categoria' />
                    </div>
                    <Link to={'/games/novo'}>Novo Game</Link>
                </div>
                <div className='col-md-10'>
                    <h1>Games</h1>
                    <Route exact path={match.url} component={GamesHome} />
                    <Route exact path={match.url+'/novo'}   
                        render={(props) => {
                            return <GamesNovo {...props}
                            categorias={categorias}
                            createGame={this.props.createGame}//ok
                            />
                        }}/>
                    <Route path={match.url+'/editar/:id'}
                        render={(props) => {
                            return <GamesEditar {...props}
                                categorias={categorias}
                                readGame={this.props.readGame}
                                editGame={this.props.editGame}
                            />
                        }}
                    />
                    <Route path={match.url + '/categoria/:catId'} 
                            render={(props)=> {
                                return <Categoria {...props}
                                        loadGames={this.props.loadGames}//ok
                                        loadCategoria={this.props.loadCategoria}
                                        games={this.props.games} 
                                        categoria={this.props.categoria}
                                        removeGame={this.props.removeGame}/>
                            }} />
                            
                </div>
            </div>
        )
    }
}

export default Games