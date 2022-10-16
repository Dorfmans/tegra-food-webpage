import { useState, useEffect } from 'react'
import useRouter from 'next/router'
import Image from 'next/image'

import Avatar from '../avatar'
import Button from '../buttons'
import PublicInput from '../publicInput'
import Card from '../card'
import Message from '../message'

import menu from '../../public/images/menu.svg'
import notifications from '../../public/images/notifications.svg'
import shopping_cart from '../../public/images/shopping_cart.svg'
import sortAsc from '../../public/images/sort_by_alpha.svg'
import sortDesc from '../../public/images/sort_by_alpha_desc.png'
import sortGrey from '../../public/images/sort_by_alpha_grey.svg'
import filter_alt from '../../public/images/filter_alt.svg'
import logo from '../../public/images/logo.svg'
import close from '../../public/images/close.svg'
import search from '../../public/images/search.svg'

import ProductsService from '../../services/ProductsService'
import UserService from '../../services/UserService'

const productsService = new ProductsService
const userService = new UserService

const Home = () => {

    const router = useRouter

    const [productsList, setProductsList] = useState([]);
    const [page, setPage] = useState(1)
    const [avatar, setAvatar] = useState(null)
    const [currentCategory, setCurrentCategory] = useState('Todos')
    const [order, setOrder] = useState(null)
    const [orderIcon, setOrderIcon] = useState(sortAsc)
    const [category, setCategory] = useState(null)
    const [filter, setFilter] = useState(null)
    const [showPriceFilterComponent, setShowPriceFilterComponent] = useState(false)
    const [showCartMessage, setShowCartMessage] = useState(false)
    const [min, setMin] = useState(null)
    const [max, setMax] = useState(null)



    const getProducts = async () => {
        const { data } = await productsService.loadProducts(null, page, order, category, filter, min, max);
        const loadedProducts = data.map((p) =>
        ({
            id: p._id,
            title: p.title,
            description: p?.description,
            price: p.price,
            image: p?.image,
        }))

        setProductsList(loadedProducts)
    }

    const caps = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const onSetPage = (e) => {
        setPage(e.target.value)
    }

    const goToCart = () => {
        router.push('/cart')
    }

    const onBuy = async (pId, uId) => {
        await userService.addToCart(pId, uId)
        setShowCartMessage(true)

        setTimeout(() => {
            setShowCartMessage(false)
        }, 5000);
    }

    const toogleCategory = () => {
        return document.getElementById('menu').className.includes('menuOpen')
            ? document.getElementById('menu').className = 'dropdownMenu'
            : document.getElementById('menu').className = 'dropdownMenu menuOpen'
    }

    const getOrder = () => {
        if (orderIcon === sortAsc) {
            setOrder('&order=ASC')
            setOrderIcon(sortDesc)
        }
        if (orderIcon === sortDesc) {
            setOrder('&order=DESC')
            setOrderIcon(sortGrey)
        }

        if (orderIcon === sortGrey) {
            setOrder(null)
            setOrderIcon(sortAsc)
        }
    }

    const getCategory = (value) => {
        toogleCategory
        if (value) {
            setCategory(`&category=${value}`)
            setCurrentCategory(caps(value) + 's')
        } else {
            setCategory(null)
            setCurrentCategory('Todos')

        }
    }

    const getFilter = (e) => {
        setFilter(e.target.value)
    }

    const getMinAndMax = (valueMin, valueMax) => {
        setMin(null)
        setMax(null)
        setMin(`&min=${parseFloat(valueMin)}`)
        setMax(`&max=${parseFloat(valueMax)}`)
        setShowPriceFilterComponent(!showPriceFilterComponent)
    }

    useEffect(() => {
        if (typeof window !== undefined) {
            setAvatar(localStorage.getItem('image'))
        }

        setProductsList([])
        getProducts()
    }, [page, order, category, filter, min, max, showCartMessage]);


    return (
        <section className='homeContainer'>
            <div className='header'>
                <div className='dropdown'>
                    <Image src={menu} className='dropdown' onClick={toogleCategory} />
                </div>

                <PublicInput image={search} type='text' inValueChange={(e) => getFilter(e)} value={filter}></PublicInput>

                <div className='headerProfileSide'>
                    <Image src={shopping_cart} className='cartIcon' onClick={goToCart} />

                    <Image src={notifications} className='notification' />

                    <Avatar src={avatar} />
                </div>
            </div>

            <div className="dropdownMenu" id='menu'>
                <Image src={close} className='closeMenu' width={30} height={30} onClick={toogleCategory} />
                <Image src={logo} />

                <div className='dropdownMenuButtons'>
                    <Button type='button' color='outlined' text='Todos' handleClick={() => { getCategory() }} />
                    <Button type='button' color='outlined' text='Salgados' handleClick={() => { getCategory('salgado') }} />
                    <Button type='button' color='outlined' text='Doces' handleClick={() => { getCategory('doce') }} />
                    <Button type='button' color='outlined' text='Hamburguers' handleClick={() => { getCategory('hamburguer') }} />
                    <Button type='button' color='outlined' text='Bebidas' handleClick={() => { getCategory('bebida') }} />
                </div>

            </div>

            <div className='content'>
                <div className='contentTop'>
                    <div className='contentTopText'>
                        <strong className='produtos'>Produtos</strong>

                        <strong className='currentCategory'>{currentCategory}</strong>
                    </div>

                    <div className='contentTopIcons'>
                        <Image src={filter_alt} width={22} height={35} className='filterIcon' onClick={() => setShowPriceFilterComponent(!showPriceFilterComponent)} />

                        {showPriceFilterComponent &&
                            <div id='priceFilter' className='priceFilterContainer'>
                                <span>Filtrar por preço: </span>
                                <Button type='button' text={'< R$20'} handleClick={() => getMinAndMax(0, 20)} />
                                <Button type='button' text={'R$20 - R$40'} handleClick={() => getMinAndMax(20, 40)} />
                                <Button type='button' text={'> 40R$'} handleClick={() => getMinAndMax(40, 1000)} />
                                <Button type='button' text={'Limpar'} handleClick={() => getMinAndMax(0, 1000)} />
                            </div>
                        }

                        <Image src={orderIcon} width={22} height={20} className='sortIcon' onClick={() => getOrder()} />
                    </div>
                </div>

                {productsList &&
                    <div className='cardContainer'>
                        {productsList.map(data => (
                            <Card key={data.id} {...data} text={'Comprar'} onClick={() => onBuy(data.id, userService.userLoggedInfo().id)} />
                        ))}
                    </div>
                }

                {showCartMessage &&
                    <Message message={'Item adicionado ao carrinho'} actionMessage={'Ir para o carrinho'} action={goToCart} />}

                {productsList &&
                    <select value={page} onChange={onSetPage}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                }
            </div>
        </section>
    )
}

export default Home