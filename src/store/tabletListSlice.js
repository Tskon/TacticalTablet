import {createSlice} from '@reduxjs/toolkit'

const tabletDataSlice = createSlice({
  name: 'tabletList',

  initialState: {
    editList: [],
    viewList: [],
  },

  reducers: {
    setList: (state, {payload}) => {
      if (!payload) return
      state.editList = payload.editList || []
      state.viewList = payload.viewList || []
    }
  }
})

export const {setList} = tabletDataSlice.actions

export default tabletDataSlice.reducer
