const Job = require('../models/jobModel');
const User = require('../models/userModel');

const createJob = async (req, res) => {
    try {
        const { companyName, title, description, salary, userId } = req.body;

        // Validate required fields
        if (!companyName || !title || !description || !salary || !userId) {
            return res.status(400).json({ 
                error: "Missing required fields.",
                details: "Company name, job title, description, salary, and user ID are required."
            });
        }

        // Check if the user exists and is an admin
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        if (user.type !== 'admin') {
            return res.status(403).json({ error: "Only admin users can create job listings." });
        }

        // Create and save the job
        const job = new Job({
            companyName,
            title,
            description,
            salary,
            createdBy: userId
        });

        await job.save();
        res.status(201).json({ 
            message: "Job created successfully.",
            job: {
                id: job._id,
                companyName: job.companyName,
                title: job.title,
                description: job.description,
                salary: job.salary
            }
        });
    } catch (err) {
        console.error('Error creating job:', err);
        res.status(500).json({ error: "Internal server error." });
    }
};

const getAllJobs = async (req, res) => {
    try {
        // Pagination parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Get total count for pagination
        const totalJobs = await Job.countDocuments();
        
        // Fetch jobs with pagination
        const jobs = await Job.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('createdBy', 'fullName email -_id');

        res.status(200).json({ 
            jobs,
            pagination: {
                totalJobs,
                totalPages: Math.ceil(totalJobs / limit),
                currentPage: page,
                hasNextPage: page * limit < totalJobs,
                hasPrevPage: page > 1
            }
        });
    } catch (err) {
        console.error('Error fetching jobs:', err);
        res.status(500).json({ error: "Internal server error." });
    }
};

const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        
        const job = await Job.findById(jobId)
            .populate('createdBy', 'fullName email -_id');
        
        if (!job) {
            return res.status(404).json({ error: "Job not found." });
        }
        
        res.status(200).json({ job });
    } catch (err) {
        console.error('Error fetching job:', err);
        res.status(500).json({ error: "Internal server error." });
    }
};

const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const { companyName, title, description, salary, userId } = req.body;
        
        // Check if the user exists and is an admin
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        if (user.type !== 'admin') {
            return res.status(403).json({ error: "Only admin users can update job listings." });
        }
        
        // Find and update the job
        const job = await Job.findById(jobId);
        
        if (!job) {
            return res.status(404).json({ error: "Job not found." });
        }
        
        // Update fields if provided
        if (companyName) job.companyName = companyName;
        if (title) job.title = title;
        if (description) job.description = description;
        if (salary) job.salary = salary;
        
        await job.save();
        
        res.status(200).json({ 
            message: "Job updated successfully.",
            job: {
                id: job._id,
                companyName: job.companyName,
                title: job.title,
                description: job.description,
                salary: job.salary
            }
        });
    } catch (err) {
        console.error('Error updating job:', err);
        res.status(500).json({ error: "Internal server error." });
    }
};

const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const { userId } = req.body;
        
        // Check if the user exists and is an admin
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        if (user.type !== 'admin') {
            return res.status(403).json({ error: "Only admin users can delete job listings." });
        }
        
        // Find and delete the job
        const job = await Job.findByIdAndDelete(jobId);
        
        if (!job) {
            return res.status(404).json({ error: "Job not found." });
        }
        
        res.status(200).json({ message: "Job deleted successfully." });
    } catch (err) {
        console.error('Error deleting job:', err);
        res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob
};