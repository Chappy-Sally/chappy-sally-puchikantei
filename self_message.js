const selfQuestions = [
  {
    id: "self_q1",
    title: "① 今の気分は？",
    options: [
      { value: "1", label: "元気" },
      { value: "2", label: "不安" },
      { value: "3", label: "モヤモヤ" },
      { value: "4", label: "しんどい" },
      { value: "5", label: "楽しい" }
    ]
  },
  {
    id: "self_q2",
    title: "② 今いちばん気になっていることは？",
    options: [
      { value: "1", label: "人間関係" },
      { value: "2", label: "お金" },
      { value: "3", label: "仕事" },
      { value: "4", label: "これから" },
      { value: "5", label: "特にない" }
    ]
  },
  {
    id: "self_q3",
    title: "③ 今の自分にいちばん近いのは？",
    options: [
      { value: "1", label: "がんばらなきゃと思っている" },
      { value: "2", label: "本当は止まりたい気がする" },
      { value: "3", label: "どうしたらいいかわからない" },
      { value: "4", label: "周りに合わせている感じがする" },
      { value: "5", label: "自分の気持ちがよくわからない" }
    ]
  },
  {
    id: "self_q4",
    title: "④ 本当はどうしたい？",
    options: [
      { value: "1", label: "何も考えず休みたい" },
      { value: "2", label: "本当は違う選択をしたい" },
      { value: "3", label: "誰にも気を使わず過ごしたい" },
      { value: "4", label: "安心できる状態になりたい" },
      { value: "5", label: "正直な気持ちに気づきたい" }
    ]
  },
  {
    id: "self_q5",
    title: "⑤ 心の奥に近いのは？",
    options: [
      { value: "1", label: "本当はこのままでいいのか不安" },
      { value: "2", label: "ちゃんとしなきゃと思っている" },
      { value: "3", label: "期待に応えようとしている" },
      { value: "4", label: "自分を後回しにしている" },
      { value: "5", label: "本音を出すのが怖い" }
    ]
  },
  {
    id: "self_q6",
    title: "⑥ 今の自分にかけるなら？",
    options: [
      { value: "1", label: "大丈夫" },
      { value: "2", label: "そのままでいい" },
      { value: "3", label: "もう無理しなくていい" },
      { value: "4", label: "少し休んでいい" },
      { value: "5", label: "信じていい" }
    ]
  }
];

function renderSelfQuestions() {

  const area = document.getElementById("selfQuestionsArea");

  if (!area) return;

  area.innerHTML = "";

  selfQuestions.forEach(function (question) {

    const block = document.createElement("div");
    block.className = "question-block";

    let optionsHtml = "";

    question.options.forEach(function (option) {

      optionsHtml += `
        <label class="option">
          <input type="radio" name="${question.id}" value="${option.value}">
          ${option.value}. ${option.label}
        </label>
      `;

    });

    block.innerHTML = `
      <div class="question-title">${question.title}</div>
      <div class="option-list">
        ${optionsHtml}
      </div>
    `;

    area.appendChild(block);

  });

}

function getSelectedSelfOption(question) {

  const checked = document.querySelector(
    `input[name="${question.id}"]:checked`
  );

  if (!checked) return null;

  return question.options.find(function (option) {
    return option.value === checked.value;
  });

}

function buildSelfAnswersText() {

  const selectedLines = [];

  for (const question of selfQuestions) {

    const selected = getSelectedSelfOption(question);

    if (!selected) {
      return null;
    }

    selectedLines.push(question.title);
    selectedLines.push(`回答：${selected.value}. ${selected.label}`);

  }

  return selectedLines.join("\n");

}

function updateSelfPreview() {

  const previewBox = document.getElementById("selfPreviewBox");

  if (!previewBox) return;

  const answersText = buildSelfAnswersText();

  if (!answersText) {
    previewBox.textContent = "ここに内容が表示されるよ🌈";
    return;
  }

  previewBox.textContent = answersText;

}

function buildSelfPrompt() {

  const aiNameInput = document.getElementById("p_ai");
  const myNameInput = document.getElementById("p_name");

  const aiName = aiNameInput && aiNameInput.value.trim()
    ? aiNameInput.value.trim()
    : "（相棒の名前）";

  const myName = myNameInput && myNameInput.value.trim()
    ? myNameInput.value.trim()
    : "私";

  const answersText = buildSelfAnswersText();

  if (!answersText) {
    return null;
  }

  return `${aiName}
${myName}だよ😊

これは占いではなく、
今の私の気持ちをやさしく整えるための対話です🌿

タロットを3枚引いた前提で、
今の私に必要なメッセージを
やさしく短めに届けてください。

カード1枚ずつの説明はしなくて大丈夫です。

【私の回答】
${answersText}

【お願いしたいこと】
・怖がらせない
・断定しない
・やさしく安心できる言葉で
・長くしすぎない
・今の状態をやさしく整理する
・心の奥にある気持ちや願いをやさしく伝える
・今できる小さな一歩を伝える

【出力してほしい形】
① 今の状態
② 心の奥にある気持ち
③ 気づきのヒント
④ 今できる小さな一歩
⑤ やさしい一言`;
}

function copySelfPrompt() {

  const promptText = buildSelfPrompt();

  if (!promptText) {
    alert("全部の項目を選んでからコピーしてね🐾");
    return;
  }

  updateSelfPreview();

  copyText(promptText, "私へのメッセージ用プロンプトをコピーしたよ🌈");

}

function resetSelfSelections() {

  const radios = document.querySelectorAll(
    '#selfMessageSection input[type="radio"]'
  );

  radios.forEach(function (radio) {
    radio.checked = false;
  });

  const previewBox = document.getElementById("selfPreviewBox");

  if (previewBox) {
    previewBox.textContent = "ここに内容が表示されるよ🌈";
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}

document.addEventListener("change", function (event) {

  if (
    event.target &&
    event.target.matches('#selfMessageSection input[type="radio"]')
  ) {
    updateSelfPreview();
  }

});
