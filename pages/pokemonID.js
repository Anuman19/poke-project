import { useRedirectToHome, useRedirectToLogin } from "@lib/session"
import { useRouter } from "next/router"
import useSWR from "swr"
import Pokemon from "../components/Pokemon"
import styles from "./pokemon.module.css"

export default function PokemonIDPage({ session }) {
    useRedirectToLogin(session)
    const router = useRouter()
    const { id } = router.query
    const { data: pokemon, error } = useSWR(`/api/pokemon/${id}`)
    if (error) return (<h2>Oh no error </h2>)
    if (!pokemon) return (<h2>Getting there...</h2>)

    return session.user ? (
        <div>
            <Pokemon name={pokemon.name.english} session={session} />
        </div>
    ) : null
}
