const startDate = new Date("2025-08-14");
const daysEl = document.getElementById("days");
const titleEl = document.getElementById("title");
const subtitleEl = document.getElementById("subtitle");
const background = document.getElementById("background");

const settingsPanel = document.getElementById("settingsPanel");
const settingsBtn = document.getElementById("settingsBtn");
const saveBtn = document.getElementById("saveBtn");
const closeBtn = document.getElementById("closeBtn");

const titleInput = document.getElementById("titleInput");
const subtitleInput = document.getElementById("subtitleInput");
const color1Input = document.getElementById("color1");
const color2Input = document.getElementById("color2");

function updateDays() {
  const now = new Date();
  const diff = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
  daysEl.textContent = diff;
}

function loadSettings() {
  const saved = JSON.parse(localStorage.getItem("timerSettings") || "{}");
  if (saved.title) titleEl.textContent = saved.title;
  if (saved.subtitle) subtitleEl.textContent = saved.subtitle;
  if (saved.color1 && saved.color2) {
    background.style.background = `linear-gradient(to right, ${saved.color1}, ${saved.color2})`;
    color1Input.value = saved.color1;
    color2Input.value = saved.color2;
  }
}

function saveSettings() {
  const settings = {
    title: titleInput.value,
    subtitle: subtitleInput.value,
    color1: color1Input.value,
    color2: color2Input.value
  };
  localStorage.setItem("timerSettings", JSON.stringify(settings));
  titleEl.textContent = settings.title;
  subtitleEl.textContent = settings.subtitle;
  background.style.background = `linear-gradient(to right, ${settings.color1}, ${settings.color2})`;
  settingsPanel.classList.add("hidden");
}

settingsBtn.addEventListener("click", () => {
  titleInput.value = titleEl.textContent;
  subtitleInput.value = subtitleEl.textContent;
  settingsPanel.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  settingsPanel.classList.add("hidden");
});

saveBtn.addEventListener("click", saveSettings);

updateDays();
loadSettings();
setInterval(updateDays, 1000 * 60 * 60); // 每小时更新一次