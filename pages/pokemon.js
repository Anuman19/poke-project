import FilterableList from "@components/filterablelist/FilterableList"
import { useRedirectToHome, useRedirectToLogin } from "@lib/session"
import useSWR from "swr"
import Pokemon from "../components/Pokemon"
import styles from "./pokemon.module.css"

export default function AllPokemonPage({ session }) {
    useRedirectToLogin(session)
    const { data: pokemons, error } = useSWR("/api/pokemon")
    if (error) return (<h2>Oh no error</h2>)
    if (!pokemons) return (<h2>Getting there...</h2>)

    return session.user ? (
        <div className={styles.container}>
            <FilterableList pokemon={pokemons} />
        </div>
    ) : null
}
//  {pokemons.map(post => <Pokemon key={post.id} name={post.name.english} />)}