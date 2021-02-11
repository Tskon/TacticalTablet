import api from '~/common/js/api'

export default async () => {
  const apiResponse = await api.post('/tablet')
  return apiResponse.data
}