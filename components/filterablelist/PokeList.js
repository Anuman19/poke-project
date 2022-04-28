import Pokemon from "@components/Pokemon"
import styles from "components/filterablelist/ItemList.module.css"
import indexStyles from "../../pages/index.module.css"

export default function PokeList({ pokemon, session }) {
    return (
        <div className={indexStyles.container}>
            <ul className={styles.itemlist}>
                {
                    pokemon.map(poke => {
                        return (
                            <li key={poke.id}>
                                <Pokemon name={poke.name.english} session={session} className={indexStyles.poke} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}