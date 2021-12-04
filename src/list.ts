import User from './Models/user';

exports.handler = async (event, context, callback) => {
  const queryParameters = event.queryStringParameters;

  const result = await listUsers(queryParameters);

  context.succeed(result);
};

/**
 * fetches a list of users from database
 *
 * @param queryParameters all url query parameters
 * @returns a list of users
 * @returns error in case of a database error
 */

async function listUsers(queryParameters: any) {
  try {
    const users = await User.findAll({ where: queryParameters });
    return {
      statusCode: 200,
      body: JSON.stringify(users),
      headers: {
        'Content-Type': 'application/json',
      },
    };
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
