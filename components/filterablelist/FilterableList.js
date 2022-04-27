import { useState } from "react"
import SearchBar from "components/filterablelist/SearchBar"
import styles from "components/filterablelist/FilterableList.module.css"
import PokeList from "components/filterablelist/PokeList"

export default function FilterableList({ pokemon, session }) {
    const [query, setQuery] = useState("")
    const handleChange = (value) => setQuery(value)
    const pokeToRender = query ? pokemon.filter(poke => poke.name.english.toLowerCase().includes(query.toLowerCase())) : pokemon
    return (
        <div className={styles.filterablelist}>
            <SearchBar
                query={query}
                pokeCount={pokeToRender.length}
                onChange={handleChange}
            />
            <PokeList
                pokemon={pokeToRender} session={session}
            />
        </div>
    )
}