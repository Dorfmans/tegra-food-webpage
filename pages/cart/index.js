import { useState, useEffect } from 'react'
import useRouter from 'next/router'
import Image from 'next/image'

import UserService from '../../services/UserService'

import Avatar from '../../components/avatar'
import Button from '../../components/buttons'
import Card from '../../components/card'

import home from '../../public/images/home.svg'
import notifications from '../../public/images/notifications.svg'

const userService = new UserService


const Cart = () => {

    const router = useRouter


    const [cartList, setCartList] = useState([])
    const [avatar, setAvatar] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userEmail, setUserEmail] = useState(null)


    const goToHome = () => {
        router.push('/')
    }

    const getUserCart = async () => {
        const cart = await userService.userCart(userEmail)
        const loadedCart = cart.map((data) => (
            {
                id: data._id,
                title: data.title,
                price: data.price,
                description: data.description,
                category: data.category,
                image: data.image
            }
        ))
        setCartList(loadedCart)
    }

    const removeItem = async (pId, uId) => {
        await userService.clearCart(pId, uId)
    }


    useEffect(() => {
        if (typeof window !== undefined) {
            setAvatar(localStorage.getItem('image'))
            setUserId(localStorage.getItem('id'))
            setUserEmail(localStorage.getItem('email'))
        }
        getUserCart()
    }, [cartList, userEmail, userId])

    if (!cartList) {
        return null
    }

    return (
        <section className="homeContainer">
            <div className='header'>

                <div className='headerProfileSide'>
                    <Image src={home} className='homeIcon' onClick={goToHome} />

                    <Image src={notifications} className='notification' />

                    <Avatar src={avatar} />
                </div>
            </div>

            <div className='content'>

                <div className='contentTop'>
                    <div className='contentTopText'>
                        <strong className='carrinho'>Carrinho</strong>
                    </div>
                </div>

                <div className='cardContainer cartCardContainer'>
                    {cartList.map(data => (
                        <Card key={data.id} {...data} text={'Remover'} onClick={() => removeItem(data.id, userId)} />
                    ))}
                </div>
            </div>
        </section >
    )

}

export default Cart