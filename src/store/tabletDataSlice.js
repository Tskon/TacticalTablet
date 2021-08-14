import {createSlice} from '@reduxjs/toolkit'
import {webSocket, iconActions} from '~/services/clientWS'

function sendIconData(payload) {
  const type = payload.img ? iconActions.create : iconActions.update
  webSocket.send({
    icon: {
      type,
      payload,
    }
  })
}

const tabletDataSlice = createSlice({
  name: 'tabletData',

  initialState: {
    icons: {},
    userPointer: {
      x: 0,
      y: 0,
    },
  },

  reducers: {
    setPointerCoords: (state, {payload: {x, y}}) => {
      state.userPointer = {x, y}
      webSocket.send({
        pointer: {x, y}
      })
    },

    setIconData: (state, {payload: {data, isGetFromServer}}) => {
      if (!isGetFromServer) sendIconData(data)

      const icon = state.icons[data.id]
      if (icon) {
        state.icons[data.id] = {...icon, ...data}
      } else {
        state.icons[data.id] = data
      }
    }
  }
})

export const {setPointerCoords, setIconData} = tabletDataSlice.actions

export default tabletDataSlice.reducer
