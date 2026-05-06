function hideAllSections() {

  document.getElementById("coverSection").classList.add("hidden");
  document.getElementById("howtoSection").classList.add("hidden");
  document.getElementById("talkSection").classList.add("hidden");
  document.getElementById("profileSection").classList.add("hidden");
  document.getElementById("selfMessageSection").classList.add("hidden");
  document.getElementById("clientMessageSection").classList.add("hidden");

}

function scrollTopSmooth() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function backToCover() {

  hideAllSections();

  document
    .getElementById("coverSection")
    .classList.remove("hidden");

  scrollTopSmooth();

}

function showHowtoSection() {

  hideAllSections();

  document
    .getElementById("howtoSection")
    .classList.remove("hidden");

  scrollTopSmooth();

}

function showTalkSection() {

  hideAllSections();

  document
    .getElementById("talkSection")
    .classList.remove("hidden");

  scrollTopSmooth();

}

function showProfileSection() {

  hideAllSections();

  document
    .getElementById("profileSection")
    .classList.remove("hidden");

  if (typeof loadProfileInputs === "function") {
    loadProfileInputs();
  }

  scrollTopSmooth();

}

function showSelfMessageSection() {

  hideAllSections();

  document
    .getElementById("selfMessageSection")
    .classList.remove("hidden");

  if (typeof renderSelfQuestions === "function") {
    renderSelfQuestions();
  }

  scrollTopSmooth();

}

function showClientMessageSection() {

  hideAllSections();

  document
    .getElementById("clientMessageSection")
    .classList.remove("hidden");

  scrollTopSmooth();

}

async function copyText(text, successMessage = "コピーしたよ🌈") {

  try {

    await navigator.clipboard.writeText(text);

    alert(successMessage);

  } catch (error) {

    alert("コピーできなかったので、もう一度試してみてね🐾");

  }

}

window.onload = function () {

  if (typeof loadProfileInputs === "function") {
    loadProfileInputs();
  }

};
