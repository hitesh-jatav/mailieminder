const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    days: {
      type: Number,
      required: true,
    },
    currentDay: { type: Number, default: 0 },
    content: [
      {
        week: Number,
        dayWise: [
          {
            day: Number,
            title: String,
            agenda: [String],
            practical: [String],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model("course", courseSchema);

module.exports = Course;
