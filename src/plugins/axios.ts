import axios, { AxiosInstance } from 'axios'
import store from '@/store'

const apiClient: AxiosInstance = axios.create({
	// baseURL: 'http://localhost:8080/api',
	baseURL: 'https://9647dfad-a4fc-44cd-a837-3c33863d8b8b.mock.pstmn.io/api',
	headers: {
		'Content-type': 'application/json',
	},
})

apiClient.interceptors.request.use(
	(config) => {
		store.commit('ToggleLoading', true)
		return config
	},
	(error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
	(response) => {
		store.commit('ToggleLoading', false)
		return response
	},
	(error) => {
		store.commit('ToggleLoading', false)
		return Promise.reject(error)
	},
)

export default apiClient
