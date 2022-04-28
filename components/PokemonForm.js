import { createPokemon } from "@lib/api"
import { useRouter } from "next/router"
import { useEffect, useState, useCallback } from "react"
import { updatePokemon } from "@lib/api"
import styles from "./PokemonForm.module.css"
import buttonStyle from "../pages/login.module.css"
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
        <div className={styles.container}>
            <div className={styles.upload}>
                <ImageUpload hires={pokemon.hires} handleImage={image => {
                    setPokemon({
                        ...pokemon,
                        hires: image
                    })
                }} />
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <fieldset>
                    <label><h4>Name (english): </h4></label>
                    <input type="text" name="name.english" onChange={handleChange} value={pokemon.name.english} />
                </fieldset>

                <fieldset>
                    <label><h4>Name (german): </h4></label>
                    <input type="text" name="name.german" onChange={handleChange} value={pokemon.name.german} />
                </fieldset>

                <fieldset className={styles.types}>
                    <label><h4>Types: </h4></label>
                    <input type="text" name="type.0" onChange={handleChange} value={pokemon.type[0]} />
                    <input type="text" name="type.1" onChange={handleChange} value={pokemon.type[1]} />
                </fieldset>

                <fieldset className={styles.baseStats}><h3>Base Stats <br /></h3>
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                            <tr>
                                <th><label>HP: </label></th>
                                <td><input type="number" name="base.HP" onChange={handleChange} value={pokemon.base.HP} /></td>
                                <th><label>Attack: </label></th>
                                <td><input type="number" name="base.Attack" onChange={handleChange} value={pokemon.base.Attack} /></td>
                            </tr>
                            <tr>
                                <th><label>Defense: </label></th>
                                <td><input type="number" name="base.Defense" onChange={handleChange} value={pokemon.base.Defense} /></td>
                                <th> <label>Sp. Attack: </label></th>
                                <td><input type="number" name="base.Sp. Attack" onChange={handleChange} value={pokemon.base["Sp. Attack"]} /></td>
                            </tr>
                            <tr>
                                <th><label>Sp. Defense: </label> </th>
                                <td><input type="number" name="base.Sp. Defense" onChange={handleChange} value={pokemon.base["Sp. Defense"]} /></td>
                                <th><label>Speed: </label></th>
                                <td><input type="number" name="base.Speed" onChange={handleChange} value={pokemon.base.Speed} /></td>
                            </tr>
                        </thead>
                    </table>
                </fieldset>

                <fieldset>
                    <label><h4>Species: </h4></label>
                    <input type="text" name="species" onChange={handleChange} value={pokemon.species} />
                </fieldset>
                <fieldset>
                    <label><h4>Description: </h4></label>
                    <textarea type="text" name="description" wrap="on" rows="5" onChange={handleChange} value={pokemon.description} className={styles.area} />
                </fieldset>

                <fieldset className={styles.profile}><h3>Profile<br /></h3>
                    <table className={styles.profileTable}>
                        <thead className={styles.thead}>
                            <tr>
                                <th><label>Height: </label></th>
                                <td><input type="text" name="profile.height" onChange={handleChange} value={pokemon.profile.height} /></td>
                            </tr>
                            <tr>
                                <th><label>Weight: </label></th>
                                <td><input type="text" name="profile.weight" onChange={handleChange} value={pokemon.profile.weight} /></td>
                            </tr>
                            <tr>
                                <th><label>Eggs (seperate by comma): </label></th>
                                <td><input type="text" name="profile.egg" onChange={handleChangeAbilityAndEgg} value={pokemon.profile.egg[0]} /></td>
                            </tr><tr>
                                <th><label>Abilities (seperate by comma): </label></th>
                                <td><input type="text" name="profile.ability" onChange={handleChangeAbilityAndEgg} value={pokemon.profile.ability[0]} /></td>
                            </tr><tr>
                                <th><label>Gender: </label></th>
                                <td><input type="text" name="profile.gender" onChange={handleChange} value={pokemon.profile.gender} /></td>
                            </tr>
                        </thead>
                    </table>
                </fieldset>

                <button className={buttonStyle.button} disabled={isLoading}>
                    {isLoading ? "...Loading" : "Submit"}
                </button>
            </form>
        </div >
    )
}