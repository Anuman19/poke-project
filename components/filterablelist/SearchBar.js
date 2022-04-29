import styles from "../PokemonForm.module.css"

export default function Searchbar({ query, pokeCount, onChange }) {
    return (
        <label>
            <h4>Search by Name: </h4>
        <input
            type="search"
            value={query}
            onChange={ (e) => onChange(e.target.value) }
            placeholder="Pikachu"
            className={styles.search}
        />
            <h3>Results: {pokeCount}</h3>
        </label>
        
    )
}