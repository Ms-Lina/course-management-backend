const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const ActivityTracker = sequelize.define('ActivityTracker', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    weekNumber: { type: DataTypes.INTEGER, allowNull: false },
    attendance: { type: DataTypes.JSON, allowNull: false },
    formativeOneGrading: { type: DataTypes.ENUM('Done', 'Pending', 'Not Started'), defaultValue: 'Not Started' },
    formativeTwoGrading: { type: DataTypes.ENUM('Done', 'Pending', 'Not Started'), defaultValue: 'Not Started' },
    summativeGrading: { type: DataTypes.ENUM('Done', 'Pending', 'Not Started'), defaultValue: 'Not Started' },
    courseModeration: { type: DataTypes.ENUM('Done', 'Pending', 'Not Started'), defaultValue: 'Not Started' },
    intranetSync: { type: DataTypes.ENUM('Done', 'Pending', 'Not Started'), defaultValue: 'Not Started' },
    gradeBookStatus: { type: DataTypes.ENUM('Done', 'Pending', 'Not Started'), defaultValue: 'Not Started' },
});

module.exports = ActivityTracker;