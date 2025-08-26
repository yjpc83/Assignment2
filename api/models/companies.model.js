module.exports = (sequelize, Sequelize) => {
    // This model is connected to Sequelize
    const Company = sequelize.define("companies", {
        company_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        company_name: {
            type: Sequelize.STRING
        },
        company_address: {
            type: Sequelize.STRING
        },
        contact_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'contacts',
                key: 'id',
            }
        }
    });

    return Company;
}