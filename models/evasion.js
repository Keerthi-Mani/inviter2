module.exports = function (sequelize, DataTypes) {
  var Evasion = sequelize.define("Evasion", {
    contact_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    contact_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_relation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  }, {
    timestamp: false
  });
  return Evasion;
};