const API_KEY = "1dc0ec6918mshc86a6d37e4545c1p18a4a5jsn2d9c0782662b";
const HOST = "wft-geo-db.p.rapidapi.com";
let citiesData = [];

let searchText = "";


//get value from input field on change
function setSearchVal(val) {
  searchText = val;
}

const listElem = document.querySelector(".pgList");
let currPage = 1,
  totaldata,
  dataPerPage = 3,
  curSelec = "";

//  console.log(currPage);


//to create pagination
let createPgnation = () => {
  let totalScreens = Math.ceil(totaldata / dataPerPage);
  listElem.innerHTML = "";

  for (let i = 1; i <= totalScreens; i++) {

    const currList =
      `<li onclick="handlePage(` +
      i +
      `)" class=` +
      curSelec +
      `>` +
      i +
      `</li>`;

    listElem.innerHTML += currList;
  }
};

//to generate the data rows in the table
let genTableData = () => {
  const tableFrame = document.querySelector("table");

  if (typeof citiesData === undefined || citiesData.length === 0) {
    tableFrame.innerHTML = "<div>No data found</div>";
  }

  if (tableFrame.rows.length > 1) {
    $("#dataTable").find("tr:not(:first)").remove();
  }

  let initialIndex = (currPage - 1) * dataPerPage + 1;
  let maxDisplay = currPage * dataPerPage;

  if (totaldata < maxDisplay) {
    maxDisplay = totaldata;
  }
  let j = 1;
  for (let i = initialIndex; i <= maxDisplay; i++) {
    let row = tableFrame.insertRow(j);
    row.insertCell(0).innerText = i;
    row.insertCell(1).innerText = citiesData[i - 1]?.city;
    row.insertCell(2).innerHTML =
      `<span>` +
      citiesData[i - 1]?.country +
      `</span> <img src="https://flagsapi.com/` +
      citiesData[i - 1]?.countryCode +
      `/shiny/64.png">`;

    j++;
  }
};


//to fetch the cities data based on search
let fetchdata = async () => {
  const options = {
    method: "GET",
    url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": HOST,
    },
  };

  try {
    const response = await axios.request(options);
    citiesData = response.data.data;
    totaldata = citiesData.length;
    await createPgnation();
    genTableData();
  } catch (error) {
    console.error(error);
  }
};


//to handle button clixk on input field input
function handleSearch() {
  fetchdata();
}


//to handle page changes
let handlePage = (val) => {
  currPage = val;
  genTableData();
};
