import {createSlice} from '@reduxjs/toolkit'

const wsDataSlice = createSlice({
  name: 'tabletData',

  initialState: {
    pointer: null,
  },

  reducers: {
    setAnotherPointerCoords: (state, {payload: {x, y}}) => {
      state.pointer = {x, y}
    },
  }
})

export const {setAnotherPointerCoords} = wsDataSlice.actions

export default wsDataSlice.reducer
