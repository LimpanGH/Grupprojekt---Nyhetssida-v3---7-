const apiKey = '';
// const url = `https://newsapi.org/v2/everything?q=Apple&from=2024-01-25&sortBy=popularity&apiKey=${apiKey}`;
const url = `https://newsapi.org/v2/everything?q=apple&from=2024-01-24&to=2024-01-24&sortBy=popularity&apiKey=${apiKey}`;



import mockData from './mockNewsApi.org.json';

import axios from 'axios'; // Importerar via browser
console.log('testaNewsAPI.Org.js');
console.log(mockData);
async function getUser(data) {
  return mockData;
  try {
    const response = await axios.get(data);

    // console.log(response);
    const data = response.data;
    console.log(data.data.data);
  } catch (error) {
    console.error(error);
  }
}
getUser();

// Example endpoints//
// All articles about Bitcoin: https://newsapi.org/v2/everything?q=bitcoin&apiKey=API_KEY
// All articles mentioning Apple from yesterday, sorted by popular publishers first: 
// https://newsapi.org/v2/everything?q=apple&from=2024-01-24&to=2024-01-24&sortBy=popularity&apiKey=API_KEY

// import axios from 'axios'; // Importerar via browser
// async function getUser(url) {
//   try {
//     const response = await axios.get(url);
//     const data = response.data
//     console.log(response);

//   } catch (error) {
//     console.error(error);
//   }
// }
// getUser(url);
