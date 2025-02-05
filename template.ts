const reminderTemplate = (data) => {
  return `
        <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Daily Learning Reminder</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
                <td align="center">
                    <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                        <tr>
                            <td align="center" style="font-size: 24px; font-weight: bold; color: #333333; padding: 15px;">
                                📌 Day ${data.day}: ${data.title}
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="font-size: 16px; color: #555555; padding: 15px;">
                                Hi [User's Name],
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="font-size: 16px; color: #555555; padding: 20px;">
                                You're on <strong>Day ${
                                  data.day
                                }</strong> of your learning journey! Today, you'll be working on an essential phase: <strong>${
    data.title
  }</strong>.
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
                                <strong>📖 Topics for Today:</strong><br><br>
                                ${data.agenda
                                  .map((agenda) => `✅ ${agenda} <br/>`)
                                  .join("")}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px; background-color: #e7f5ff; border-radius: 5px; margin-top: 15px;">
                                <strong>🛠️ Practical Tasks:</strong><br><br>
                                ${data.practical
                                  .map((task) => `🔹 ${task} <br/>`)
                                  .join("")}
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="font-size: 14px; color: #777777; padding: 15px;">
                                Keep pushing forward—you're almost at the finish line! 🚀
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="font-size: 14px; color: #555555; padding: 20px;">
                                Best, <br>
                                <strong>Maileminder</strong>
                            </td>
                        </tr>
                        
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
      `;
};

module.exports = reminderTemplate;
