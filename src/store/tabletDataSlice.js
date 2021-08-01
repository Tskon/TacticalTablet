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

    setIconData: (state, {payload}) => {
      sendIconData(payload)
      const icon = state.icons[payload.id]
      if (icon) {
        state.icons[payload.id] = {...icon, ...payload}
      } else {
        state.icons[payload.id] = payload
      }
    }
  }
})

export const {setPointerCoords, setIconData} = tabletDataSlice.actions

export default tabletDataSlice.reducer
