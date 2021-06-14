import {createSlice} from '@reduxjs/toolkit'
import jsCookie from 'js-cookie'

const tabletDataSlice = createSlice({
  name: 'tabletList',

  initialState: {
    list: []
  },

  reducers: {
    fetchListFromCookie: (state) => {
      const tabletsCookie = jsCookie.get('tablets')
      if (tabletsCookie) {
        state.list = JSON.parse(tabletsCookie)
      }
    },
  }
})

export const {fetchListFromCookie} = tabletDataSlice.actions

export default tabletDataSlice.reducer
