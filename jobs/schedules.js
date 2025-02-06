const schedule = require("node-schedule");
const CourseModel = require("../models/course.model");
const { sendMail } = require("../helper/mail.helper");

const startCronJobs = async () => {
  try {
    console.log("⏳ Fetching pending jobs...");

    let allCourses = await CourseModel.find({}).lean();

    let toScheduleCourses = allCourses.filter((cr) => cr.days > cr.currentDay);

    for (let i = 0; i < toScheduleCourses.length; i++) {
      let course = toScheduleCourses[i];
      console.log(`Processing course: ${course.title}`);

      let daysToSchedule = course.days - course.currentDay;
      let daycourse = [];

      if (daysToSchedule > 0) {
        course.content.forEach((cn) => {
          daycourse.push(...cn.dayWise);
        });
      }

      // Filter only future days (>= currentDay)
      daycourse = daycourse.filter((dy) => dy.day >= course.currentDay);

      // Sort daycourse array by day in ascending order
      daycourse.sort((a, b) => a.day - b.day);

      // Schedule tasks at 4 AM IST for each day
      daycourse.forEach((task) => {
        let scheduledDate = new Date();
        scheduledDate.setDate(
          scheduledDate.getDate() + (task.day - course.currentDay)
        );
        scheduledDate.setHours(4, 0, 0, 0); // Set time to 4 AM IST

        console.log(
          `Scheduling task for course: ${course.title}, Day ${
            task.day
          } at ${scheduledDate.toString()}`
        );

        // Schedule job for the task
        schedule.scheduleJob(scheduledDate, async () => {
          try {
            console.log(
              `Executing task for course: ${course.name}, Day ${task.day}`
            );
            let template = reminderTemplate(task); // Assuming reminderTemplate is defined elsewhere
            await sendMail(
              `Day - ${task.day} | ${course.name} - `,
              template,
              `It's ${course.name} Time`
            );
            await CourseModel.updateOne(
              { _id: course._id },
              { currentDay: task.day }
            );
            console.log(
              `Task completed for course: ${course.name}, Day ${task.day}`
            );
          } catch (error) {
            console.error(
              `Error processing course ${course.name}, Day ${task.day}:`,
              error
            );
          }
        });
      });
    }

    console.log("✅ All daily jobs scheduled.");
  } catch (error) {
    console.error("❌ Error executing jobs:", error);
  }
};

module.exports = { startCronJobs };
