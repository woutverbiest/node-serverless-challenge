import type { ValidationErrorItem } from 'sequelize/dist/lib/errors';
import User from './Models/user';

exports.handler = async (event, context, callback) => {
  const data = event.body;

  const result = await createUser(data);

  callback(null, JSON.stringify(result));
};

/**
 * creates a new user
 *
 * @param data body from request
 * @returns user
 * @returns error in case of database error
 * @returns error in case of validation error
 */

async function createUser(data: any) {
  try {
    const user = await User.create(JSON.parse(data));
    return user;
  } catch (error: any) {
    console.log(error);

    if (error.errors) {
      const validationErrors =
        error.errors.map((err: ValidationErrorItem) => err.message) ?? [];

      return {
        statusCode: 400,
        body: {
          error: error.name,
          validationErrors: validationErrors,
        },
      };
    }

    return {
      statusCode: 500,
      body: {
        error: error.name,
      },
    };
  }
}
