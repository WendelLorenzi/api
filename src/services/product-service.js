const infoToProjection = require('../graphql/mongodb-projection')

module.exports = {
  create: async (product, { userId, models: { User, Product } }, info) => {
    try {
      const createdEvent = await Product.create({
        ...product,
        creator: userId
      })
      return createdEvent
    } catch (err) {
      throw err
    }
  },
  delete: async (id, { userId, models: { Product, Order } }, info) => {
    const product = await Product.findOne({ _id: id, creator: userId })

    if (!product) throw new Error('Produto não encontrado')

    const orders = await Order.find({}, { products: 1 })
    let valid = true
    orders.map(order => {
      order.products.map(product => {
        if (product._id.toString() === id) {
          valid = false
        }
      })
    })
    if (!valid) {
      return false
    } else {
      try {
        await Product.deleteOne({ _id: id, creator: userId })
        return true
      } catch (err) {
        throw err
      }
    }
  },
  get: async ({ models: { Product } }, info) =>
    Product.find({}, infoToProjection(info))
}
