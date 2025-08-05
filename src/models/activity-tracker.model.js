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

    // --- ADD THIS NEW COLUMN FOR FILE UPLOADS ---
    filePath: {
        type: DataTypes.STRING, // It will store the path to the file as a string
        allowNull: true       // A log submission does not require a file, so it can be empty (null)
    }
    // --- END OF NEW COLUMN ---
});

module.exports = ActivityTracker;