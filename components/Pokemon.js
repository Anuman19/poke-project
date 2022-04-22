import Image from "next/image"
import Link from "next/link"
import useSWR from "swr"
import styles from "./Pokemon.module.css"

export default function Pokemon({ name, session }) {
    const { data: pokemon, error } = useSWR(`/api/pokemon?name=${name}`)

    if (error) return <div>An error occured while loading the pokemon!</div>
    if (!pokemon) return <div>Loading...</div>

    return (
        <div className={styles.container}>
            <h1>{pokemon.name.english}</h1>
            <div className={styles.des}>
                <Link href={`/pokemonID?id=${pokemon.id}`}>
                    <a>
                        <div style={{ width: "100%", minHeight: "100px", position: "relative" }} className={styles.imgContainer}>
                            <Image src={pokemon.hires} layout="fill" objectFit="contain" alt="pokemon" />
                        </div>
                    </a>
                </Link>
                <h5>{pokemon.species}</h5>
                <h4>
                    {
                        pokemon.type.join(" | ")
                    }
                </h4>
                <p>{pokemon.description}</p>

                {pokemon.base ?
                    <table className={styles.stats}>
                        <thead>
                            <tr>
                                <th>HP</th>
                                <th>Attack</th>
                                <th>Defense</th>
                                <th>Sp. Attack</th>
                                <th>Sp. Defense</th>
                                <th>Speed</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{pokemon.base.HP}</td>
                                <td>{pokemon.base.Attack}</td>
                                <td>{pokemon.base.Defense}</td>
                                <td>{pokemon.base["Sp. Attack"]}</td>
                                <td>{pokemon.base["Sp. Defense"]}</td>
                                <td>{pokemon.base.Speed}</td>
                            </tr>
                        </tbody>
                    </table> : null}

                <table className={styles.stats}>
                    <thead>
                        <tr>
                            <th>Height</th>
                            <th>Weight</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{pokemon.profile.height}</td>
                            <td>{pokemon.profile.weight}</td>
                            <td>{pokemon.profile.gender}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <article>
                        <i>{pokemon.name.english} uses {pokemon.profile.ability[0][0]}!</i>
                    </article>
                </div>
            </div>
        </div>
    )
}