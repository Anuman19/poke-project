import { getAllUsers } from "@lib/userservice"

export default function UsersPage({ users }) {
    return (
        <div>
            {
                users.map(user => <h2 key={user.id}>{user.name}</h2>)
            }
        </div>
    )
}

export async function getServerSideProps() {
    const users = await getAllUsers()
    return {
        props: {
            users
        }
    }
}