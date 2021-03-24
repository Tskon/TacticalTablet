import {createSlice} from '@reduxjs/toolkit';

const createIconSlice = createSlice({
  name: 'createIcon',

  initialState: {
    icon: null,
    iconIndex: null,
    color: '0x009900',
    size: 50,
    addMode: false,
  },

  reducers: {
    setIcon: (state, {payload}) => {
      state.icon = payload.icon
      state.iconIndex = payload.iconIndex
    },

    setColor: (state, {payload}) => {
      state.color = payload.replace('#', '0x')
    },

    setSize: (state, {payload}) => {
      state.size = payload
    },

    setAddMode: (state, {payload}) => {
      state.addMode = payload
    }
  }
})

export const {setIcon, setColor, setSize, setAddMode} = createIconSlice.actions

export default createIconSlice.reducer
