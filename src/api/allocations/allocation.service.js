const { CourseOffering, User } = require('../../models');
const { Op } = require('sequelize');

const create = (data) => CourseOffering.create(data);
const findAll = (query) => {
    const where = {};
    if (query.trimester) where.trimester = query.trimester;
    if (query.facilitatorId) where.facilitatorId = query.facilitatorId;
    return CourseOffering.findAll({ where, include: { model: User, as: 'facilitator' } });
};
const findById = (id) => CourseOffering.findByPk(id);
const findByFacilitator = (id) => CourseOffering.findAll({ where: { facilitatorId: id } });
const update = async (id, data) => {
    const item = await CourseOffering.findByPk(id);
    return item ? item.update(data) : null;
};
const remove = async (id) => {
    const item = await CourseOffering.findByPk(id);
    return item ? item.destroy() : null;
};

module.exports = { create, findAll, findById, findByFacilitator, update, remove };