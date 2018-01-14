import model from '../models';

const { Downvotes, Upvotes } = model;
/**
 * @class Downvote
 */
class Downvote {
  /**
   * @description Downvote a recipe
   * @param {object} req HTTP request object
   * @param {object} res   HTTP response object
   * @returns  {JSON} Returns a JSON object
   */
  static async downvoteRecipe(req, res) {
    const id = req.params.recipeId;
    const upvotedRecipe = await Upvotes.find({
      where: {
        recipeId: id,
        userId: req.decoded.id
      }
    });

    if (upvotedRecipe) {
      await upvotedRecipe.destroy();
    }

    const downvote = await Downvotes.find({
      where: {
        recipeId: id,
        userId: req.decoded.id
      }
    });

    if (downvote) {
      await downvote.destroy();
      return res.status(200).send({
        message: 'Recipe downvote successfully removed'
      });
    }
    const newDownvote = await Downvotes.create({
      recipeId: id,
      userId: req.decoded.id
    });
    return res.status(200).send({
      message: 'Recipe successfully downvoted',
      data: newDownvote
    });
  }
}
export default Downvote;
