import User from './Models/user';

exports.handler = async (event, context, callback) => {
  const id = event.pathParameters.id ?? null;

  const result = await getUser(id);

  context.succeed(result);
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
    if (user) {
      return {
        statusCode: 200,
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'not found' }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.name }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
}
