//Required imports to make use of the file system, so we can interact with files on a system level
const fs = require('fs');

// Function to parse CSV data to so we can use it to find the scores for users
function parseCSV(csvData) {
  const lines = csvData.split('\n');
  const headers = lines[0].split(',');

  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length === headers.length) {
      const entry = {};
      for (let j = 0; j < headers.length; j++) {
        entry[headers[j]] = values[j];
      }
      data.push(entry);
    }
  }

  return data;
}

  

// Create a Function to find top scorers in the class from the TestData
function findTopScorers(data) {
  let topScore = 0;
  const topScorers = [];

  data.forEach(entry => {
    const score = parseInt(entry['Score']);
    if (score > topScore) {
      topScorers.length = 0;
      topScorers.push(entry['First Name']);
      topScore = score;
    } else if (score === topScore) {
      topScorers.push(entry['Name']);
    }
  });

  return { topScorers, topScore };
}

// Now we must read TestData CSV file from the project file path
fs.readFile('TestData.csv', 'utf8', (err, csvData) => {
  if (err) {
    console.error(err);
    return;
  }

  const data = parseCSV(csvData);
  const { topScorers, topScore } = findTopScorers(data);

  if (topScorers.length > 0) {
    topScorers.sort();
    console.log(`Top scorer names: ${topScorers}`)
    console.log(`The top score/s is: ${topScore}`);
  } else {
    console.log('No top scorers found.');
  }
});
