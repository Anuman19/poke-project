import Link from "next/link"
import styles from "../pages/login.module.css"

export default function Footer({ session }) {

    return (
        <footer className={styles.foot} style={{
            textAlign: "center",
            margin: "0em",
            padding: ".5em",
            background: "#e0e0e0",
            borderTop: "1px solid #d1d1d1",
            width: "100%",
            bottom: "0",
            position: "relative"
        }}>
            <h2>Eat. Sleep. Catch!</h2>
            <Link href="/impressum"><a>Impressum</a></Link>
        </footer>
    )
}