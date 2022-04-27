import { createPokemon } from "@lib/api"
import { useRouter } from "next/router"
import { useEffect, useState, useCallback } from "react"
import { updatePokemon } from "@lib/api"
import Pokemon from "./Pokemon"
import ImageUpload from "./ImageUpload"

const defaultModel = {
    name: {
        english: "Pikachu",
        german: ""
    },
    type: [
        "Type 1",
        ""
    ],
    base: {
        "HP": 0,
        "Attack": 0,
        "Defense": 0,
        "Sp. Attack": 0,
        "Sp. Defense": 0,
        "Speed": 0
    },
    species: "",
    description: "",
    evolution: {},
    profile: {
        "height": "",
        "weight": "",
        "egg": [],
        "ability": [
            []
        ],
        "gender": ""
    },
    hires: "https://raw.githubusercontent.com/Purukitto/pokemon-data.json/master/images/pokedex/hires/025.png"
}

function validateModel(pokemon) {
    const errors = {
        name: {
            english: "",
            german: ""
        },
        type: [
            "",
            ""
        ],
        base: {
            "HP": "",
            "Attack": "",
            "Defense": "",
            "Sp. Attack": "",
            "Sp. Defense": "",
            "Speed": ""
        },
        species: "",
        description: "",
        evolution: {},
        profile: {
            "height": "",
            "weight": "",
            "egg": [],
            "ability": [],
            "gender": ""
        },
        hires: ""
    }

    let isValid = true

    if (pokemon.name === null) {
        errors.name = "Can't be empty"
        isValid = false
    }

    return { errors, isValid }
}

export default function PokemonForm({ session, pokemonEdit }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState(defaultModel)
    const [pokemon, setPokemon] = useState(defaultModel)

    useEffect(() => {
        if (pokemonEdit) {
            setPokemon(pokemonEdit)
        }
    }, [pokemonEdit])

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        if (name.includes(".")) {
            const parts = name.split(".")
            const newPokemon = { ...pokemon }
            if (name.includes("type")) {
                newPokemon.type[parts[1]] = value
            }
            else if (name.includes("Sp")) {
                const part1 = parts.shift()
                const part2 = parts.join('.')
                newPokemon[part1][part2] = value
            }
            else {
                newPokemon[parts[0]][parts[1]] = value
            }
            setPokemon(newPokemon)
        } else {
            setPokemon({
                ...pokemon,
                [name]: value
            })
        }
    }

    const handleChangeAbilityAndEgg = (e) => {
        const name = e.target.name
        const value = e.target.value
        const newPokemon = { ...pokemon }
        const parts = name.split(".")

        const newArray = value.split(",")
        newPokemon[parts[0]][parts[1]][0] = newArray
        setPokemon(
            newPokemon
        )
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors(defaultModel)

        const result = validateModel(pokemon)

        if (!result.isValid) {
            setErrors(result.errors)
            setIsLoading(false)
            return
        }

        if (!pokemon.id) {
            const newPokemon = await createPokemon(pokemon, session.accessToken)
            alert("Pokemon created!")
            router.push(`/pokemonID?id=${newPokemon.id}`)
        } else {
            pokemon.updatedAt = new Date().toISOString()
            await updatePokemon(pokemon, session.accessToken)
            alert("Pokemon upgraded!")
            router.push(`/pokemonID?id=${pokemon.id}`)
        }

        setIsLoading(false)
    }

    return (
        <div>
            <div>
                <ImageUpload hires={pokemon.hires} handleImage={image => {
                    setPokemon({
                        ...pokemon,
                        hires: image
                    })
                }} />
            </div>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label>Name (english): </label>
                    <input type="text" name="name.english" onChange={handleChange} value={pokemon.name.english} />
                </fieldset>

                <fieldset>
                    <label>Name (german): </label>
                    <input type="text" name="name.german" onChange={handleChange} value={pokemon.name.german} />
                </fieldset>

                <fieldset>
                    <label>Types: </label>
                    <input type="text" name="type.0" onChange={handleChange} value={pokemon.type[0]} />
                    <input type="text" name="type.1" onChange={handleChange} value={pokemon.type[1]} />
                </fieldset>

                <fieldset><h3>Base Stats <br /></h3>
                    <label>HP: </label>
                    <input type="number" name="base.HP" onChange={handleChange} value={pokemon.base.HP} />
                    <label>Attack: </label>
                    <input type="number" name="base.Attack" onChange={handleChange} value={pokemon.base.Attack} />
                    <label>Defense: </label>
                    <input type="number" name="base.Defense" onChange={handleChange} value={pokemon.base.Defense} />
                    <label>Sp. Attack: </label>
                    <input type="number" name="base.Sp. Attack" onChange={handleChange} value={pokemon.base["Sp. Attack"]} />
                    <label>Sp. Defense: </label>
                    <input type="number" name="base.Sp. Defense" onChange={handleChange} value={pokemon.base["Sp. Defense"]} />
                    <label>Speed: </label>
                    <input type="number" name="base.Speed" onChange={handleChange} value={pokemon.base.Speed} />
                </fieldset>

                <fieldset>
                    <label>Species: </label>
                    <input type="text" name="species" onChange={handleChange} value={pokemon.species} />
                </fieldset>
                <fieldset>
                    <label>Description: </label>
                    <input type="text" name="description" onChange={handleChange} value={pokemon.description} />
                </fieldset>

                <fieldset><h3>Profile<br /></h3>
                    <label>Height: </label>
                    <input type="text" name="profile.height" onChange={handleChange} value={pokemon.profile.height} />
                    <label>Weight: </label>
                    <input type="text" name="profile.weight" onChange={handleChange} value={pokemon.profile.weight} />
                    <label>Eggs (seperate by comma): </label>
                    <input type="text" name="profile.egg" onChange={handleChangeAbilityAndEgg} value={pokemon.profile.egg[0]} />
                    <label>Abilities (seperate by comma): </label>
                    <input type="text" name="profile.ability" onChange={handleChangeAbilityAndEgg} value={pokemon.profile.ability[0]} />
                    <label>Gender: </label>
                    <input type="text" name="profile.gender" onChange={handleChange} value={pokemon.profile.gender} />
                </fieldset>

                <button disabled={isLoading}>
                    {isLoading ? "...Loading" : "Submit"}
                </button>
            </form>
        </div>
    )
}