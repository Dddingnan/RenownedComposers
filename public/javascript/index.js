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

const constructInstrumentSection = (instruments) => {
  const instrumentsSection = document.getElementById("instruments");

  instruments.forEach((instrument) => {
    const h3 = document.createElement("h3");
    h3.textContent = instrument.name;

    const image = document.createElement("img");
    image.src = instrument.image;
    image.alt = instrument.name;

    const figure = document.createElement("figure");
    figure.appendChild(image);

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = `Fig. ${instruments.indexOf(instrument) + 2}. ${instrument.name}`;
    figure.appendChild(figcaption);

    instrumentsSection.appendChild(h3);

    instrument.description.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      instrumentsSection.appendChild(p);
    });

    instrumentsSection.appendChild(figure);
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
  Promise.all([fetch("static/data/eras.json").then((response) => response.json()), fetch("static/data/composerEra.json").then((response) => response.json()), fetch("static/data/instruments.json").then((response) => response.json())]).then(([eras, composers, instruments]) => {
    constructMusicEra(eras);
    constructComposerTable(composers);
    constructInstrumentSection(instruments);
  });
};
