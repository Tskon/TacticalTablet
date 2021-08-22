import api from '~/services/api'

export default async (slug = '') => {
  const {data} = await api.get(`/tablet?id=${slug}`)
  return data
}
