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

const generateRandomLowerCaseChar = () => {
  const lowerCaseChar = [..."abcdefghijklmnopqrstuvwxyz"];
  const randomIndex = Math.floor(Math.random() * lowerCaseChar.length);
  return lowerCaseChar[randomIndex];
};

const generateRandomUpperCaseChar = () => {
  const upperCaseChar = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  const randomIndex = Math.floor(Math.random() * upperCaseChar.length);
  return upperCaseChar[randomIndex];
};

const generateRandomNumericChar = () => {
  const numericChar = [..."0123456789"];
  const randomIndex = Math.floor(Math.random() * numericChar.length);
  return numericChar[randomIndex];
};

const generateRandomSpecialChar = () => {
  const specialChar = [..."!£$%^&*()"];
  const randomIndex = Math.floor(Math.random() * specialChar.length);
  return specialChar[randomIndex];
};

const generatePassword = (answers) => {
  const choices = [];

  if (answers.isLowerCase) {
    choices.push(generateRandomLowerCaseChar);
  }
  if (answers.isUpperCase) {
    choices.push(generateRandomUpperCaseChar);
  }
  if (answers.isNumeric) {
    choices.push(generateRandomNumericChar);
  }
  if (answers.isSpecial) {
    choices.push(generateRandomSpecialChar);
  }

  let password = "";

  for (let i = 0; i < answers.passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const randomChar = choices[randomIndex]();
    password += randomChar;
  }

  return password;
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
