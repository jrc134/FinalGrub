import express from 'express';
import mongoose from 'mongoose';

import DonationMessage from '../models/donationMessage.js';

const router = express.Router();

export const getDonations = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await DonationMessage.countDocuments({});
        const donations = await DonationMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: donations, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getDonationsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const donations = await DonationMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

        res.json({ data: donations });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getDonationsByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const donations = await DonationMessage.find({ name });

        res.json({ data: donations });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getDonation = async (req, res) => { 
    const { id } = req.params;

    try {
        const donation = await DonationMessage.findById(id);
        
        res.status(200).json(donation);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createDonation = async (req, res) => {
    const donation = req.body;

    const newDonationMessage = new DonationMessage({ ...donation, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newDonationMessage.save();

        res.status(201).json(newDonationMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateDonation = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No donation with id: ${id}`);

    const updatedDonation = { creator, title, message, tags, selectedFile, _id: id };

    await DonationMessage.findByIdAndUpdate(id, updatedDonation, { new: true });

    res.json(updatedDonation);
}

export const deleteDonation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No donation with id: ${id}`);

    await DonationMessage.findByIdAndRemove(id);

    res.json({ message: "Donation deleted successfully." });
}

export const likeDonation = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No donation with id: ${id}`);
    
    const donation = await DonationMessage.findById(id);

    const index = donation.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      donation.likes.push(req.userId);
    } else {
      donation.likes = donation.likes.filter((id) => id !== String(req.userId));
    }

    const updatedDonation = await DonationMessage.findByIdAndUpdate(id, donation, { new: true });

    res.status(200).json(updatedDonation);
}

export const commentDonation = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const donation = await DonationMessage.findById(id);

    donation.comments.push(value);

    const updatedDonation = await DonationMessage.findByIdAndUpdate(id, donation, { new: true });

    res.json(updatedDonation);
};

export default router;