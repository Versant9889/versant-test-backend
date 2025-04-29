const mongoose = require('mongoose');
const Question = require('./models/Question');

mongoose.connect('mongodb+srv://versantUser:Versantpasskey123@versant.8cgczhu.mongodb.net/?retryWrites=true&w=majority&appName=versant')
  .then(async () => {
    const questions = {
      partA: {
        description: "Candidates are asked to repeat sentences that they hear",
        questions: [
          { question: "With all the good programs available it’s difficult to make a quick decision.", _id: "67e3ddd0d41713c038739910" },
          { question: "The search for qualified software engineer is truly difficult.", _id: "67e3ddd0d41713c038739911" }
        ]
      },
      partB: {
        description: "Sentence completion questions",
        questions: [
          { question: "When I arrived at the station, the train ________ already left.", _id: "67e3ddd0d41713c038739912" }
        ]
      },
      partC: {
        description: "Sentence ordering questions",
        questions: [
          { question: "Put the following words in order to form a correct sentence: always / she / arrives / late", _id: "67e3ddd0d41713c038739913" }
        ]
      },
      partD: {
        description: "Passage reconstruction questions",
        questions: [
          { question: "Reconstruct the passage: The meeting was scheduled for 10 AM. Everyone arrived on time.", _id: "67e3ddd0d41713c038739914" }
        ]
      },
      partE: {
        description: "Summary writing questions",
        questions: [
          { question: "Summarize the following text: [Sample text here]", _id: "67e3ddd0d41713c038739915" }
        ]
      },
      partF: {
        description: "Essay writing questions",
        questions: [
          { question: "Write a short essay on the importance of time management.", _id: "67e3ddd0d41713c038739916" }
        ]
      }
    };
    await Question.deleteMany();
    await Question.create(questions);
    console.log('Questions seeded successfully');
    process.exit();
  })
  .catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
  });