module.exports = (sequelize, DataTypes) => {
    const Link = sequelize.define('Link', {
        label: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isSocial:{//guarda se é um link de redes sociais para poder aparecer na parte superior
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0, //o 0 diz que ele iniciará como sendo um link normal
        },       
    });
    //Associa 
    Link.associate = (models) => {
        Link.belongsTo(models.Account, { foreignKey: "accountId" });//Link pertence a uma conta
    };

    return Link;
};