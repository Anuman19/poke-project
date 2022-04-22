import fs from "fs"

const pokemon = JSON.parse(fs.readFileSync(`${process.cwd()}/lib/database/db.json`, "utf8"));

export default function handler(req, res) {
  const { name } = req.query

  console.log(name)

  if(name) {
    const chosenPokemon = pokemon.find(p => p.name.english.toLowerCase() === name.toLowerCase())
    if(chosenPokemon) {
      return res.status(200).json(chosenPokemon)
    } else {
      return res.status(404).json({ message: "not found"})
    }
  }

  res.status(200).json(pokemon)
}
