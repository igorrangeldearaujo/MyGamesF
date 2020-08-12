import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/' 
})

const apis = {
    readCategoria: (id) => api.get('categorias/'+id),
    loadCategorias: () => api.get('categorias'),  
    deleteCategoria: (id) => api.delete('categorias/'+id),
    createCategoria: (categoria) => api.post('categorias',categoria),
    editCategoria: (categoria) => api.put('categorias/'+categoria.id,categoria),
    readGame: (id) => api.get('games/'+id),
    createGame: (game) => api.post('games',game),//ok
    loadGames: (categoria) => api.get('games?categoria='+categoria),//ok
    deleteGame: (id) => api.delete('games/'+id),
    editGame: (game) => api.put('games/'+game.id,game)
    
}

export default apis