const sendSuccessResponse = (res, data) => {
    res.status(200).json(data);
};

const sendNotFoundResponse = (res) => {
    // res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Not found' });
};

const sendErrorResponse = (res, error) => {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
};

module.exports = {
    sendSuccessResponse,
    sendNotFoundResponse,
    sendErrorResponse,
};