import debounce from 'lodash/debounce.js'

// TODO save icon positions to DB
function createIcon(payload) {
  console.log('create', payload)
}

function updateIcon(payload) {
  console.log('update', payload)
}
const debouncedUpdateIcon = debounce(updateIcon, 300)

export const iconHandler = ({type, payload}) => {
  switch (type) {
  case 'create':
    createIcon(payload)
    break
  case 'update':
    debouncedUpdateIcon(payload)
    break
  }
}
