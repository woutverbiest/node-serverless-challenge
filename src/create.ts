import type { ValidationErrorItem } from 'sequelize/dist/lib/errors';
import User from './Models/user';

exports.handler = async (event, context, callback) => {
  const data = event.body;

  const result = await createUser(data);

  context.succeed(result);
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
    return {
      statusCode: 201,
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error: any) {
    console.log(error);

    if (error.errors) {
      const validationErrors =
        error.errors.map((err: ValidationErrorItem) => err.message) ?? [];

      return {
        statusCode: 400,
        body: JSON.stringify({
          error: error.name,
          validationErrors: validationErrors,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.name,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
}
