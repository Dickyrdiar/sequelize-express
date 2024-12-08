const tags = require("../../models/tags");

exports.createTags = async (tagNames, transaction) => {
  try {
    const tagIds = await Promise.all(
      tagNames.map(async (tagName) => {
        const [tag] = await tags.findOrCreate({
          where: { tag: tagName },
          defaults: { tag: tagName },
          transaction,
        });

        return tag.id;
      })
    );

    return tagIds;
  } catch (error) {
    console.log("Error creating tags:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};