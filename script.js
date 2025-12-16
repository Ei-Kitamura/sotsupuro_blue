const quiz = [
  {
    word: "edit",
    choices: ["を映す", "を編集する", "を投げる", "を選ぶ"],
    answer: 1
  },
  {
    word: "complain",
    choices: ["不平を言う", "コンプレックス", "キャンペーン", "普通の"],
    answer: 0
  },
  {
    word: "ingredient",
    choices: ["質量", "無機物", "化合物", "材料"],
    answer: 3
  },
  {
    word: "invention",
    choices: ["上昇", "サスペンション", "椅子", "発明"],
    answer: 3
  },
  {
    word: "donate",
    choices: ["を寄付する", "支配する", "ドーナツ", "を持つ"],
    answer: 0
  },
  {
    word: "shape",
    choices: ["剃る", "を強制する", "を形作る", "殻"],
    answer: 2
  },
  {
    word: "electricity",
    choices: ["魔法", "スマートタウン", "選挙", "電気"],
    answer: 3
  },
  {
    word: "own",
    choices: ["柔らかい", "を所有している", "家", "毎日"],
    answer: 1
  },
  {
    word: "eventually",
    choices: ["結局", "たまに", "さすがに", "最初は"],
    answer: 0
  },
  {
    word: "real-estate",
    choices: ["本物の", "時刻通りの", "不動産の", "実世界の"],
    answer: 2
  }
];

let current = 0;
let score = 0;
let answered = false;

// ★ 追加：開始時間と終了時間
let startTime;
let endTime;

const question = document.getElementById("question");
const buttons = document.querySelectorAll(".choice");
const result = document.getElementById("result");
const questionNumber = document.getElementById("questionNumber");

function loadQuiz() {
  // 最初の問題が読み込まれたときに時間計測開始
  if (current === 0) {
    startTime = new Date();
  }

  result.innerText = "";
  answered = false;

  question.innerText = quiz[current].word;
  questionNumber.innerText = `第 ${current + 1} 問 / ${quiz.length} 問`;

  buttons.forEach((btn, index) => {
    btn.innerText = quiz[current].choices[index];
    btn.disabled = false;
  });
}

function checkAnswer(index) {
  answered = true;
  buttons.forEach(btn => btn.disabled = true);

  if (index === quiz[current].answer) {
    result.innerText = "⭕ 正解！";
    score++;
  } else {
    result.innerText = "✖️ 不正解！";
  }
}

function nextQuestion() {

  // ★ 未回答のとき確認する
  if (!answered) {
    const goNext = confirm("まだ回答していません。本当に次の問題に進みますか？");

    if (!goNext) {
      return;
    }

    result.innerText = "✖️ 未回答";
  }

  current++;

  if (current >= quiz.length) {
    endTime = new Date();
    showResult();
    return;
  }

  loadQuiz();
}

function showResult() {
  const timeDiff = Math.floor((endTime - startTime) / 1000); // 秒
  const minutes = Math.floor(timeDiff / 60);
  const seconds = timeDiff % 60;

  question.innerText = "クイズ終了！";
  questionNumber.innerText = "";
  document.getElementById("choices").style.display = "none";

  result.innerText =
    `あなたの結果：${quiz.length} 問中 ${score} 問正解 🎉\n` +
    `所要時間：${minutes} 分 ${seconds} 秒`;

  document.getElementById("nextBtn").style.display = "none";
}

loadQuiz();
