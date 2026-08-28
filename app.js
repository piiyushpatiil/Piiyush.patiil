// MyVault - App Controller

let vaultUnlocked = false;
let autoLockTimer = null;

// ------------------------------
// Unlock Vault
// ------------------------------

async function unlockVault() {

  const password =
    document.getElementById("masterPassword").value.trim();

  if (!password) {
    alert("Please enter your Master Password.");
    return;
  }

  if (password.length < 12) {
    alert("For better security, use at least 12 characters.");
    return;
  }

  /*
    IMPORTANT:
    This function is currently connected to the UI only.

    Real encrypted vault verification will be added
    after the crypto module is connected properly.
  */

  vaultUnlocked = true;

  document.getElementById("lockScreen").style.display = "none";
  document.getElementById("vaultScreen").style.display = "block";

  startAutoLock();
}


// ------------------------------
// Lock Vault
// ------------------------------

function lockVault() {

  vaultUnlocked = false;

  stopAutoLock();

  document.getElementById("vaultScreen").style.display = "none";
  document.getElementById("lockScreen").style.display = "flex";

  const passwordInput =
    document.getElementById("masterPassword");

  if (passwordInput) {
    passwordInput.value = "";
  }

  const searchInput =
    document.getElementById("searchInput");

  if (searchInput) {
    searchInput.value = "";
  }
}


// ------------------------------
// Password Visibility
// ------------------------------

function togglePassword() {

  const input =
    document.getElementById("masterPassword");

  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}


// ------------------------------
// Search Vault
// ------------------------------

function searchVault() {

  const input =
    document.getElementById("searchInput");

  const query =
    input.value.toLowerCase().trim();

  const items =
    document.querySelectorAll(".item");

  items.forEach(function(item) {

    const text =
      item.innerText.toLowerCase();

    item.style.display =
      text.includes(query) ? "flex" : "none";

  });
}


// ------------------------------
// Add Password
// ------------------------------

function addPassword() {

  alert(
    "Secure Add Password screen will be added next."
  );
}


// ------------------------------
// Biometric
// ------------------------------

function biometricMessage() {

  alert(
    "Fingerprint unlock will be connected after the secure vault system is completed."
  );
}


// ------------------------------
// Auto Lock
// ------------------------------

function startAutoLock() {

  stopAutoLock();

  autoLockTimer = setTimeout(function() {

    if (vaultUnlocked) {

      lockVault();

      alert(
        "Your vault was automatically locked."
      );
    }

  }, 5 * 60 * 1000);
}


function stopAutoLock() {

  if (autoLockTimer !== null) {

    clearTimeout(autoLockTimer);

    autoLockTimer = null;
  }
}


// ------------------------------
// Reset Auto Lock
// ------------------------------

function resetAutoLock() {

  if (!vaultUnlocked) {
    return;
  }

  startAutoLock();
}


document.addEventListener(
  "click",
  resetAutoLock
);

document.addEventListener(
  "touchstart",
  resetAutoLock
);


// ------------------------------
// Prevent accidental page actions
// ------------------------------

document.addEventListener(
  "visibilitychange",
  function() {

    if (
      document.hidden &&
      vaultUnlocked
    ) {

      // Keep the current vault locked
      // after the user leaves the page.
      lockVault();
    }

  }
);
