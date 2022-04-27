import PokemonForm from "@components/PokemonForm";
import { useRedirectToLogin } from "@lib/session";
import { useRouter } from "next/router"
import useSWR from "swr"

export default function PokemonEditPage({ session }) {
    useRedirectToLogin(session)
    const router = useRouter()
    const {
        query: { data },
    } = router

    const { data: pokemon, error } = useSWR(`/api/pokemon/${router.query.data}`)
    if (!pokemon) return <div>Loading...</div>
    console.log(pokemon)


    return (
        <div>
            <h1>Edit Pokemon</h1>
            <PokemonForm session={session} pokemonEdit={pokemon} />
        </div>
    )
}