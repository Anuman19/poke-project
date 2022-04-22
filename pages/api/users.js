import { getAllUsers } from "@lib/userservice";

export default async function handler(req, res) {
    const users = await getAllUsers()
    res.status(200).send(users)
}