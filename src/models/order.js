const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productOrderSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  size: {
    type: String
  }
})

const orderSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  products: [
    {
      type: productOrderSchema,
      required: true
    }
  ],
  isVerified: {
    type: Boolean,
    default: false
  },
  verification: {
    type: String
  }
})

orderSchema.statics.verify = async function (verification) {
  try {
    const order = await this.findOne(
      { verification: verification },
      { isVerified: 1 }
    )
    if (!order) {
      throw new Error('Wrong code.')
    }
    order.isVerified = true
    await order.save()
    return true
  } catch (err) {
    throw err
  }
}

module.exports = mongoose.model('Order', orderSchema)
