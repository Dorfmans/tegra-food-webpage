import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import Button from "../../components/buttons"
import PublicInput from "../../components/publicInput"
import GoogleInput from "../../components/googleInput"

import { validatePassword, validateEmail } from "../../utils/validations"

import UserService from "../../services/UserService"

import mail from "../../public/images/message.svg"
import key from "../../public/images/password.svg"
import loginImage from "../../public/images/loginImage.png"
import google from "../../public/images/google.svg"


const userService = new UserService

const Login = () => {
    const router = useRouter()

    const auth = typeof window !== 'undefined' ? localStorage.getItem('email') : null

    useEffect(() => {
        if (auth !== null) {
            router.push('/')
        }
    }, [auth])


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmiting, setIsSubmiting] = useState(false)

    const loginIsValid = () => {
        return (
            validateEmail(email)
            && validatePassword(password)
        )
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!loginIsValid()) {
            return
        }
        localStorage.clear()

        setIsSubmiting(true)

        try {

            await userService.login(`/user?email=${email}`)

        } catch (e) {
            alert("Email e/ou senha invalidos! Caso não tenha se cadastrado, clique em cadastrar")
        }

        setIsSubmiting(false)
        setEmail('')
        setPassword('')
    }



    return (
        <section className={`loginPageContainer`}>

            <div className="logoContainer desktop">

                <Image
                    src={loginImage}
                    alt="Logo"
                    layout="fill"
                    className="logo"
                />

            </div>


            <div className="publicPageContent">

                <div className="welcomeContainer">
                    <strong className="bemVindo">Bem vindo!</strong>
                    <p className="façaLogin">faça o login para continuar</p>
                </div>
                <form onSubmit={onSubmit}>

                    <PublicInput
                        image={mail}
                        placeholder="Seu e-mail"
                        type="email"
                        inValueChange={e => setEmail(e.target.value)}
                        value={email}
                        validateMessage="E-mail invalido"
                        showValidateMessage={email && !validateEmail(email)}
                    />

                    <PublicInput
                        image={key}
                        placeholder="Senha"
                        type="password"
                        inValueChange={e => setPassword(e.target.value)}
                        value={password}
                        validateMessage="Senha deve ter pelo menos 8 caracteres"
                        showValidateMessage={password && !validatePassword(password)}
                    />

                    <Button
                        text="Entrar"
                        type="submit"
                        disabled={!loginIsValid() || isSubmiting}
                    />

                    <div className="lineOuLine">
                        <div></div>
                        ou
                        <div></div>
                    </div>

                    <GoogleInput
                        image={google}
                        placeholder="Entrar com o Google"
                        type="text"
                    />

                </form>

                <div className="publicPageFooter">
                    <p>Não tem uma conta? <Link href="/signup">Cadastrar</Link></p>

                </div>

            </div>
        </section >
    )
}


export default Login