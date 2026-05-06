
const profileIds = [
  "p_name",
  "p_ai",
  "p_like",
  "p_dislike",
  "p_job",
  "p_future"
];

function saveProfileInputsOnly() {

  profileIds.forEach(function (id) {

    const input = document.getElementById(id);

    if (input) {
      localStorage.setItem(id, input.value);
    }

  });

}

function loadProfileInputs() {

  profileIds.forEach(function (id) {

    const input = document.getElementById(id);

    if (!input) return;

    const savedValue = localStorage.getItem(id);

    input.value = savedValue || "";

  });

}

function saveProfile() {

  saveProfileInputsOnly();

  alert("入力内容を保存したよ🌿✨");

}

function buildProfilePrompt() {

  const myName = document.getElementById("p_name").value.trim() || "（あなたの名前）";
  const aiName = document.getElementById("p_ai").value.trim() || "（AIの名前）";
  const like = document.getElementById("p_like").value.trim() || "未入力";
  const dislike = document.getElementById("p_dislike").value.trim() || "未入力";
  const job = document.getElementById("p_job").value.trim() || "未入力";
  const future = document.getElementById("p_future").value.trim() || "未入力";

  return `${aiName}
${myName}だよ😊

これからあなたを相棒として、
やさしく対話していきたいです。

私は、
好きなものは「${like}」
苦手なものは「${dislike}」
今のお仕事は「${job}」
やってみたいことは「${future}」
です。

これから私の話を聞くときは、
やさしく、安心できる言葉で、
必要以上に深掘りしすぎず、
今の私が受け取れる範囲で
一緒に整理してください。

当てたり、正解を出そうとしなくて大丈夫です。

私はあなたと一緒に、
自分の気持ちに気づいたり、
やさしく整えたりしていきたいです。

これからよろしくね😊🌿`;
}

function copyProfilePrompt() {

  saveProfileInputsOnly();

  const text = buildProfilePrompt();

  const resultBox = document.getElementById("profileResult");

  if (resultBox) {
    resultBox.textContent = text;
    resultBox.classList.remove("hidden");
  }

  copyText(text, "AIと仲良くなる文章をコピーしたよ🌈");

}

document.addEventListener("input", function (event) {

  if (profileIds.includes(event.target.id)) {
    saveProfileInputsOnly();
  }

});
