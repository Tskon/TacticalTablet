import api from '~/common/js/api'

export default async () => {
  const {data} = await api.post('/tablet')
  return data
}