export default function ProfilePage({ session }) {
    return session.user ? (
        <div style={{ overflow: "hidden" }}>
            <h1>Your current session:</h1>
            <pre>{JSON.stringify(session, null, 4)}</pre>
        </div>
    ) : null
}