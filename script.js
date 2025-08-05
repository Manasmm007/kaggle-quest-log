const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const progressBar = document.getElementById("progress-bar");

function updateProgress() {
  let total = checkboxes.length;
  let completed = Array.from(checkboxes).filter(box => box.checked).length;
  const percent = Math.round((completed / total) * 100);
  progressBar.style.width = percent + "%";
  progressBar.textContent = percent + "%";
}

// Load saved checkbox states
checkboxes.forEach(box => {
  const id = box.id;
  if (!id) return;
  const saved = localStorage.getItem(id);
  if (saved === "true") box.checked = true;

  box.addEventListener("change", () => {
    localStorage.setItem(id, box.checked);
    updateProgress();
  });
});

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark);
}

// Load dark mode preference
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

// Initial progress update
updateProgress();
