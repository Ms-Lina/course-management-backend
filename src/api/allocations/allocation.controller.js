// src/api/allocations/allocation.controller.js - VERIFIED

const service = require('./allocation.service');

const createAllocation = async (req, res) => {
    try {
        res.status(201).json(await service.create(req.body));
    } catch (e) { res.status(400).json({ message: e.message }); }
};

const getAllocations = async (req, res) => {
    try {
        res.status(200).json(await service.findAll(req.query));
    } catch (e) { res.status(500).json({ message: e.message }); }
};

// --- THIS IS THE NEW FUNCTION THAT WAS MISSING ---
const getAllocationById = async (req, res) => {
    try {
        const item = await service.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Allocation not found' });
        }
        res.status(200).json(item);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
// --- END OF NEW FUNCTION ---

const getMyAllocations = async (req, res) => {
    try {
        res.status(200).json(await service.findByFacilitator(req.user.id));
    } catch (e) { res.status(500).json({ message: e.message }); }
};

const updateAllocation = async (req, res) => {
    try {
        const updated = await service.update(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(updated);
    } catch (e) { res.status(400).json({ message: e.message }); }
};

const deleteAllocation = async (req, res) => {
    try {
        const deleted = await service.remove(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Not found' });
        res.status(204).send();
    } catch (e) { res.status(500).json({ message: e.message }); }
};

module.exports = {
    createAllocation,
    getAllocations,
    getAllocationById, 
    getMyAllocations,
    updateAllocation,
    deleteAllocation,
};