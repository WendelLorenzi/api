exports.resolver = {
  Query: {
    products: (_, args, ctx, info) =>
      ctx.services.ProductService.get(ctx, info)
  },
  Mutation: {
    createProduct: async (_, { produto }, ctx) =>
      ctx.services.ProductService.create(produto, ctx),

    deleteProduct: async (_, { id }, ctx, info) =>
      ctx.services.ProductService.delete(id, ctx, info)
  }
}
