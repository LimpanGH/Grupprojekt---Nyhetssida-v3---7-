
///////////////////////////
//SORTERING EFTER SENAST///
///////////////////////////

export function sortArticlesByPublishedDate(articles) {
  return articles.sort(function(a, b) {
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });
}

export function updateInterfaceForPublishedDate(sortedArticles) {
  renderContent(sortedArticles);
}

export async function handleSearchForPublishedDate() {
  let searchKeyword = getUserSearchInput();
  await requestDataToFilter(searchKeyword);
  const storedData = localStorage.getItem('data');
  if (storedData) {
    const articles = JSON.parse(storedData);
    const sortedArticles = sortArticlesByPublishedDate(articles);
    updateInterfaceForPublishedDate(sortedArticles);
  } else {
    console.log('Ingen data tillgänglig i localStorage.');
  }
}

document.getElementById("senast").addEventListener("click", async function() {
  await handleSearchForPublishedDate();
});


/////////////////////////////////
////////SORTERING EFTER ÄLDSTA///
////////////////////////////////

let eventlyssnare = () => {
document.getElementById("senast").addEventListener("click", async function() {
  await handleSearchForPublishedDate();
});
}

export function sortArticlesByOldestDate(articles) {
  return articles.sort(function(a, b) {
    return new Date(a.publishedAt) - new Date(b.publishedAt);
  });
}

export function updateInterfaceForOldestDate(sortedArticles) {
  renderContent(sortedArticles);
}

export async function handleSearchForOldestDate() {
  let searchKeyword = getUserSearchInput();
  await requestDataToFilter(searchKeyword);
  const storedData = localStorage.getItem('data');
  if (storedData) {
    const articles = JSON.parse(storedData);
    const sortedArticles = sortArticlesByOldestDate(articles);
    updateInterfaceForOldestDate(sortedArticles);
  } else {
    console.log('Ingen data tillgänglig i localStorage.');
  }
}

export let oldest =  () => {

document.getElementById("äldsta").addEventListener("click", async function() {
  let searchKeyword = getUserSearchInput();
  await requestDataToFilter(searchKeyword);
  const storedData = localStorage.getItem('data');
  if (storedData) {
    const articles = JSON.parse(storedData);
    const sortedArticles = sortArticlesByOldestDate(articles);
    updateInterfaceForOldestDate(sortedArticles);
  } else {
    console.log('Ingen data tillgänglig i localStorage.');
  }
});
}