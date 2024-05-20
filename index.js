const express = require ("express");
const app= express();
// const router = express.Router();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const { error } = require("console");

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect("mongodb+srv://kaurprabhleen2002:EGiNeRa7yLhNuZc1@cluster0.ih4d0ql.mongodb.net/jobListings")
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('Error connecting with MongoDB'));

// schema
const jobListing = {
    title: 'String',
    type: 'String',
    location: 'String',
    description: 'String',
    salary: 'Number',
    company: {
      name: 'String',
      description: 'String',
      contactEmail: 'String',
      contactPhone: 'Number'
    }
}

const Jobs = mongoose.model("Jobs", jobListing);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
// app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

app.get('/jobs', async (req, res) => {
    try {
        const allJobs = await Jobs.find();

        if (allJobs.length === 0) {
            res.status(200).json({
                msg: 'Oops! No jobs found'
            });
        } else {
            res.status(200).json({
                msg: `${allJobs.length} Jobs found`,
                JobsList: allJobs
            })
        };
    }
    catch (error) {
        console.error('Error fetching jobs: ', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

// job posting route
app.post('/addJob', async(req, res) => {
    try {
        const {title, type, location, description, salary, company: {
              name: companyName,
              description: companyDescription,
              contactEmail,
              contactPhone}
    } = req.body;

        const existingJobs = await Jobs.findOne({
            where: {
                title: title,
                companyName: companyName
            }
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
            res.send(200).send({
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
});


// delete job route
app.delete('/job/:id', async(req, res) =>{
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
        })
    }

   
})



app.listen(port, ()=> {
    console.log(`server is running on port ${port}`)
});