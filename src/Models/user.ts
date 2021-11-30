import { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize('sqlite:src/db.sqlite');

const User = sequelize.define(
  'user',
  {
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      unique: true,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['en', 'fr', 'nl']],
          msg: "Language must be 'nl', 'fr' or 'en'.",
        },
      },
    },
  },
  {
    tableName: 'user',
    createdAt: 'created_at',
    updatedAt: 'modified_at',
  }
);

module.exports = User;
