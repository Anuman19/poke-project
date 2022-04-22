import styles from "components/filterablelist/SearchBar.module.css"

export default function Searchbar({ query, pokeCount, onChange }) {
    return (
        <label>
        <input
            className={ styles.searchbar }
            type="search"
            value={query}
            onChange={ (e) => onChange(e.target.value) }
        />
            <h3>Results: {pokeCount}</h3>
        </label>
    )
}