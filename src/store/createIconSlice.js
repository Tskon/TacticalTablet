import {createSlice} from '@reduxjs/toolkit';

const createIconSlice = createSlice({
  name: 'createIcon',

  initialState: {
    icon: null,
    color: '0x009900',
    size: 50,
  },

  reducers: {
    setIcon: (state, {payload}) => {
      state.icon = payload
    },

    setColor: (state, {payload}) => {
      state.color = payload.replace('#', '0x')
    },

    setSize: (state, {payload}) => {
      state.size = payload
    },
  }
})

export const {setIcon, setColor, setSize} = createIconSlice.actions

export default createIconSlice.reducer
