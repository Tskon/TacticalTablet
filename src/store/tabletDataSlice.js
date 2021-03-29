import {createSlice} from '@reduxjs/toolkit'

const tabletDataSlice = createSlice({
  name: 'tabletData',

  initialState: {
    icons: {},
    userPointer: {
      x: 0,
      y: 0,
    }
  },

  reducers: {
    setPointerCoords: (state, {payload: {x, y}}) => {
      state.userPointer = {x, y}
    },

    setIconData: (state, {payload}) => {
      state.icons[payload.id] = payload
    }
  }
})

export const {setPointerCoords, setIconData} = tabletDataSlice.actions

export default tabletDataSlice.reducer
