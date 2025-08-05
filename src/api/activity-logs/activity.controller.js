// src/api/activity-logs/activity.controller.js - UPDATED

const service = require('./activity.service');

const submitLog = async (req, res) => {
    // ... this function remains the same ...
    try {
        const logData = req.body;
        const userId = req.user.id;
        if (req.file) { logData.filePath = req.file.path; }
        if (logData.attendance && typeof logData.attendance === 'string') {
            logData.attendance = JSON.parse(logData.attendance);
        }
        const log = await service.createOrUpdateLog(logData, userId);
        res.status(201).json({ message: "Log submitted", log });
    } catch (e) { res.status(e.statusCode || 500).json({ message: e.message }); }
};

// --- NEW CONTROLLER FUNCTION FOR UPDATING ---
const updateLog = async (req, res) => {
    try {
        const logData = req.body;
        if (req.file) { logData.filePath = req.file.path; }
        if (logData.attendance && typeof logData.attendance === 'string') {
            logData.attendance = JSON.parse(logData.attendance);
        }
        
        const updatedLog = await service.updateLog(req.params.id, logData, req.user.id);
        
        if (!updatedLog) {
            return res.status(404).json({ message: 'Log not found or you are not authorized to update it.' });
        }
        
        res.status(200).json({ message: 'Log updated successfully', log: updatedLog });
    } catch (e) {
        res.status(e.statusCode || 500).json({ message: e.message });
    }
};
// --- END OF NEW FUNCTION ---

// --- NEW CONTROLLER FUNCTION FOR DELETING ---
const deleteLog = async (req, res) => {
    try {
        const deleted = await service.removeLog(req.params.id, req.user.id);
        
        if (!deleted) {
            return res.status(404).json({ message: 'Log not found or you are not authorized to delete it.' });
        }
        
        res.status(204).send(); // Success, no content
    } catch (e) {
        res.status(e.statusCode || 500).json({ message: e.message });
    }
};
// --- END OF NEW FUNCTION ---

const getLogs = async (req, res) => {
    // ... this function remains the same ...
    try {
        const logs = await service.findLogs(req.query);
        res.status(200).json(logs);
    } catch (e) { res.status(500).json({ message: e.message }); }
};

module.exports = {
    submitLog,
    updateLog, // Export the new function
    deleteLog, // Export the new function
    getLogs
};