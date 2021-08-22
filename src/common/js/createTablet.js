import api from '~/common/js/api'

export default async (payload = {
  title: '',
  aspectRatio: 0
}) => {
  const {data} = await api.post('/tablet', payload)
  return data
}
