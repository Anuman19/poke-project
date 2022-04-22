import { register, login } from "../lib/api"
import { useRedirectToHome } from "../lib/session"
import { useRouter } from "next/router"
import { useState } from "react"
import styles from "./login.module.css"

const defaultModel = {
    email: "",
    password: ""/* ,
    name: "" */
}

function validateModel(model) {
    const errors = {
        email: "",
        password: ""/* ,
        name: "" */
    }
    let isValid = true

    if (model.email.trim().length === 0 || !model.email.includes("@")) {
        errors.email = "Email can't be empty and must be valid email"
        isValid = false;
    }

    if (model.password.trim().length === 0 || model.password.length < 8) {
        errors.password = "Password can't be empty and must be at least 8 characters long"
        isValid = false;
    }

    /*    if (model.name.trim().length === 0) {
           errors.name = "Name cannot be empty"
           isValid = false
       } */

    return { errors, isValid }
}

export default function RegisterPage({ session }) {
    useRedirectToHome(session)

    const router = useRouter()
    const [errors, setErrors] = useState(defaultModel)
    const [isLoading, setIsLoading] = useState(false)
    const [model, setModel] = useState(defaultModel)

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value?.trim()

        setModel({
            ...model,
            [name]: value
        })

        console.log(model)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors(defaultModel)

        const result = validateModel(model)

        if (!result.isValid) {
            setErrors(result.errors)
            setIsLoading(false)
            return
        }

        try {
            const resp = await register(model)
            session.register(resp)
        } catch (e) {
            setErrors({
                ...errors,
                login: "Registration failed"
            })
            setIsLoading(false)
        }

        try {
            const resp = await login(model)
            session.login(resp)
            router.push("/")
        } catch (e) {
            setErrors({
                ...errors,
                login: "Login failed"
            })
            setIsLoading(false)
        }
    }

    return session.user ? null : (
        <div className={styles.login}>
            <h1>Register</h1>

            {errors.register && <h2 className={styles.error}>{errors.register}</h2>}

            <form onSubmit={handleSubmit} className={styles.loginform}>
                {/*   <fieldset>
                    <label>Name:</label>
                    <input type="text" name="name" onChange={handleChange} value={model.name} autoComplete="name" required />
                </fieldset> */}
                <fieldset>
                    <label>Email:</label>
                    <input type="text" name="email" onChange={handleChange} value={model.email} autoComplete="email" required />
                    {errors.email && <div className={styles.error}>{errors.email}</div>}
                </fieldset>

                <fieldset>
                    <label>Password:</label>
                    <input type="password" name="password" onChange={handleChange} value={model.password} autoComplete="current-password" required />
                    {errors.password && <div className={styles.error}>{errors.password}</div>}
                </fieldset>

                <fieldset>
                    <button disabled={isLoading} type="submit">
                        {isLoading ? "Loading..." : "Sign Up"}
                    </button>
                </fieldset>
            </form>
        </div>
    )
}
