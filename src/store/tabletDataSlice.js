import {createSlice} from '@reduxjs/toolkit'
import socket from '~/services/ws'

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
      socket.sendString({
        pointer: {x, y}
      })
    },

    setIconData: (state, {payload}) => {
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
