import api from '~/services/api'

export default async (payload = {
  title: '',
  aspectRatio: 0
}) => {
  const {data} = await api.post('/tablet', payload)
  return data
}
