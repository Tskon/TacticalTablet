import {createSlice} from '@reduxjs/toolkit';

const createIconSlice = createSlice({
  name: 'createIcon',

  initialState: {
    icon: null,
    color: '0x009900',
    size: 30,
  },

  reducers: {
    setIcon: (state, {payload}) => {
      state.icon = payload
    },

    setColor: (state, {payload}) => {
      state.color = payload.replace('#', '0x')
    }
  }
})

export const {setIcon, setColor} = createIconSlice.actions

export default createIconSlice.reducer
