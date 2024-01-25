// const apiKey = 'pub_36662bcc9b713c725352534e08311f173ffc7';
// const url =
//   'https://newsdata.io/api/1/news?apikey=pub_36662bcc9b713c725352534e08311f173ffc7&q=pizza';

// const url2 =
//   'https://newsdata.io/api/1/news?apikey=pub_36662bcc9b713c725352534e08311f173ffc7&q=pizza';


// @ts-nocheck
import mockData from './mockNewsData.json';

import axios from 'axios'; // Importerar via browser
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
