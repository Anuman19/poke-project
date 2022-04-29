import FilterableList from "@components/filterablelist/FilterableList"
import { useRedirectToHome, useRedirectToLogin } from "@lib/session"
import useSWR from "swr"
import fs from "fs"
import styles from "./pokemon.module.css"

export default function AllPokemonPage({ session, data }) {
    useRedirectToLogin(session)
    //console.log(data.pokemons)
    /* const map = data.pokemons.filter(poke => poke.id < 100) */
    /* const { data: pokemons, error } = useSWR("/api/pokemon")
    if (error) return (<h2>Oh no error</h2>)
    if (!pokemons) return (<h2>Getting there...</h2>) */

    return session.user ? (
        <div className={styles.container}>
            <FilterableList pokemon={data.pokemons} session={session} />
        </div>
    ) : null
}

export async function getStaticProps() {
    const data = JSON.parse(fs.readFileSync(`${process.cwd()}/lib/database/db.json`, "utf8"))
    return {
        props: {
            data
        }
    }
}