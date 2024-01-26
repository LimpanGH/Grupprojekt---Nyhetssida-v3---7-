import { requestDataToFilter } from './filterByCategory';
import { filterFunction } from './filterByCategory';

// requestDataToFilter();
// filterFunction();
let data = [];
const form = document.querySelector('form');
const searchValue = document.querySelector('.query-input');
const fromDate = document.querySelector('.from-date');
const toDate = document.querySelector('.to-date');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log(fromDate.value);
  // 2024-01-26 or 2024-01-26T11:24:26
  data = await requestDataToFilter();
  renderContent();
});

const main = async () => {
  // data = await requestDataToFilter({});
  renderContent();
};
main();

function renderContent() {
  const ul = document.querySelector('#ul');
  if (!Boolean(data.length)) {
    ul.innerHTML = 'No data please';
    return;
  }
  const html = data
    .map((d) => {
      return `
        <li>
          <h2>${d.title}</h2>
          <p>${d.description}</p>
        </li>
      `;
    })
    .join('');
  ul.innerHTML = html;
}
