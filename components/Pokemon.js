import Image from "next/image"
import Link from "next/link"
import useSWR from "swr"
import styles from "./Pokemon.module.css"
import { deletePokemon } from "@lib/api"
import { useRouter } from "next/router"

export default function Pokemon({ name, session }) {
    const { data: pokemon, error } = useSWR(`/api/pokemon?name=${name}`)
    const router = useRouter()

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
                <p>{pokemon.description}</p></div>
            <div className={styles.tables}>
                {pokemon.base ?
                    <table className={styles.ability}>
                        <thead>
                            <tr>
                                <th>HP</th>
                                <td>{pokemon.base.HP}</td>
                            </tr>
                            <tr>
                                <th>Attack</th>
                                <td>{pokemon.base.Attack}</td>
                            </tr>
                            <tr>
                                <th>Defense</th>
                                <td>{pokemon.base.Defense}</td>
                            </tr>
                            <tr>
                                <th>Sp. Attack</th>
                                <td>{pokemon.base["Sp. Attack"]}</td>
                            </tr>
                            <tr>
                                <th>Sp. Defense</th>
                                <td>{pokemon.base["Sp. Defense"]}</td>
                            </tr>
                            <tr>
                                <th>Speed</th>
                                <td>{pokemon.base.Speed}</td>
                            </tr>
                        </thead>
                    </table> : null}

                <table className={styles.stats}>
                    <thead>
                        <tr>
                            <th>Height</th>
                            <td>{pokemon.profile.height}</td>
                        </tr>
                        <tr>
                            <th>Weight</th>
                            <td>{pokemon.profile.weight}</td>
                        </tr>
                        <tr>
                            <th>Gender</th>
                            <td>{pokemon.profile.gender}</td>
                        </tr>

                    </thead>
                    <tbody>





                    </tbody>
                </table>
            </div>
            <div>
                <article>
                    <i>{pokemon.name.english} uses {pokemon.profile.ability[0][0]}!</i>
                </article>
            </div>
            <article className={styles.link}>
                {<>
                    <Link href={{
                        pathname: "/edit",
                        query: { data: pokemon.id }
                    }}><a><h4>Edit Pokemon</h4></a></Link>
                </>}
                <p style={{width: "2em"}}><b>|</b></p>
                <a href="#" onClick={async (e) => {
                    await deletePokemon(pokemon.id, session.accessToken)
                    alert("Pokemon killed!")
                    router.push("/")
                }}><h4>Destroy</h4></a>
            </article>

        </div>
    )
}