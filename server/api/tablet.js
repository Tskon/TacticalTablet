import { v4 as uuid} from 'uuid'
import Tablet from '../dbModels/Tablet.js'

export default {
  async create(req, res) {
    const tabletData = await Tablet.create({
      editId: `edit-${uuid()}`,
      viewId: `view-${uuid()}`,
    })

    const {editId} = tabletData._doc

    res.send({editId, status: 'ok'})
  },
}