import http from '@/plugins/axios'

class CommonService {
	ping = async () => {
		console.time('ping test')
		const result = await http.get('/ping')
		console.timeEnd('ping test')
		console.log('ping result', result)
		return null
	}

	get = async (id: string) => {
		console.log(id, 'get')
		const result = await http.get('/ping')
		return result
	}
	// ping(): Promise<any> {
	// 	return http.get('/ping')
	// }

	// get(id: any): Promise<any> {
	//   return http.get(`/tutorials/${id}`);
	// }

	// create(data: any): Promise<any> {
	//   return http.post('/tutorials', data);
	// }

	// update(id: any, data: any): Promise<any> {
	//   return http.put(`/tutorials/${id}`, data);
	// }

	// delete(id: any): Promise<any> {
	//   return http.delete(`/tutorials/${id}`);
	// }

	// deleteAll(): Promise<any> {
	//   return http.delete(`/tutorials`);
	// }

	// findByTitle(title: string): Promise<any> {
	//   return http.get(`/tutorials?title=${title}`);
	// }
}

export default new CommonService()
