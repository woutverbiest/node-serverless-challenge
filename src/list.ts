import User from './Models/user';

exports.handler = async (event, context, callback) => {
  const queryParameters = event.queryStringParameters;

  const result = await listUsers(queryParameters);

  callback(null, JSON.stringify(result));
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
    return users;
  } catch (error: any) {
    return {
      statusCode: 500,
      body: { error: error.name },
    };
  }
}
