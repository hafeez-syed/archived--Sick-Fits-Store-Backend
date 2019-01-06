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
  },

  async deleteItem(parent, args, ctx, info) {
    // where clause is needed to pass for GraphQL queries
    const where = { id: args.id };
    // find the item
    const item = await ctx.db.query.item({ where }, `{id title}`);
    // TODO: check permissions
    // Delete item
    return ctx.db.mutation.deleteItem({ where }, info);
  }
};

module.exports = Mutations;
