import Pokemon from "@components/Pokemon"
import styles from "components/filterablelist/ItemList.module.css"

export default function PokeList({ pokemon, session }) {
    return (
        <ul className={styles.itemlist}>
            {
                pokemon.map(poke => {
                    return (
                        <li key={poke.id}>
                            <Pokemon name={poke.name.english} session={session} />
                        </li>
                    )
                })
            }
        </ul>
    )
}