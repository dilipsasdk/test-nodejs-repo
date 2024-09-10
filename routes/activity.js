const express = require('express');
const router = express.Router();

router.post('/execute', (req, res) => {
    const inArguments = req.body.inArguments || [];
    console.log('Executing activity with inArguments:', inArguments);

    // Your custom logic here

    res.status(200).json({
        success: true,
        message: 'Activity executed successfully'
    });
});

router.post('/publish', (req, res) => {
    console.log('Activity published');
    res.status(200).send('Publish success');
});

router.post('/validate', (req, res) => {
    console.log('Activity validated');
    res.status(200).send('Validate success');
});

router.post('/stop', (req, res) => {
    console.log('Activity stopped');
    res.status(200).send('Stop success');
});

module.exports = router;
