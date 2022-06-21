'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SongApi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SongApi.hasMany(models.Favourite,{
        foreignKey: "SongApiId"
      })
    }
  }
  SongApi.init({
    trackName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: "Track name is required"
        },
        notEmpty:{
          msg: "Track name is required"
        }
      }
    },
    rating: DataTypes.INTEGER,
    artistName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: "Rating is required"
        },
        notEmpty:{
          msg: "Rating is required"
        }
      }
    },
    trackUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: "Track url is required"
        },
        notEmpty:{
          msg: "Track url is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'SongApi',
  });
  return SongApi;
};