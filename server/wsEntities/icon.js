import {iconActions} from '../../src/services/ws.js'

// TODO save icon positions to DB
function createIcon(payload) {
  console.log('create', payload)
}

function updateIcon(payload) {
  console.log('update', payload)
}

export const iconHandler = ({type, payload}) => {
  switch (type) {
  case iconActions.create:
    createIcon(payload)
    break
  case iconActions.update:
    updateIcon(payload)
    break
  }
}
