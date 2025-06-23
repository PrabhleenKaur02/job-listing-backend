const {Router} = require("express");
const { getAllJobs, getJobById, addJob, updateJobById, deleteJobById } = require("../controller/jobsController");


const router = Router()

router.get('/', getAllJobs);

router.get('/:id', getJobById)

router.post('/', addJob);

router.put('/:id', updateJobById)

router.delete('/:id', deleteJobById);

module.exports = router