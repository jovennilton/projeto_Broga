module.exports = (sequelize, DataTypes) => {//nessa função que recebe o sequelize e o DataTypes do arquivo models/index.js
    const Account = sequelize.define('Account', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Account;
};