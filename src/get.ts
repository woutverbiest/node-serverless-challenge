import User from './Models/user';

exports.handler = async (event, context, callback) => {
  const id = event.pathParameters.id ?? null;

  const result = await getUser(id);

  callback(null, JSON.stringify(result));
};

/**
 * returns a user by its row id
 *
 * @param id {number} id of wanted user
 * @returns user
 * @returns error in case of a database error
 */

async function getUser(id: number) {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error: any) {
    return {
      statusCode: 500,
      body: { error: error.name },
    };
  }
}
