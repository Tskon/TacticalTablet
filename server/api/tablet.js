import {v4 as uuid} from 'uuid'
import Tablet from '../dbModels/Tablet.js'

export default {
  async create(req, res) {
    const tablet = await Tablet.create({
      editId: `edit-${uuid()}`,
      viewId: `view-${uuid()}`,
    })
    res.send({
      status: 'ok',
      editId: tablet._doc.editId,
      viewId: tablet._doc.viewId,
    })
  },
}