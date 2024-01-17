var cookietxt = document.getElementById("cookietxt");
var cookieAmount = 0;
var clicks = 1;

function addcookie() {
  cookieAmount += clicks;
  cookietxt.innerHTML = cookieAmount + " Cookies";
}

function upgradeClicks() {
  if (cookieAmount == 50) {
    cookieAmount -= 50;
    cookietxt.innerHTML = cookieAmount + " Cookies";
    clicks += 1;
  }
  
  if (cookieAmount >= 50) {
    cookieAmount -= 50;
    cookietxt.innerHTML = cookieAmount + " Cookies";
    clicks += 1;
  }
}