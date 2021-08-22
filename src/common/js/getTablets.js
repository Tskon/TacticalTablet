import api from '~/common/js/api'
import jsCookie from 'js-cookie'

export default async () => {
  const tabletsCookie = jsCookie.get('tablets')
  const tablets = tabletsCookie ? JSON.parse(tabletsCookie) : []
  if (!tablets.length) return
  const {data} = await api.get(`${process.env.API_URL}/tablet-list?ids[]=${tablets.join('&ids[]=')}`)
  return data
}
