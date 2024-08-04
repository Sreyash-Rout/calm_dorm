// backend/routes/preferences.js
// const express = require('express');
// const axios = require('axios');
// const router = express.Router();
// require('dotenv').config();

// router.post('/generate-plan', async (req, res) => {
//   const { preferences } = req.body;

//   if (!preferences) {
//     return res.status(400).send('Preferences are required');
//   }

//   try {
//     const response = await axios.post(
//       'https://api.openai.com/v1/engines/davinci-codex/completions',
//       {
//         prompt: generatePrompt(preferences),
//         max_tokens: 150,
//         n: 1,
//         stop: null,
//         temperature: 0.9,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//         },
//       }
//     );

//     const plan = JSON.parse(response.data.choices[0].text.trim());
//     res.json({ plan });
//   } catch (error) {
//     console.error('Error with OpenAI API request:', error);
//     res.status(500).send('Error with OpenAI API request');
//   }
// });

// const generatePrompt = (preferences) => {
//   const {
//     novelDiscussion = false,
//     multiplayerGaming = false,
//     groupTherapy = false,
//     oneOnOneCoaching = false,
//     journalWriting = false,
//     dayByYourself = false
//   } = preferences;

//   return `Create a weekly task plan based on the following preferences:
//   - Novel Discussion: ${novelDiscussion ? 'Yes' : 'No'}
//   - Multiplayer Gaming: ${multiplayerGaming ? 'Yes' : 'No'}
//   - Group Therapy: ${groupTherapy ? 'Yes' : 'No'}
//   - One-on-One Coaching: ${oneOnOneCoaching ? 'Yes' : 'No'}
//   - Journal Writing: ${journalWriting ? 'Yes' : 'No'}
//   - Day By Yourself: ${dayByYourself ? 'Yes' : 'No'}
//   Return the plan as a JSON object with days of the week as keys and an array of tasks for each day.`;
// };

// module.exports = router;
