const service = require('./activity.service');

const submitLog = async (req, res) => {
    try {
        const log = await service.createOrUpdateLog(req.body, req.user.id);
        res.status(201).json({ message: "Log submitted", log });
    } catch (e) { res.status(e.statusCode || 500).json({ message: e.message }); }
};

const getLogs = async (req, res) => {
    try {
        res.status(200).json(await service.findLogs(req.query));
    } catch (e) { res.status(500).json({ message: e.message }); }
};

module.exports = { submitLog, getLogs };