const express = require ("express");
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protectedRoute');
const jobRoutes = require('./routes/jobRoute')
const cors = require("cors")
require('dotenv').config()

const app= express();
const port = process.env.PORT;

// middlewares
app.use(express.json());
app.use(express.static('public'));
app.use(cors({
    origin: ['http://localhost:3000', process.env.VITE_FRONTEND_URL],
    // credentials: true
}))

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('Error connecting with MongoDB'));

// use routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/jobs', jobRoutes)

app.listen(port, ()=> {
    console.log(`server is running on port ${port}`)
});




// app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.send('Hello, world!');
//   });

// app.get('/jobs', async (req, res) => {
//     console.log("first")
//     try {
//         console.log("sec")
//         const allJobs = await Jobs.find();

//         // res.status(200).json(allJobs);

//         if (allJobs.length === 0) {
//            return res.status(200).json({
//                 msg: 'Oops! No jobs found'
//             });
//         } else {
//             return res.status(200).json({
//                 msg: `${allJobs.length} Jobs found`,
//                 JobsList: allJobs
//             })
//         };
//     }
//     catch (error) {
//         console.error('Error fetching jobs: ', error);
//         res.status(500).json({
//             error: 'Internal Server Error'
//         });
//     }
// });

// app.get('/jobs/:id', async(req, res)=>{
//     const { id } = req.params
//     try {
//         const job = await Jobs.findById(id)
//         if(!id){
//             return res.status(404).json({
//                 error: "Job not found"
//             })
//         }

//         res.status(200).json(job)
//     } catch (error) {
//         res.status(500).json({
//             error: "Server error"
//         })
//     }
// })

// job posting route
// app.post('/addJob', async(req, res) => {
//     console.log("REQ BODY", req.body)
//     try {
//         const {title, type, location, description, salary, company: {
//               name: companyName,
//               description: companyDescription,
//               contactEmail,
//               contactPhone}
//     } = req.body;

//         const existingJobs = await Jobs.findOne({
//                 title: title,
//                 companyName: companyName
//         });

//         if(existingJobs){
//             res.status(201).send({
//                 msg: 'Job already exists',
//                 description: `${existingJobs.title} job found from ${existingJobs.companyName} already exists`
//             });
//         } else {
//             const newJob = await Jobs.create ({
//                 title,
//                 type,
//                 location,
//                 description,
//                 salary,
//                 company: {
//                    name: companyName,
//                    description: companyDescription,
//                    contactEmail,
//                    contactPhone
//                 }
//             });
//             res.status(200).send({
//                 msg: 'New job added successfully!',
//                 data: newJob
//             })
//         }

// } catch (error) {
//     console.error('Error adding job:', error);
//     res.status(500).send({
//         error: "Internal server error"
//     });
// }
// });

// update jobs
// app.put('/job/update/:id', async(req, res) => {
//     const job = await Jobs.findById(req.params.id);

//     if(!job){
//         res.status(400).json({
//             msg: "Job not found"
//         })
//     }

//     const updatedJob = await Jobs.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//     });

//     res.status(200).json({
//         msg: "Job updated successfully!",
//         data: updatedJob
//     })
// })

// // delete job route
// app.delete('/job/:id', async(req, res) =>{
//     try{
//         const job = await Jobs.findByIdAndDelete(req.params.id);
//         if(!job) {
//             return res.status(404).json({
//                 msg: "Job not found"
//             })
//         }
//         res.status(200).json({
//             msg: "Job deleted successfully!"
//         })
//     } catch (err) {
//         res.status(500).json({
//             msg: "Server error",
//             error: err.message
//         });
//     }
// });
