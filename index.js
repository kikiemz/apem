require('dotenv').config();
const getTasks = require('./getTasks');
const clearTask = require('./clearTask');
const tokens = require('./tokens');

(async () => {
  for (const token of tokens) {
    const userId = token.split('-')[0];
    try {
      const tasksToClear = await getTasks(userId, token);
      for (const taskId of tasksToClear) {
        await clearTask(userId, taskId, token);
      }
      console.log(`All tasks have been cleared for user ${userId}`);
    } catch (error) {
      console.log(
        `Error in Clear Tasks for user ${userId}: ` +
          (error.response?.data?.message || error.response)
      );
    }
  }
  console.log('All tasks have been cleared for all users!');
})();