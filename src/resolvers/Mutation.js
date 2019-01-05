const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO check if they are logged
    const item = await ctx.db.mutation.createItem({ data: { ...args } }, info);

    console.log(item);

    return item;
  },

  updateItem(parent, args, ctx, info) {
    // take a copy of the updated item
    const updates = { ...args };
    // delete the item ID from the copy (not from the original arguments)
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: { id: args.id }
      },
      info
    );
  }
};

module.exports = Mutations;
