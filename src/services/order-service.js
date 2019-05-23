const infoToProjection = require('../graphql/mongodb-projection')
const crypto = require('crypto')

module.exports = {
  create: async (
    order,
    { models: { Order }, services: { EmailService } },
    info
  ) => {
    order.verification = await crypto
      .createHash('md5')
      .update(order.email)
      .digest('hex')
    try {
      await EmailService.sendEmail({
        to: order.email,
        subject: 'Pedido BatCaverna',
        text: `confirmation link: http://localhost:3000/#/confirmation/${
          order.verification
        }`
      })
      await Order.create(order)
      return true
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  get: async ({ models: { Order } }, info) =>
    Order.find({}, infoToProjection(info))
}
