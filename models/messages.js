module.exports = function (sequelize, DataTypes) {
    var Messages = sequelize.define("Messages", {
      contact_name: {
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
    return Messages;
  };