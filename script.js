let currentSport = "cricket";
let musicPlaying = true;

setTimeout(() => {
  document.getElementById("splash").classList.add("hidden");
  document.getElementById("selector").classList.remove("hidden");
}, 3500);

function toggleMusic() {
  const music = document.getElementById("bgMusic");
  const btn = document.getElementById("toggleMusic");

  if (musicPlaying) {
    music.pause();
    btn.innerText = "🔇 Unmute";
  } else {
    music.play();
    btn.innerText = "🔊 Mute";
  }

  musicPlaying = !musicPlaying;
}

function showCricket() {
  document.getElementById("selector").classList.add("hidden");
  document.getElementById("cricketPage").classList.remove("hidden");
  fetchLiveMatches();
}

function showFootball() {
  document.getElementById("selector").classList.add("hidden");
  document.getElementById("footballPage").classList.remove("hidden");
  fetchLiveFootball();
}

function showOldSearch(sport) {
  currentSport = sport;
  document.getElementById("cricketPage").classList.add("hidden");
  document.getElementById("footballPage").classList.add("hidden");
  document.getElementById("oldSearchPage").classList.remove("hidden");
}

function goBack() {
  document.getElementById("cricketPage").classList.add("hidden");
  document.getElementById("footballPage").classList.add("hidden");
  document.getElementById("oldSearchPage").classList.add("hidden");
  document.getElementById("selector").classList.remove("hidden");
}

function fetchLiveMatches() {
  const apiKey = "lxjrKACRVgwh2PKZGKWgotKmnp3DHbaIVPXAUBjfE5WtoyXQrowTs41jK0M6";
  const url = `https://cricket.sportmonks.com/api/v2.0/livescores?api_token=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("matches");
      container.innerHTML = "";

      if (data.data.length === 0) {
        container.innerHTML = "No live matches right now.";
        return;
      }

      data.data.forEach(match => {
        const el = document.createElement("div");
        el.innerHTML = `<strong>${match.league.name}</strong><br>${match.localteam.name} vs ${match.visitorteam.name}`;
        el.style.marginBottom = "1.2rem";
        container.appendChild(el);
      });
    })
    .catch(err => {
      document.getElementById("matches").innerText = "Error fetching matches.";
      console.error(err);
    });
}

function fetchLiveFootball() {
  const apiKey = "lxjrKACRVgwh2PKZGKWgotKmnp3DHbaIVPXAUBjfE5WtoyXQrowTs41jK0M6";
  const url = `https://football.sportmonks.com/api/v2.0/livescores?api_token=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("footballMatches");
      container.innerHTML = "";

      if (data.data.length === 0) {
        container.innerHTML = "No live football matches.";
        return;
      }

      data.data.forEach(match => {
        const el = document.createElement("div");
        el.innerHTML = `<strong>${match.league.name}</strong><br>${match.localteam.name} vs ${match.visitorteam.name}`;
        el.style.marginBottom = "1rem";
        container.appendChild(el);
      });
    })
    .catch(err => {
      document.getElementById("footballMatches").innerText = "Error loading football.";
      console.error(err);
    });
}

function searchOldMatches() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const result = document.getElementById("oldResults");
  const apiKey = "lxjrKACRVgwh2PKZGKWgotKmnp3DHbaIVPXAUBjfE5WtoyXQrowTs41jK0M6";

  result.innerHTML = "Searching...";

  let url = "";
  if (currentSport === "cricket") {
    url = `https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=${apiKey}&search=${keyword}`;
  } else {
    url = `https://football.sportmonks.com/api/v2.0/fixtures?api_token=${apiKey}&search=${keyword}`;
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      result.innerHTML = "";
      if (!data.data || data.data.length === 0) {
        result.innerHTML = "No matches found.";
        return;
      }

      data.data.forEach(match => {
        const el = document.createElement("div");
        el.innerHTML = `<strong>${match.league?.name || 'League'}</strong><br>${match.localteam?.name || 'Team A'} vs ${match.visitorteam?.name || 'Team B'}<br>Date: ${match.starting_at}`;
        el.style.marginBottom = "1rem";
        result.appendChild(el);
      });
    })
    .catch(err => {
      result.innerText = "Error fetching old matches.";
      console.error(err);
    });
}
