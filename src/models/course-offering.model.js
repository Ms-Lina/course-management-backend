const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const CourseOffering = sequelize.define('CourseOffering', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    moduleName: { type: DataTypes.STRING, allowNull: false },
    className: { type: DataTypes.STRING, allowNull: false },
    trimester: { type: DataTypes.INTEGER, allowNull: false },
    cohort: { type: DataTypes.STRING, allowNull: false },
    intakePeriod: { type: DataTypes.ENUM('HT1', 'HT2', 'FT'), allowNull: false },
    mode: { type: DataTypes.ENUM('Online', 'In-person', 'Hybrid'), allowNull: false },
});

module.exports = CourseOffering;
