import axios from 'axios';

export default class HttpService {
    constructor() {
        this.axios = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL
        });
    }

    post(url, data) {
        return this.axios.post(url, data);
    }

    get(url) {
        return this.axios.get(url);
    }

    put(url, data) {
        return this.axios.put(url, data);
    }

    delete(url) {
        return this.axios.delete(url)
    }

}