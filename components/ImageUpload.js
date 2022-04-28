import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import styles from "../pages/login.module.css"
import uploadStyles from "./ImageUpload.module.css"


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
})

export default function ImageUpload({ handleImage, hires }) {
    const [base64Image, setBase64Image] = useState("")
    const [imagePath, setImagePath] = useState("")
    useEffect(() => {
        if (hires) {
            setImagePath(hires)
        }
    }, [hires])

    const fileInput = useRef(null)

    const onFileInputChange = async (e) => {
        const file = fileInput.current.files[0]
        if (!file) return
        const base64 = await toBase64(file)
        setBase64Image(base64)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!base64Image) return

        const response = await fetch("/api/upload", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                base64Image
            })
        })

        const data = await response.json()
        setImagePath(data.filePath)
    }


    return (
        <div className={uploadStyles.container}>
            <form onSubmit={handleSubmit}>
                <h3>Upload a new Picture!</h3>
                <input
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    ref={fileInput}
                    onChange={onFileInputChange}
                />
                <button className={styles.button} type="submit">Upload</button>
            </form>

            {/*          <h2>Select a Picture!</h2>
            <p>Location: <br></br><i>\\wsl$\Ubuntu-20.04\root\DEV\Lösungen\public</i></p>
            <input type="file"
                accept=".png,.jpg,.jpeg"
                ref={fileInput}
                onChange={(e) => {
                    const arr = e.target.value.split('\\')
                    console.log(arr[arr.length - 1])
                    setImagePath("/" + arr[arr.length - 1])
                }} /> */}

            {base64Image && <img src={base64Image} style={{ width: "300px", height: "auto" }} />}

            {
                imagePath && <div>
                    <div style={{ width: "100%", minHeight: "100px", position: "relative" }} className={uploadStyles.image}>
                        <Image src={imagePath} layout="fill" objectFit="contain" alt="pokemon" />
                    </div>
                    <button className={styles.button} onClick={() => handleImage(imagePath)} type="submit">Set Picture</button>
                </div>
            }
        </div >
    )
}