const mongoose = require("mongoose")

// schema
const jobListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: String,
    location: String,
    description: String,
    salary: Number,
    company: {
      name: {
        type: String,
        required: true
      },
      description: String,
      contactEmail: String,
      contactPhone: Number
    }
});

const Jobs = mongoose.model("Jobs", jobListingSchema);
module.exports = Jobs;