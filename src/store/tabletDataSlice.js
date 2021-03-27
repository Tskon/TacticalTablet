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
    }
  }
})

export const {setPointerCoords} = tabletDataSlice.actions

export default tabletDataSlice.reducer
