
import Link from "next/link"
import styles from './index.module.css'
import Pokemon from "@components/Pokemon";
import useSWR from "swr"
const arr = []
for (let i = 0; i < 4; i++) {
    arr.push(Math.floor(Math.random() * 898) + 1)
}

export default function Home({ session }) {


    const { data: pokemon1, error1 } = useSWR(`/api/pokemon/${arr[0]}`)
    const { data: pokemon2, error2 } = useSWR(`/api/pokemon/${arr[1]}`)
    const { data: pokemon3, error3 } = useSWR(`/api/pokemon/${arr[2]}`)
    const { data: pokemon4, error4 } = useSWR(`/api/pokemon/${arr[3]}`)

    const pokemons = [pokemon1, pokemon2, pokemon3, pokemon4]

    if (error1 || error2 || error3 || error4) return <div>Pokemon not found</div>
    if (!pokemon1 || !pokemon2 || !pokemon3 || !pokemon4) { return <div>Loading..</div> } else {

        return (
            <div className={styles.container}>
                {pokemons.map(poke => {
                    return (
                        <Pokemon key={poke.id} name={poke.name.english} className={styles.poke} session={session} />)
                })}
            </div>
        )
    }
}