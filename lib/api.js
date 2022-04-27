const URL = "http://localhost:3001"

export async function login({ email, password }) {
    const response = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function register({ email, password }) {
    const response = await fetch(`${URL}/signup`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function createPokemon(pokemon, token) {
    const response = await fetch(`${URL}/pokemons`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(pokemon)
    })
    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function deletePokemon(id, token) {
    const response = await fetch(`${URL}/pokemons/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        return Promise.reject(response)
    }
}

export async function updatePokemon(pokemon, token) {
    const response = await fetch(`${URL}/pokemons/${pokemon.id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(pokemon)
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}
/* 
export async function getAllPokemon(){
    const response = await fetch(`${URL}/pokemons`)
    const pokemon = await response.json()
    return pokemon
}
*/
export async function getPokemon(id){
    const response = await fetch(`${URL}/pokemons/${id}`)
    const pokemon = await response.json()
    return pokemon
} 