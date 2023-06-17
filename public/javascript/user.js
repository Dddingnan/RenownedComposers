import { signInWithGoogle, signOutWithGoogle, addDocument, getAllDocuments, deleteDocument } from "./firebase-init.js";
import { showLoadingSpinner, hideLoadingSpinner } from "./spinner.js";

let selectData;

function getLocalStorageData() {
  const userData = localStorage.getItem("userData");
  const data = JSON.parse(userData);
  if (data) {
    const { displayName, photoURL } = data;
    document.getElementById("google-sign-in").style.display = "none";
    document.getElementById("username").innerText = displayName;
    document.getElementById("icon").src = photoURL;
    document.getElementById("icon").alt = displayName;
    getSelectData();
    getUserCollectionData();
  } else {
    document.getElementById("user-section").style.display = "none";
    document.getElementById("input-section").style.display = "none";
    document.getElementById("data-section").style.display = "none";
    document.getElementById("user-header").style.display = "none";
    document.getElementById("data-table").style.display = "none";
    document.getElementById("hr1").style.display = "none";
    document.getElementById("hr2").style.display = "none";
  }
}

function getSelectData() {
  showLoadingSpinner();
  Promise.all([fetch("../static/data/composerSelect.json").then((response) => response.json())])
    .then(([data]) => {
      hideLoadingSpinner();
      selectData = data;
      constructSelect(data);
    })
    .catch(() => {
      hideLoadingSpinner();
    });
}

function constructSelect(data) {
  const composersSelect = document.getElementById("composers-select");
  const creationsSelect = document.getElementById("creations-select");

  // Populate the composers select with options
  data.forEach((item, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.text = item.composer;
    composersSelect.appendChild(option);
  });

  // Add an event listener for when the composers select changes
  composersSelect.addEventListener("change", function () {
    // Clear the creations select
    while (creationsSelect.firstChild) {
      creationsSelect.removeChild(creationsSelect.firstChild);
    }

    // Get the selected composer's creations
    const creations = data[this.value].creations;

    // Populate the creations select with options
    creations.forEach((creation) => {
      const option = document.createElement("option");
      option.value = creation.id;
      option.text = creation.name;
      creationsSelect.appendChild(option);
    });
  });

  // Trigger the change event to populate the creations select initially
  composersSelect.dispatchEvent(new Event("change"));
}

const handleSelect = async () => {
  const userData = localStorage.getItem("userData");
  const decodeUserData = JSON.parse(userData);
  if (decodeUserData) {
    const { uid } = decodeUserData;

    const composerSelect = document.getElementById("composers-select");
    const creationSelect = document.getElementById("creations-select");

    const selectedComposerIndex = composerSelect.value;
    const selectedComposer = selectData[selectedComposerIndex].composer;

    const selectedCreationId = creationSelect.value;
    const selectedCreation = selectData[selectedComposerIndex].creations.find((creation) => creation.id == selectedCreationId).name;
    await addDocument(uid, selectedComposer, selectedCreation, getUserCollectionData);
  }
};

async function getUserCollectionData() {
  const userData = localStorage.getItem("userData");
  const decodeUserData = JSON.parse(userData);
  if (decodeUserData) {
    const { uid } = decodeUserData;
    const documents = await getAllDocuments(uid);
    populateTable(documents, uid);
  }
}

function populateTable(data, uid) {
  // Create table
  const table = document.createElement("table");
  table.id = "composers";

  // Create table header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const th1 = document.createElement("th");
  th1.innerText = "Composer";
  headerRow.appendChild(th1);

  const th2 = document.createElement("th");
  th2.innerText = "Creation";
  headerRow.appendChild(th2);

  const th3 = document.createElement("th");
  th3.innerText = "Action";
  headerRow.appendChild(th3);

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement("tbody");
  data.forEach((item) => {
    const row = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.innerText = item.composer;
    row.appendChild(td1);

    const td2 = document.createElement("td");
    td2.innerText = item.data.creation;
    row.appendChild(td2);

    const td3 = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = async function () {
      await deleteDocument(uid, item.composer, getUserCollectionData);
    };
    td3.appendChild(deleteButton);
    row.appendChild(td3);

    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  // Get the div
  const div = document.getElementById("data-table");

  // Clear the div
  div.innerHTML = "";

  // Append table to div
  div.appendChild(table);
}

window.onload = function () {
  getLocalStorageData();
  document.getElementById("google-sign-in").addEventListener("click", () => {
    signInWithGoogle(() => {
      getSelectData();
      getUserCollectionData();
    });
  });
  document.getElementById("select-button").addEventListener("click", handleSelect);
  document.getElementById("google-sign-out").addEventListener("click", signOutWithGoogle);
};
