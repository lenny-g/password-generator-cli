// import inquirer
const inquirer = require("inquirer");

// declare questions array
const questions = [
  {
    type: "number",
    message: "Enter the length of your password:",
    name: "passwordLength",
  },
  {
    type: "confirm",
    message: "Would you like to add lowercase characters?",
    name: "isLowerCase",
  },
  {
    type: "confirm",
    message: "Would you like to add uppercase characters?",
    name: "isUpperCase",
  },
  {
    type: "confirm",
    message: "Would you like to add numeric characters?",
    name: "isNumeric",
  },
  {
    type: "confirm",
    message: "Would you like to add special characters?",
    name: "isSpecial",
  },
];

// declare retry question
const retryQuestion = {
  type: "confirm",
  message: "Would you like to retry?",
  name: "retry",
};

// declare verification function
const validateAnswers = (answers) => {
  if (answers.passwordLength < 10) {
    return false;
  }

  const acceptedChoices = [
    answers.isLowerCase,
    answers.isUpperCase,
    answers.isNumeric,
    answers.isSpecial,
  ].filter((choice) => {
    return choice;
  });

  if (acceptedChoices.length < 2) {
    return false;
  }

  return true;
};

const generatePassword = (answers) => {
  return "password123!";
};

// declare async start function
const start = async () => {
  let inProgress = true;

  while (inProgress) {
    // prompt questions and store answers
    const answers = await inquirer.prompt(questions);

    // call validate answers function
    const isValid = validateAnswers(answers);

    if (isValid) {
      // if answer isValid generate password
      const password = generatePassword(answers);

      console.log(`Your random password is ${password}`);
      inProgress = false;
    } else {
      console.log(
        "\n\nPlease ensure you select a minimum of 2 criteria and a password length greater than 8 characters\n\n"
      );

      // else prompt retry question
      const retryAnswer = await inquirer.prompt(retryQuestion);
      if (!retryAnswer.retry) {
        inProgress = false;
      }
    }
  }
};

// call start function
start();
