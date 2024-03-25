let myLeads = [];
const inputEL = document.getElementById("input-el");
const saveLead = document.getElementById("input-btn");
const deleteLead = document.getElementById("delete-btn");
const saveTab = document.getElementById("tab-btn");
const ulEL = document.getElementById("leads");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
        <li>
        <a target = '_blank' href = '${leads[i]}'>
        ${leads[i]}
        </a>
        </li>`;
  }
  ulEL.innerHTML = listItems;
}

saveLead.addEventListener("click", function () {
  myLeads.push(inputEL.value);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  inputEL.value = "";
  render(myLeads);
});

saveTab.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

deleteLead.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});
