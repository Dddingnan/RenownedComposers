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

window.onload = function () {
  fetch("static/data/eras.json")
    .then((response) => response.json())
    .then((eras) => constructMusicEra(eras));
};
