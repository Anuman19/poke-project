import { useRedirectToLogin } from "@lib/session"

export default function ProfilePage({ session }) {
    useRedirectToLogin(session)
    return session.user ? (
        <div style={{ overflow: "hidden" }}>
            <h1>Your current session:</h1>
            {/* <pre>{JSON.stringify(session, null, 4)}</pre> */}
            <h2>{session.user.email}</h2>
            <p>{session.accessToken}</p>
        </div>
    ) : null
}