const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  disableSize: {
    type: Boolean,
    default: false
  },
  img: [
    {
      type: String,
      required: true
    }
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

productSchema.statics.byId = async function (id) {
  const product = await this.findOne({ _id: id }, { _id: 1 })
  if (!product) {
    throw new Error('Product not found')
  }
  console.log(product)
  return product
}

module.exports = mongoose.model('Product', productSchema)
