function clearLocalStorage() {
  if (confirm("Weet je zeker dat je de vriendenlijst wilt leegmaken?")) {
    localStorage.clear();
    alert("De vriendenlijst is leeg!");
    // Update de UI na het legen van de localStorage
    renderFriends();
  }
}

function logout() {
  // Optioneel: LocalStorage legen als je dat nodig vindt
  localStorage.clear();

  // Navigeren naar de loginpagina
  window.location.href = "Login.html";
}

function navigateToSingleCall() {
  window.location.href = "SingleCallScreen.html";
}

function navigateToGroupCall() {
  window.location.href = "GroupCallScreen.html";
}

const defaultFriends = [
  {
    name: "Maria B.",
    age: 68,
    interests: "Tuinieren, Lezen",
    online: true,
  },
  {
    name: "Jan P.",
    age: 72,
    interests: "Schaken, Wandelen",
    online: true,
  },
];

let friends = JSON.parse(localStorage.getItem("friends")) || defaultFriends;

function saveFriends() {
  localStorage.setItem("friends", JSON.stringify(friends));
}

const events = [
  {
    title: "Boekenclub",
    date: "2023-11-20",
    time: "15:00",
    location: "Bibliotheek",
    description: "Bespreek een mooi boek met vrienden!",
  },
  {
    title: "Yoga Sessie",
    date: "2023-11-22",
    time: "10:00",
    location: "Sporthal",
    description: "Een rustgevende yogasessie voor iedereen.",
  },
];

function createFriendCard(friend) {
  return `
      <div class="connection-card">
        <div class="icon-wrapper">
          <i class="fas fa-user"></i>
        </div>
        <div class="connection-content">
          <div class="connection-header">${friend.name}</div>
          <div class="connection-interests">${friend.age} jaar - ${friend.interests}</div>
        </div>
      </div>
    `;
}

function createEventCard(event) {
  return `
      <div class="connection-card">
        <div class="icon-wrapper">
          <i class="fas fa-calendar-alt"></i>
        </div>
        <div class="connection-content">
          <div class="connection-header">${event.title}</div>
          <div class="connection-interests">Datum: ${event.date}</div>
          <div class="connection-interests">Tijd: ${event.time}</div>
          <div class="connection-interests">${event.description}</div>
        </div>
      </div>
    `;
}

function switchTab(tab) {
  const container = document.getElementById("connections-container");
  if (tab === "friends") {
    container.innerHTML = friends.map(createFriendCard).join("");
  } else if (tab === "events") {
    container.innerHTML = events.map(createEventCard).join("");
  }
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  document.querySelector(`[data-tab="${tab}"]`).classList.add("active");
}

function filterContent(event) {
  const query = event.target.value.toLowerCase();
  const activeTab = document.querySelector(".tab.active").dataset.tab;

  if (activeTab === "friends") {
    const filteredFriends = friends.filter((friend) =>
      friend.name.toLowerCase().includes(query)
    );
    document.getElementById("connections-container").innerHTML = filteredFriends
      .map(createFriendCard)
      .join("");
  } else if (activeTab === "events") {
    const filteredEvents = events.filter((event) =>
      event.title.toLowerCase().includes(query)
    );
    document.getElementById("connections-container").innerHTML = filteredEvents
      .map(createEventCard)
      .join("");
  }
}

// Initial rendering
switchTab("friends");
