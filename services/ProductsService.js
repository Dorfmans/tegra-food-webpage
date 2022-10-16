import HttpService from "./HttpService"

export default class FeedService extends HttpService {
    async loadProducts(productId, page, order, category, filter, min, max) {
        let url = '/products';

        if (productId) {
            url += `/${productId}`;
        }

        if (page) {
            url += `?page=${page}`
        }

        if (order) {
            url += order
        }

        if (category) {
            url += category
        }

        if (filter) {
            url += `&filter=${filter}`
        }

        if (min) {
            url += min
        }
        if (max) {
            url += max
        }

        return this.get(url);
    }

    async editProduct(productId, newInfo) {
        return this.put(`/products/${productId}`, { newInfo })
    }

    async deleteProduct(productId) {
        return this.delete(`/products/${productId}`)
    }

    async addProduct(newProduct) {
        return this.post(`/products`, { newProduct })
    }
}