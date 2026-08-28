// MyVault App Controller

let vaultUnlocked = false;

function showVault() {
  document.getElementById("lockScreen").style.display = "none";
  document.getElementById("vaultScreen").style.display = "block";
  vaultUnlocked = true;
}

function hideVault() {
  document.getElementById("vaultScreen").style.display = "none";
  document.getElementById("lockScreen").style.display = "flex";
  vaultUnlocked = false;

  const passwordInput =
    document.getElementById("masterPassword");

  if (passwordInput) {
    passwordInput.value = "";
  }
}

function lockMyVault() {
  hideVault();
}

function searchVault() {
  const searchInput =
    document.getElementById("searchInput");

  const query = searchInput.value.toLowerCase();

  const items = document.querySelectorAll(".item");

  items.forEach(item => {
    const text = item.innerText.toLowerCase();

    item.style.display =
      text.includes(query) ? "flex" : "none";
  });
}

// Auto-lock after 5 minutes of inactivity
let autoLockTimer;

function resetAutoLock() {
  clearTimeout(autoLockTimer);

  if (vaultUnlocked) {
    autoLockTimer = setTimeout(() => {
      hideVault();
      alert("Vault automatically locked.");
    }, 5 * 60 * 1000);
  }
}

document.addEventListener("click", resetAutoLock);
document.addEventListener("touchstart", resetAutoLock);

const searchInput =
  document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", searchVault);
}
