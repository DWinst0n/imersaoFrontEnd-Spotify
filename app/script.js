const resultArtist = document.getElementById("resultArtist");
const resultPlaylist = document.getElementById("playlistsResults");
const gridContainer = document.querySelector(".grid-container");
const searchInput = document.getElementById("searchInput");

function requestApi(searchTerm) {
  const url = "https://dwinst0n.github.io/imersaoFrontEnd-Spotify/api-artists/artists.json";
  fetch(url)
    .then((response) => response.json())
    .then((result) => displayResults(result.artists || [], searchTerm));
}

function displayResults(artists, searchTerm) {
  resultPlaylist.classList.add("hidden");
  gridContainer.innerHTML = "";

  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchTerm)
  );

  if (filteredArtists.length === 0) {
    gridContainer.innerHTML = "<p>Nenhum artista encontrado.</p>";
  } else {
    filteredArtists.forEach((artist) => {
      const artistCard = document.createElement("div");
      artistCard.classList.add("artist-card");
      artistCard.innerHTML = `
        <div class="card-img">
            <img class="artist-img" src="${artist.urlImg}" alt="Imagem de ${artist.name}" />
            <div class="play">
                <span class="fa fa-solid fa-play"></span>
            </div>
        </div>
        <div class="card-text">
            <span class="artist-name">${artist.name}</span>
            <span class="artist-categorie">Artista</span>
        </div>
      `;
      gridContainer.appendChild(artistCard);
    });
  }
  resultArtist.classList.remove("hidden");
}

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  if (searchTerm === "") {
    resultPlaylist.classList.remove("hidden");
    resultArtist.classList.add("hidden");
    return;
  }
  requestApi(searchTerm);
});
