const { Tags } = require("../../models"); // Ensure correct import

exports.createTags = async (tagNames, transaction) => {
  try {
    const tagIds = await Promise.all(
      tagNames.map(async (tagName) => {
        const [tag] = await Tags.findOrCreate({
          where: { tag: tagName },
          defaults: { tag: tagName },
          transaction,
        });

        return tag.id;
      })
    );

    return tagIds;
  } catch (error) {
    console.error("Error creating tags:", error);
    throw error;
  }
};
