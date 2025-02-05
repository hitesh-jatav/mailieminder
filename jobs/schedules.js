const cron = require("node-cron");
const CourseModel = require("../models/course.model");
const { sendMail } = require("../helper/mail.helper");

const addJobs = async () => {
  try {
    console.log("⏳ Fetching pending jobs...");

    let allCourses = await CourseModel.find({}).lean();

    let toScheduleCourses = allCourses.filter((cr) => cr.days > cr.currentDay);

    for (let i = 0; i < toScheduleCourses.length; i++) {
      let course = toScheduleCourses[i];

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

      // Schedule each day-wise task at 4 AM IST
      daycourse.forEach((task) => {
        let scheduledDate = new Date();
        scheduledDate.setDate(
          scheduledDate.getDate() + (task.day - course.currentDay)
        );

        let day = scheduledDate.getDate();
        let month = scheduledDate.getMonth() + 1; // Months are 0-based

        let cronExpression = `0 4 ${day} ${month} *`;

        console.log(
          `📅 Scheduling task for course: ${course.title} on Day ${
            task.day
          } (${scheduledDate.toDateString()}) at 4 AM IST`
        );

        cron.schedule(
          cronExpression,
          async () => {
            try {
              console.log(
                `🚀 Executing task for course: ${course.name}, Day ${task.day}`
              );

              let template = reminderTemplate(task);
              await sendMail(
                `Day - ${task.day} | ${course.name} - `,
                template,
                `It's ${course.name} Time`
              );
              await CourseModel.updateOne(
                { _id: course._id },
                { currentDay: day }
              );

              console.log(
                `✅ Task completed for course: ${course.name}, Day ${task.day}`
              );
            } catch (error) {
              console.error(
                `❌ Error processing course ${course.name}, Day ${task.day}:`,
                error
              );
            }
          },
          {
            timezone: "Asia/Kolkata", // Set timezone to IST
          }
        );
      });
    }

    console.log("✅ All daily jobs scheduled at 4 AM IST.");
  } catch (error) {
    console.error("❌ Error executing jobs:", error);
  }
};

addJobs();
