import {createSlice} from '@reduxjs/toolkit'

const tabletDataSlice = createSlice({
  name: 'tabletData',

  initialState: {
    pointer: {}
  },

  reducers: {
    setPointerCoords: (state, {payload: {x, y}}) => {
      state.pointer = {x, y}
    },
  }
})

export const {setPointerCoords} = tabletDataSlice.actions

export default tabletDataSlice.reducer
