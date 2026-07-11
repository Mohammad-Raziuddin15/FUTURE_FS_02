const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// 1. POST route: Save a new lead to MongoDB
router.post('/add', async (req, res) => {
    try {
        const { name, email, phone, source, status, notes } = req.body;
        
        const newLead = new Lead({ name, email, phone, source, status, notes });
        await newLead.save();
        
        res.status(201).json({ success: true, message: "Lead added successfully!", data: newLead });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 2. GET route: Fetch all leads from MongoDB to display on the frontend
router.get('/all', async (req, res) => {
    try {
        const leads = await Lead.find();
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 3. PUT Route: Update single lead record by unique ID
router.put('/:id', async (req, res) => {
    try {
        const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: updatedLead });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 4. DELETE Route: Delete single lead record by unique ID
router.delete('/:id', async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Lead removed." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 5. DELETE ALL LEADS
router.delete("/delete-all", async (req, res) => {

    try {

        await Lead.deleteMany({});

        res.status(200).json({
            success: true,
            message: "All leads deleted successfully!"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

module.exports = router;