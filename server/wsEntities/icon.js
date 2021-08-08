import debounce from 'lodash/debounce.js'
import Tablet from '../dbModels/Tablet.js'

async function createIcon(payload, id) {
  await Tablet.updateOne(
    {viewId: id},
    {$addToSet: {icons: [payload]}},
    {arrayFilters: [ {'elem.id': payload.id} ]}
  )
}

async function updateIcon(payload, id) {
  const updateOptions = {}
  Object.keys(payload).forEach(key => {
    if (key === 'id') return
    updateOptions[`icons.$.${key}`] = payload[key]
  })
  await Tablet.updateOne({viewId: id, 'icons.id': payload.id}, {$set: updateOptions})
}
const debouncedUpdateIcon = debounce(updateIcon, 300)

export const iconHandler = ({type, payload}, id) => {
  switch (type) {
  case 'create':
    createIcon(payload, id)
    break
  case 'update':
    debouncedUpdateIcon(payload, id)
    break
  }
}
