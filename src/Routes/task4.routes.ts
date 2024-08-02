import express, { Request, Response } from 'express';
import Staff from '../db/models/task4';  // Adjust the import path according to your project structure

const router = express.Router();

// Create a new staff member
router.post('/post', async (req: Request, res: Response) => {
    const { Name, email, position } = req.body;
    try {
        const newStaff = await Staff.create({ Name, email, position });
        res.status(201).json(newStaff);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create staff member' });
    }
});

// Get all staff members
router.get('/get', async (req: Request, res: Response) => {
    try {
        const staffMembers = await Staff.findAll();
        res.status(200).json(staffMembers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve staff members' });
    }
});
// Update a staff member
router.put('/put/:staffId', async (req: Request, res: Response) => {
    const { staffId } = req.params;
    const { Name, email, position } = req.body;
    try {
        const staffMember = await Staff.findByPk(staffId);
        if (staffMember) {
            staffMember.Name = Name;
            staffMember.email = email;
            staffMember.position = position;
            await staffMember.save();
            res.status(200).json(staffMember);
        } else {
            res.status(404).json({ error: 'Staff member not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update staff member' });
    }
});

// Delete a staff member
router.delete('/del/:staffId', async (req: Request, res: Response) => {
    const { staffId } = req.params;
    try {
        const staffMember = await Staff.findByPk(staffId);
        if (staffMember) {
            await staffMember.destroy();
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Staff member not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete staff member' });
    }
});

export default router;
