

import axios from 'axios'; // Importerar via browser
const url ='https://newsdata.io/api/1/news?apikey=pub_36662bcc9b713c725352534e08311f173ffc7&q=pizza';
async function getUser(url) {
  try {
    const response = await axios.get(url);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
getUser(url);




