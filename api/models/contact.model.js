module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contacts", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    return Contact;
};