import axios from "axios"
import { error, success } from "./ResponseHandler"

const { VUE_APP_NEWS_API_URL, VUE_APP_API_KEY } = process.env
const TOP_HEADLINES_URL = VUE_APP_NEWS_API_URL + "top-headlines?country=us&apiKey=" + VUE_APP_API_KEY
const NEWS_SOURCES_URL = VUE_APP_NEWS_API_URL + "sources?apiKey=" + VUE_APP_API_KEY
const SEARCHED_TOP_HEADLINES_URL = VUE_APP_NEWS_API_URL + "top-headlines?q=SEARCH_TEXT&apiKey=" + VUE_APP_API_KEY

class NewsService {
    async getTopHeadlines() {
        try {
            const response = await axios.get(TOP_HEADLINES_URL)
            return success(response)
        } catch (e) {
            return error(e)
        }
    }

    async getNewsSources() {
        try {
            const response = await axios.get(NEWS_SOURCES_URL)
            return success(response)
        } catch (e) {
            return error(e)
        }
    }

    async getSearchedTopHeadlines(searchText) {
        try {            
            const url = SEARCHED_TOP_HEADLINES_URL.replace("SEARCH_TEXT", searchText || null)
            const response = await axios.get(url)

            return success(response)
        } catch (e) {
            return error(e)
        }
    }
}

export default new NewsService()