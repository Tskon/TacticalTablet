import api from '~/services/api'
import {webSocket} from '~/services/clientWS'

export default async (viewId = '') => {
  await api.post( '/createWs', {tabletId: viewId})
  webSocket.initWebSocket(viewId)
}
