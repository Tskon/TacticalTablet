import {v4 as uuid} from 'uuid'
import Tablet from '../dbModels/Tablet.js'

export default {
  async create(req, res) {
    const [editId, viewId] = [`edit-${uuid()}`, `view-${uuid()}`]

    await Tablet.create({editId, viewId})

    res.send({status: 'ok', editId, viewId})
  },
}