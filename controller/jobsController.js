const mongoose = require("mongoose")
const Jobs = require('../models/jobModel')


// GET jobs
const getAllJobs = async (req, res) => {
    console.log('query object: ' , req.query)
    try {
        const limitParam = req.query._limit;
        const limit = limitParam && !isNaN(limitParam) ? parseInt(limitParam) : 0

        const allJobs = await Jobs.find().limit(limit);
        console.log('Limit received:', limit);


        // res.status(200).json(allJobs);

        if (allJobs.length === 0) {
           return res.status(200).json({
                msg: 'Oops! No jobs found'
            });
        } 
            return res.status(200).json({
                msg: `${allJobs.length} Jobs found`,
                JobsList: allJobs
            })
        
    }
    catch (error) {
        console.error('Error fetching jobs: ', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

// GET job by id
const getJobById = async(req, res)=>{
    const { id } = req.params
    try {
        const job = await Jobs.findById(id)
        if(!id){
            return res.status(404).json({
                error: "Job not found"
            })
        }

        res.status(200).json(job)
    } catch (error) {
        res.status(500).json({
            error: "Server error"
        })
    }
}

// POST add new job
const addJob = async(req, res) => {
    console.log("REQ BODY", req.body)
    try {
        const {title, type, location, description, salary, company: {
              name: companyName,
              description: companyDescription,
              contactEmail,
              contactPhone}
    } = req.body;

        const existingJobs = await Jobs.findOne({
                title: title,
                companyName: companyName
        });

        if(existingJobs){
            res.status(201).send({
                msg: 'Job already exists',
                description: `${existingJobs.title} job found from ${existingJobs.companyName} already exists`
            });
        } else {
            const newJob = await Jobs.create ({
                title,
                type,
                location,
                description,
                salary,
                company: {
                   name: companyName,
                   description: companyDescription,
                   contactEmail,
                   contactPhone
                }
            });
            res.status(200).send({
                msg: 'New job added successfully!',
                data: newJob
            })
        }

} catch (error) {
    console.error('Error adding job:', error);
    res.status(500).send({
        error: "Internal server error"
    });
}
};

// PUT update jobs
const updateJobById = async(req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            console.log('params: ', req.params)
        return res.status(400).json({ msg: 'Invalid Job ID' });
    }
        const job = await Jobs.findById(req.params.id);

    if(!job){
        return res.status(400).json({
            msg: "Job not found"
        })
    }

    const updatedJob = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    

    return res.status(200).json({
        msg: "Job updated successfully!",
        data: updatedJob
    })
        
    } catch (error) {
        console.log('Error updating job: ', error.message)
        return res.status(500).json({
            msg: "Unable to edit. Server error",
            error: error.message
        });
    }
    
}

// DELETE job route
const deleteJobById = async(req, res) =>{
    console.log("first")
    try{
        const job = await Jobs.findByIdAndDelete(req.params.id);
        if(!job) {
            return res.status(404).json({
                msg: "Job not found"
            })
        }
        res.status(200).json({
            msg: "Job deleted successfully!"
        })
    } catch (err) {
        res.status(500).json({
            msg: "Server error",
            error: err.message
        });
    }
};

module.exports = {
    getAllJobs,
    getJobById,
    addJob,
    updateJobById,
    deleteJobById
}


