const sequelize = require('../config/db.config');
const User = require('./user.model');
const CourseOffering = require('./course-offering.model');
const ActivityTracker = require('./activity-tracker.model');

const db = {};

db.Sequelize = sequelize.Sequelize;
db.sequelize = sequelize;

db.User = User;
db.CourseOffering = CourseOffering;
db.ActivityTracker = ActivityTracker;

// Relationships
db.User.hasMany(db.CourseOffering, { foreignKey: { name: 'facilitatorId', allowNull: false } });
db.CourseOffering.belongsTo(db.User, { as: 'facilitator', foreignKey: 'facilitatorId' });

db.CourseOffering.hasMany(db.ActivityTracker, { foreignKey: { name: 'allocationId', allowNull: false } });
db.ActivityTracker.belongsTo(db.CourseOffering, { as: 'allocation', foreignKey: 'allocationId' });

module.exports = db;