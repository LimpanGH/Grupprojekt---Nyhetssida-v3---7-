const apiKey = 'x';
const searchKeyword = 'bitcoin';
const language = 'sv';
const from = '2024-01-24';
const to = '2024-01-24';
const sortBy = 'popularity';
/**
 * 
  sortBy
  The order to sort the articles in. 
  Possible options: 
    relevancy, 
    popularity, 
    publishedAt.
  relevancy = articles more closely related to q come first.
  popularity = articles from popular sources and publishers come first.
  publishedAt = newest articles come first.
  Default: publishedAt
 */

/**
 * A date and optional time for the oldest article allowed.
 * This should be in ISO 8601 format (e.g. 2024-01-26 or 2024-01-26T11:24:26
 */

// const url = `https://newsapi.org/v2/everything?q=Apple&from=2024-01-25&sortBy=popularity&apiKey=${apiKey}`;

// Language The 2-letter ISO-639-1 code of the language you want to get headlines for,
// possible options: ar de en es fr he it nl no pt ru sv ud zh,
// default: all languages returned.

// const url = `https://newsapi.org/v2/everything?q=${searchKeyword}&language=${language}&from=${from}&to=${to}&sortBy=${sortBy}&apiKey=${apiKey}`;

// URl för sökord:
//const urlSearchForBitcoin = `https://newsapi.org/v2/everything?q=${searchKeyword}&apiKey=${apiKey}`;

import axios from 'axios';
import mockData from './mockNewsApi.org.json';

export const requestDataToFilter = async () => {
  return mockData.data.articles;

  const newUrl = `https://newsapi.org/v2/everything?q=${searchValue}&language=${language}&from=${fromDate}&to=${toDate}&sortBy=${sortBy}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(mockData); // Assuming mockData is a URL

    const responseData = response.data;
    // console.log(responseData.data); // Log or do something with the fetched data
    return responseData.articles; // Return the fetched data if needed
  } catch (error) {
    console.error(error);
    return null; // Return null or handle the error as appropriate
  }
};

export const filterFunction = async () => {
  try {
    const data = await requestDataToFilter(); // Fetch data using the previously defined function
    // Implement your filtering logic here
    const filtered = data.filter((item) => {
      // Assuming your data structure, modify the condition as per your data
      return item.articles.description !== `${searchKeyword}`; // Filter out items with non-empty descriptions
    });

    const items = filtered.map((item) => {
      return `<li>${item.articles.description}</li>`; // Assuming you want to create an HTML list of descriptions
    });

    const html = `<ul>${items.join('')}</ul>`;
    // Do something with the filtered data or HTML here
    console.log(html); // Log the generated HTML
    return filtered; // Return the filtered data if needed
  } catch (error) {
    console.error(error);
    return null; // Return null or handle the error as appropriate
  }
};

// ______________________________________________________

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
