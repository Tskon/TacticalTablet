import {createSlice} from '@reduxjs/toolkit'
import jsCookie from 'js-cookie'

const tabletDataSlice = createSlice({
  name: 'tabletList',

  initialState: {
    list: null
  },

  reducers: {
    fetchListFromCookie: (state) => {
      const tabletsCookie = jsCookie.get('tablets')
      state.list = tabletsCookie ? JSON.parse(tabletsCookie) : []
    },
  }
})

export const {fetchListFromCookie} = tabletDataSlice.actions

export default tabletDataSlice.reducer
