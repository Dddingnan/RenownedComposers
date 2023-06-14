const constructMusicEra = (eras) => {
  // Get the existing ul
  const ul = document.getElementById("music-era");

  // Create the li for each era
  eras.forEach((era) => {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const a = document.createElement("a");

    a.href = era.link;
    a.textContent = era.name;

    h3.appendChild(a);
    li.appendChild(h3);
    ul.appendChild(li);
  });
};

const constructComposerTable = (composers) => {
  const table = document.getElementById("composers");

  composers.forEach((composer) => {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = composer.name;

    const tdEra = document.createElement("td");
    tdEra.textContent = composer.era;

    tr.appendChild(tdName);
    tr.appendChild(tdEra);

    table.appendChild(tr);
  });
};

window.onload = function () {
  // TODO Make the shared fetching function
  fetch("static/data/eras.json")
    .then((response) => response.json())
    .then((eras) => constructMusicEra(eras));

  fetch("static/data/composerEra.json")
    .then((response) => response.json())
    .then((composers) => constructComposerTable(composers));
};
