exports.resolver = {
  ProductOrder: {
    product: ({ _id }, _, ctx, info) =>
      ctx.dataloaders.productLoader(info).load(_id.toString())
  },
  Query: {
    orders: (_, args, ctx, info) => ctx.services.OrderService.get(ctx, info)
  },
  Mutation: {
    createOrder: (_, { input }, ctx) =>
      ctx.services.OrderService.create(input, ctx),
    verify: (_, { verification }, ctx) => ctx.models.Order.verify(verification)
  }
}
