import Link from "next/link"

export default function Footer({ session }) {

    return (
        <footer style={{ textAlign: "center", margin: "0em", padding: ".5em", background: "#e0e0e0", borderTop: "1px solid #d1d1d1" }}>
            <h2>Eat. Sleep. Catch!</h2>
            <Link href="/impressum"><a>Impressum</a></Link>
        </footer>
    )
}