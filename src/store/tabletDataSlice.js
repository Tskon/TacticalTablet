import {createSlice} from '@reduxjs/toolkit'

const tabletDataSlice = createSlice({
  name: 'tabletData',

  initialState: {
    icons: {},
    userPointer: {
      x: 0,
      y: 0,
    }
  }
})

export default tabletDataSlice.reducer
