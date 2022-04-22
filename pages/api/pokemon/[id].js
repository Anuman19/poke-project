import fs from "fs"

const pokemon = JSON.parse(fs.readFileSync(`${process.cwd()}/lib/database/db.json`, "utf8"))


export default function handler(req, res) {
    console.log(`${process.cwd()}/lib/database/db.json`)
    const { id } = req.query
    const choosenPokemon = pokemon.find(p => p.id == id)

    if (!choosenPokemon) {
        res.status(404).json({ message: "Pokemon not found" })
    } else {
        res.status(200).json(choosenPokemon)
    }
}
