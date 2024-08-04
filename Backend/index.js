const express = require('express');
const mongoose = require('mongoose');
const UserAnswer = require('./models/UserAnswer');

mongoose.connect('mongodb://localhost:27017/calm-dorm', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const app = express();
app.use(express.json());

app.post('/api/submit-quiz', async (req, res) => {
  try {
    const userAnswers = req.body.userAnswers;
    console.log(userAnswers);
    // Save answers to database
    await UserAnswer.insertMany(Object.entries(userAnswers).map(([id, answer]) => ({
      id: parseInt(id),
      answer
    })));

    res.status(200).send('Quiz answers saved');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving quiz answers');
  }
});

app.get('/api/preferences', async (req, res) => {
  try {
    // Fetch all user answers
    const answers = await UserAnswer.find({});
    
    // Transform answers into a preferences object
    const preferences = answers.reduce((acc, { id, answer }) => {
      switch (id) {
        case 0:
          acc.multiplayerGaming = answer === 'Yes';
          break;
        case 1:
          acc.groupTherapy = answer === 'Yes';
          break;
        case 2:
          acc.novelDiscussion = answer === 'Yes';
          break;
        case 3:
          acc.oneOnOneCoaching = answer === 'Yes';
          break;
        case 4:
          acc.journalWriting = answer === 'Yes';
          break;
        case 5:
          acc.dayByYourself = answer === 'Yes';
          break;
        default:
          break;
      }
      return acc;
    }, {});
    
    res.status(200).json({ preferences });
  } catch (error) {
    console.error('Error fetching preferences:', error);
    res.status(500).send('Error fetching preferences');
  }
});

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(5000, () => {
  console.log('Serving on port 5000');
});
