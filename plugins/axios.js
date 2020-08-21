export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    baseURL: `http://${process.env.API_URL}/`,
  })

  // Inject to context as $api
  inject('api', api)
}
