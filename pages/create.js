import PokemonForm from "@components/PokemonForm";
import { useRedirectToLogin } from "@lib/session"

export default function PokemonCreatePage({ session }) {
    useRedirectToLogin(session)

    return session.user ? (
        <div>
            <h1 style={{textAlign:"center"}}>Create a new Pokemon</h1>
            <PokemonForm session={session} />
        </div>
    ) : null
}