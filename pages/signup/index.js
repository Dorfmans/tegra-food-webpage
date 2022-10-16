import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import Button from "../../components/buttons"
import PublicInput from "../../components/publicInput"
import ImageUpload from "../../components/imageUpload"

import { validatePassword, validateEmail, validateConfirmPassword, validateName } from "../../utils/validations"

import UserService from "../../services/UserService"

import loginImage from "../../public/images/loginImage.png"
import user from "../../public/images/user.svg"
import mail from "../../public/images/message.svg"
import key from "../../public/images/password.svg"
import avatar from "../../public/images/avatar.svg"


const userService = new UserService

const Signup = () => {
    const router = useRouter()

    const [uploadedImage, setUploadedImage] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isSubmiting, setIsSubmiting] = useState(false)

    const signUpIsValid = () => {
        return (
            validateName(name)
            && validateEmail(email)
            && validatePassword(password)
            && validateConfirmPassword(password, confirmPassword)
        );
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!signUpIsValid()) {
            return
        }

        setIsSubmiting(true)

        try {

            const signUpReqBody = new FormData()

            signUpReqBody.append("name", name)
            signUpReqBody.append("email", email)
            signUpReqBody.append("password", password)

            if (uploadedImage?.file) {
                signUpReqBody.append("image", uploadedImage.file)
            }

            await userService.signUp(signUpReqBody)
            await userService.login(`/user?email=${email}`)
            router.push('/')

        } catch (e) {
            alert("Algo deu errado, tente novamente")
        }

        setIsSubmiting(false)
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
                    <strong className="bemVindo">Vamos começar!</strong>
                    <p className="façaLogin">Crie uma nova conta</p>
                </div>
                <form onSubmit={onSubmit}>

                    <ImageUpload
                        setImage={setUploadedImage}
                        imagePreview={uploadedImage?.preview || avatar.src}
                        imagePreviewClassName="avatar avatarPreview"
                    />

                    <PublicInput
                        image={user}
                        placeholder="Nome Completo"
                        type="text"
                        inValueChange={e => setName(e.target.value)}
                        value={name}
                        validateMessage="Preencha esse campo"
                        showValidateMessage={name && !validateName(name)}
                    />

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
                        validateMessage="Senha deve ser maior que 8 caracteres"
                        showValidateMessage={password && !validatePassword(password)}
                    />

                    <PublicInput
                        image={key}
                        placeholder="Confirmar a senha"
                        type="password"
                        inValueChange={e => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        validateMessage="As senhas devem ser iguais"
                        showValidateMessage={confirmPassword && !validateConfirmPassword(password, confirmPassword)}
                    />

                    <Button
                        text="Entrar"
                        type="submit"
                        disabled={!signUpIsValid() || isSubmiting}
                    />

                    <div className="lineOuLine">
                        <div></div>
                        ou
                        <div></div>
                    </div>

                </form>

                <div className="publicPageFooter">
                    <p>Já tem uma conta? <Link href="/login">Entrar</Link></p>

                </div>

            </div>
        </section >
    )
}


export default Signup