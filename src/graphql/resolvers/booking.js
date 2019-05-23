exports.resolver = {
  Booking: {
    event: ({ event }, _, ctx, info) =>
      ctx.dataloaders.eventLoader(info).load(event.toString()),

    user: ({ user }, _, ctx, info) =>
      ctx.dataloaders.userLoader(info).load(user.toString())
  },
  Query: {
    bookings: (_, args, ctx, info) =>
      ctx.services.BookingService.get(ctx, info)
  },
  Mutation: {
    bookEvent: async (_, { eventId }, ctx) =>
      ctx.services.BookingService.bookEvent(eventId, ctx),

    cancelBooking: async (_, { bookingId }, ctx, info) =>
      ctx.services.BookingService.cancel(bookingId, ctx, info)
  }
}
