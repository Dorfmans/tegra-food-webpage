import HttpService from "./HttpService";

export default class UserService extends HttpService {
    async login(url) {
        const user = await this.get(url)

        const { data } = user

        const [realData] = data


        localStorage.setItem('id', realData._id)
        localStorage.setItem("name", realData.name)
        localStorage.setItem("email", realData.email)
        localStorage.setItem("password", realData.password)
        localStorage.setItem("cart", realData.cart)


        if (realData.image) {
            localStorage.setItem("image", realData.image)
        }
    }

    async signUp(datas) {
        return this.post('/signup', datas);
    }

    async addToCart(productId, userId) {
        return this.put(`/user?productId=${productId}&userId=${userId}`)
    }

    async userCart(userEmail) {
        const user = await this.get(`/user?email=${userEmail}`)

        const { data } = user

        const [realData] = data

        return realData.cart
    }

    async clearCart(productId, userId) {
        return this.delete(`/user?productId=${productId}&userId=${userId}`)
    }

    loggedIn() {
        return localStorage.getItem('password') !== null;
    }

    userLoggedInfo() {
        return {
            id: localStorage.getItem('id'),
            user: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            image: localStorage.getItem('image'),
            cart: localStorage.getItem('cart')
        }
    }
}