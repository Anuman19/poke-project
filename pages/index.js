
import Link from "next/link"
import styles from './index.module.css'
import Pokemon from "@components/Pokemon";

export default function Home({session}) {
    return (
        <div className={styles.index}>
            <h1>Gotta Catch em All</h1>
            <section className={styles.container}>
                <Pokemon name="Mewtwo"/>
                <Pokemon name="Mew"/>
                <Pokemon name="Gengar"/>
                <Pokemon name="Zapdos"/>
            </section>
        </div>
    )
}