/* eslint-disable no-alert */
// eslint-disable-next-line import/extensions
import { muteBGM, muteSE, play, sound } from "./soundSettings";

const total = {
  usagi: 0,
  kuma: 0,
  risu: 0,
  aja: 0,
  tori: 0,
  tairyou: 0,
};
const current = {
  usagi: 0,
  kuma: 0,
  risu: 0,
  aja: 0,
  tori: 0,
};
let tairyou = 0;
let notCarmen = 0;
let tairyouCount = 1;
let staffRollCount = 1;
let playTime: number;
let infotext: string;
const usaran = [
  "image/usa (1).png",
  "image/usa (2).png",
  "image/usa (3).png",
  "image/usa (4).png",
  "image/usa (5).png",
  "image/usa (6).png",
  "image/usa (7).png",
];
let usasrc;
// データ読み込み
let launchTimes = Number(localStorage.getItem("launchTimes"));

const launchTime = Math.floor(Date.now() / 1000);

function fadeOutInfo() {
  $("#info").fadeOut("slow");
  infotext = "";
}

function showInfo() {
  const info = document.getElementById("info");
  if (info !== null) {
    info.innerHTML = infotext;
  }
  setTimeout(fadeOutInfo, 5000);
}

/// /初回プレイの場合
if (!localStorage.getItem("launchTimes")) {
  localStorage.clear();
  localStorage.setItem("launchTimes", "1");
  localStorage.setItem("total.usagi", "0");
  localStorage.setItem("total.kuma", "0");
  localStorage.setItem("total.risu", "0");
  localStorage.setItem("total.aja", "0");
  localStorage.setItem("total.tori", "0");
  total.usagi = 0;
  total.kuma = 0;
  total.risu = 0;
  total.aja = 0;
  total.tori = 0;
  launchTimes = 1;
  infotext = "初回プレイです";
  document.addEventListener("DOMContentLoaded", showInfo);
} else {
  /// /二回目以降の場合
  total.usagi = Number(localStorage.getItem("total.usagi"));
  total.kuma = Number(localStorage.getItem("total.kuma"));
  total.risu = Number(localStorage.getItem("total.risu"));
  total.aja = Number(localStorage.getItem("total.aja"));
  total.tori = Number(localStorage.getItem("total.tori"));
  total.tairyou = Number(localStorage.getItem("total.tairyou"));
  if (Number(localStorage.getItem("usapri")) !== 1) {
    launchTimes += 1;
    localStorage.setItem("launchTimes", launchTimes.toString());
    infotext = `${launchTimes}回目のプレイです`;
  } else {
    infotext = "あなたはうさプリに入れられました";
  }
  infotext = `${infotext}<br>\n今まで累計${Number(
    localStorage.getItem("total.usagi")
  )}匹のうさぎを増やしました`;
  if (total.kuma >= 1) {
    infotext = `${infotext}<br>\n今まで累計${Number(
      localStorage.getItem("total.kuma")
    )}匹のくまを見つけました`;
  }
  if (total.risu >= 1) {
    infotext = `${infotext}<br>\n今まで累計${Number(
      localStorage.getItem("total.risu")
    )}匹のりすを見つけました`;
  }
  if (total.aja >= 1) {
    infotext = `${infotext}<br>\n今まで累計${Number(
      localStorage.getItem("total.aja")
    )}匹のあじゃを見つけました`;
  }
  document.addEventListener("DOMContentLoaded", showInfo);
}
if (localStorage.getItem("total.tairyou") === null) {
  localStorage.setItem("total.tairyou", "0");
  total.tairyou = Number(localStorage.getItem("total.tairyou"));
}
if (localStorage.getItem("usapriTimes") === null) {
  localStorage.setItem("usapriTimes", "0");
}
if (localStorage.getItem("playTime") === null) {
  localStorage.setItem("playTime", "0");
  playTime = Number(localStorage.getItem("playTime"));
} else {
  playTime = Number(localStorage.getItem("playTime"));
}

function dataSave() {
  localStorage.setItem(
    "total.usagi",
    (Number(localStorage.getItem("total.usagi")) + current.usagi).toString()
  );
  localStorage.setItem(
    "total.kuma",
    (Number(localStorage.getItem("total.kuma")) + current.kuma).toString()
  );
  localStorage.setItem(
    "total.risu",
    (Number(localStorage.getItem("total.risu")) + current.risu).toString()
  );
  localStorage.setItem(
    "total.aja",
    (Number(localStorage.getItem("total.aja")) + current.aja).toString()
  );
  localStorage.setItem(
    "total.tairyou",
    (Number(localStorage.getItem("total.tairyou")) + tairyou).toString()
  );
  localStorage.setItem(
    "playTime",
    (playTime + Math.floor(Date.now() / 1000) - launchTime).toString()
  );
}

// データ保存
window.addEventListener("pagehide", dataSave);

function displayScore() {
  const nowTime = Math.floor(Date.now() / 1000);
  let score =
    Math.round(((total.usagi + current.usagi) / launchTimes) * 10) / 10;
  score +=
    (Math.round(((total.kuma + current.kuma) / launchTimes) * 10) / 10) * 100;
  score +=
    (Math.round(((total.risu + current.risu) / launchTimes) * 10) / 10) * 100;
  score +=
    (Math.round(((total.aja + current.aja) / launchTimes) * 10) / 10) * 2000;
  score += (total.tori + current.tori) * 10;
  score += Number(localStorage.getItem("usapriTimes")) * 1000;
  score += (total.tairyou + tairyou) * 100;
  score =
    (score * (Number(localStorage.getItem("totalAchievement")) + 10)) / 10;
  score =
    (score * (Math.round((playTime + nowTime - launchTime) / 60) + 10)) / 10;
  score = Math.round(score);
  const status = document.getElementById("status");
  if (status !== null) {
    status.innerHTML =
      `累計プレイ回数 : ${launchTimes}回<br>\n` +
      `累計プレイ時間 : ${playTime + nowTime - launchTime}秒<br>\n` +
      `累計うさぎ増やし数 : ${total.usagi + current.usagi}匹<br>\n` +
      `累計くま発見数 : ${total.kuma + current.kuma}匹<br>\n` +
      `累計りす発見数 : ${total.risu + current.risu}匹<br>\n` +
      `累計あじゃ発見数 : ${total.aja + current.aja}匹<br>\n${
        total.tori + current.tori >= 1
          ? `累計鳥になった回数 : ${total.tori + current.tori}回<br>\n`
          : ""
      }${
        Number(localStorage.getItem("usapriTimes")) >= 1
          ? `累計うさプリ収監回数 : ${localStorage.getItem(
              "usapriTimes"
            )}回<br>\n`
          : ""
      }${
        total.tairyou + tairyou >= 1
          ? `累計大漁回数 : ${total.tairyou + tairyou}回<br>\n`
          : ""
      }1プレイでの平均うさぎ増やし数 : ${
        Math.round(((total.usagi + current.usagi) / launchTimes) * 10) / 10
      }匹<br>\n` +
      `1プレイでの平均くま発見数 : ${
        Math.round(((total.kuma + current.kuma) / launchTimes) * 10) / 10
      }匹<br>\n` +
      `1プレイでの平均りす発見数 : ${
        Math.round(((total.risu + current.risu) / launchTimes) * 10) / 10
      }匹<br>\n` +
      `1プレイでの平均あじゃ発見数 : ${
        Math.round(((total.aja + current.aja) / launchTimes) * 10) / 10
      }匹<br>\nスコア : ${score}点<br>\n`;
  }
}

// BGM流す
sound.soundis5.volume = 0.5;
sound.soundis8.volume = 0.5;
sound.soundis1.loop = true;
sound.soundis5.loop = true;
sound.soundis8.loop = true;
if (localStorage.getItem("usapri") === "1") {
  sound.soundis8.play();
} else {
  sound.soundis5.play();
}

function setNotCarmen() {
  notCarmen = 1;
}

function playKo() {
  if (localStorage.getItem("usapri") === "1") {
    sound.soundis7.play();
    alert("ダメです");
  } else {
    play(sound.soundis5);
  }
}

function playCa() {
  if (localStorage.getItem("usapri") === "1") {
    sound.soundis7.play();
    alert("ダメです");
  } else {
    play(sound.soundis1);
  }
}

function playHi() {
  if (localStorage.getItem("usapriTimes") === "0") {
    sound.soundis7.play();
    alert("聴いたことがないのでダメです");
  } else {
    play(sound.soundis8);
  }
}

const version = document.getElementById("version");
if (version !== null) {
  version.innerHTML = "ver.1.1.1β";
}

function showCredit() {
  $("#credit").fadeToggle();
}

function returnFalse() {
  return false;
}

window.addEventListener("keydown", returnFalse);

// 初期化
if (localStorage.getItem("usapri") === "1") {
  window.location.href = "usapri.html";
}

if (localStorage.getItem("mute") === "1") {
  sound.soundis1.volume = 0;
  sound.soundis2.volume = 0;
  sound.soundis3.volume = 0;
  sound.soundis4.volume = 0;
  sound.soundis5.volume = 0;
  sound.soundis6.volume = 0;
  sound.soundis7.volume = 0;
  sound.soundis8.volume = 0;
}

function clickTori() {
  sound.soundis7.play();
  alert("できません");
  if (localStorage.getItem("total.tori") === null) {
    localStorage.setItem("total.tori", "1");
  } else {
    localStorage.setItem(
      "total.tori",
      (Number(localStorage.getItem("total.tori")) + 1).toString()
    );
  }
  current.tori += 1;
  if (current.tori >= 5) {
    localStorage.setItem(
      "usapriTimes",
      (Number(localStorage.getItem("usapriTimes")) + 1).toString()
    );
    alert("鳥になりすぎです");
    window.location.href = "usapri.html";
    localStorage.setItem("usapri", "1");
  }
}

// ボタンクリック
function usafuya() {
  sound.soundis2.currentTime = 0;
  sound.soundis2.play();
  const sW = Math.floor(Math.random() * window.innerWidth + 60) - 30;
  const sH = Math.floor(Math.random() * window.innerHeight + 100) - 50;
  const random20 = Math.floor(Math.random() * 21);
  const random100 = Math.floor(Math.random() * 101);
  switch (random100) {
    case 0:
      usasrc = "image/risu.png";
      current.risu += 1;
      break;
    case 1:
      usasrc = "image/kuma.png";
      current.kuma += 1;
      break;
    case 2:
      switch (random20) {
        case 0:
          sound.soundis6.currentTime = 0;
          sound.soundis6.play();
          usasrc = "image/aja.png";
          current.aja += 1;
          break;
        default:
          usasrc = usaran[Math.floor(Math.random() * usaran.length)];
          current.usagi += 1;
          break;
      }
      break;
    default:
      usasrc = usaran[Math.floor(Math.random() * usaran.length)];
      current.usagi += 1;
      break;
  }
  const createImg = document.createElement("img");
  createImg.setAttribute("src", usasrc);
  createImg.setAttribute("style", `position:fixed; top:${sH}px; left:${sW}px;`);
  document.body.appendChild(createImg);
}
// 0.1秒毎に状態チェック

let redrawCount = 1;

function redrawButton() {
  const initialButton = document.getElementById("1");
  // うさぎが500匹を超える毎にボタン再描画
  if (current.usagi >= 500 * redrawCount) {
    const createButton = document.createElement("button");
    const newButtonId = redrawCount + 1;
    createButton.setAttribute("id", newButtonId.toString());
    if (initialButton) {
      createButton.setAttribute(
        "style",
        `font-size:500%; position:fixed; top:${initialButton.offsetTop}px; left:${initialButton.offsetLeft}px;`
      );
    }
    createButton.innerHTML = "うさぎを増やす";
    document.body.appendChild(createButton);
    const newButton = document.getElementById(newButtonId.toString());
    if (newButton !== null) {
      newButton.addEventListener("click", usafuya);
    }
    redrawCount += 1;
  }
}

function showStatus() {
  let u = `${current.usagi}匹のうさぎがいます`;
  if (current.kuma >= 1) {
    u = `${u}<br>\n${current.kuma}匹のくまがいます`;
  }
  if (current.risu >= 1) {
    u = `${u}<br>\n${current.risu}匹のりすがいます`;
  }
  if (current.aja >= 1) {
    u = `${u}<br>\n${current.aja}匹のあじゃがいます`;
  }

  const usa = document.getElementById("usa");
  if (usa !== null) {
    usa.innerHTML = u;
  }
  // うさぎが10000匹を超えた場合ジュピターを流してスタッフロールを表示
  if (current.usagi >= 10000 * staffRollCount) {
    play(sound.soundis3);
    const creimg = document.createElement("img");
    creimg.setAttribute("src", "image/staff.png");
    creimg.setAttribute("id", "staff");
    creimg.setAttribute(
      "style",
      "text-align:center; position:fixed; bottom:0px; left:200px;z-index:9999;opacity:0.9; max-width:50%;margin:0 auto;"
    );
    document.body.appendChild(creimg);
    $("#staff").animate(
      {
        top: "50px",
      },
      400
    );
    staffRollCount += 1;
    tairyouCount += 1;
    // うさぎが1000匹を超える毎に大漁を表示しカルメン組曲を再生
  } else if (current.usagi >= 2 * tairyouCount) {
    if (notCarmen !== 1) {
      play(sound.soundis1);
    }
    const creimg = document.createElement("img");
    creimg.setAttribute("src", "image/tairyou.png");
    creimg.setAttribute("style", "position:fixed; bottom:10px; right:10px;");
    document.body.appendChild(creimg);
    tairyouCount += 1;
    tairyou += 1;
  }
  redrawButton();
}

// 0.1秒毎に状態チェック
function checkAchievement() {
  const nowTime = Math.floor(Date.now() / 1000);
  let achievementList = "";
  let totalAchievement = 0;
  const achievements = [
    {
      condition: total.usagi + current.usagi >= 100,
      number: "achievement1_1",
      description: "累計うさぎ数100匹突破",
      title: "うさぴょんLv.1",
    },
    {
      condition: total.usagi + current.usagi >= 500,
      number: "achievement1_2",
      description: "累計うさぎ数500匹突破",
      title: "うさぴょんLv.2",
    },
    {
      condition: total.usagi + current.usagi >= 1000,
      number: "achievement1_3",
      description: "累計うさぎ数1000匹突破",
      title: "うさぴょんLv.3",
    },
    {
      condition: total.usagi + current.usagi >= 5000,
      number: "achievement1_4",
      description: "累計うさぎ数5000匹突破",
      title: "うさぴょんLv.4",
    },
    {
      condition: total.usagi + current.usagi >= 10000,
      number: "achievement1_5",
      description: "累計うさぎ数10000匹突破",
      title: "うさぴょんLv.5",
    },
    {
      condition: total.kuma + current.kuma >= 1,
      number: "achievement2_1",
      description: "くま発見",
      title: "くまぴょんLv.1",
    },
    {
      condition: total.kuma + current.kuma >= 5,
      number: "achievement2_2",
      description: "累計くま発見数5匹突破",
      title: "くまぴょんLv.2",
    },
    {
      condition: total.kuma + current.kuma >= 10,
      number: "achievement2_3",
      description: "累計くま発見数10匹突破",
      title: "くまぴょんLv.3",
    },
    {
      condition: total.kuma + current.kuma >= 50,
      number: "achievement2_4",
      description: "累計くま発見数50匹突破",
      title: "くまぴょんLv.4",
    },
    {
      condition: total.kuma + current.kuma >= 100,
      number: "achievement2_5",
      description: "累計くま発見数100匹突破",
      title: "くまぴょんLv.5",
    },
    {
      condition: total.risu + current.risu >= 1,
      number: "achievement3_1",
      description: "りす発見",
      title: "トッテナムLv.1",
    },
    {
      condition: total.risu + current.risu >= 5,
      number: "achievement3_2",
      description: "累計りす発見数5匹突破",
      title: "トッテナムLv.2",
    },
    {
      condition: total.risu + current.risu >= 10,
      number: "achievement3_3",
      description: "累計りす発見数10匹突破",
      title: "トッテナムLv.3",
    },
    {
      condition: total.risu + current.risu >= 50,
      number: "achievement3_4",
      description: "累計りす発見数50匹突破",
      title: "トッテナムLv.4",
    },
    {
      condition: total.risu + current.risu >= 100,
      number: "achievement3_5",
      description: "累計りす発見数100匹突破",
      title: "トッテナムLv.5",
    },
    {
      condition: total.aja + current.aja >= 1,
      number: "achievement4_1",
      description: "あじゃ発見",
      title: "あじゃぴょんLv.1",
    },
    {
      condition: total.aja + current.aja >= 3,
      number: "achievement4_2",
      description: "累計あじゃ発見数3匹突破",
      title: "あじゃぴょんLv.2",
    },
    {
      condition: total.aja + current.aja >= 5,
      number: "achievement4_3",
      description: "累計あじゃ発見数5匹突破",
      title: "あじゃぴょんLv.3",
    },
    {
      condition: total.aja + current.aja >= 10,
      number: "achievement4_4",
      description: "累計あじゃ発見数10匹突破",
      title: "あじゃぴょんLv.4",
    },
    {
      condition: total.aja + current.aja >= 30,
      number: "achievement4_5",
      description: "累計あじゃ発見数30匹突破",
      title: "あじゃぴょんLv.5",
    },
    {
      condition: Number(localStorage.getItem("total.tori")) >= 1,
      number: "achievement5_1",
      description: "鳥になった回数1回突破",
      title: "鳥貴族Lv.1",
    },
    {
      condition: Number(localStorage.getItem("total.tori")) >= 5,
      number: "achievement5_2",
      description: "鳥になった回数5回突破",
      title: "鳥貴族Lv.2",
    },
    {
      condition: Number(localStorage.getItem("total.tori")) >= 10,
      number: "achievement5_3",
      description: "鳥になった回数10回突破",
      title: "鳥貴族Lv.3",
    },
    {
      condition: Number(localStorage.getItem("total.tori")) >= 30,
      number: "achievement5_4",
      description: "鳥になった回数30回突破",
      title: "鳥貴族Lv.4",
    },
    {
      condition: Number(localStorage.getItem("total.tori")) >= 50,
      number: "achievement5_5",
      description: "鳥になった回数50回突破",
      title: "鳥貴族Lv.5",
    },
    {
      condition: Number(localStorage.getItem("usapriTimes")) >= 1,
      number: "achievement6_1",
      description: "うさプリ収監",
      title: "うさプリズナーLv.1",
    },
    {
      condition: Number(localStorage.getItem("usapriTimes")) >= 3,
      number: "achievement6_2",
      description: "うさプリ収監3回突破",
      title: "うさプリズナーLv.2",
    },
    {
      condition: Number(localStorage.getItem("usapriTimes")) >= 5,
      number: "achievement6_3",
      description: "うさプリ収監5回突破",
      title: "うさプリズナーLv.3",
    },
    {
      condition: Number(localStorage.getItem("usapriTimes")) >= 10,
      number: "achievement6_4",
      description: "うさプリ収監10回突破",
      title: "うさプリズナーLv.4",
    },
    {
      condition: Number(localStorage.getItem("usapriTimes")) >= 30,
      number: "achievement6_5",
      description: "うさプリ収監30回突破",
      title: "うさプリズナーLv.5",
    },
    {
      condition: playTime + nowTime - launchTime >= 10,
      number: "achievement7_1",
      description: "累計プレイ時間10秒突破",
      title: "うさぴょん中毒Lv.1",
    },
    {
      condition: playTime + nowTime - launchTime >= 60,
      number: "achievement7_2",
      description: "累計プレイ時間60秒突破",
      title: "うさぴょん中毒Lv.2",
    },
    {
      condition: playTime + nowTime - launchTime >= 600,
      number: "achievement7_3",
      description: "累計プレイ時間600秒突破",
      title: "うさぴょん中毒Lv.3",
    },
    {
      condition: playTime + nowTime - launchTime >= 3600,
      number: "achievement7_4",
      description: "累計プレイ時間3600秒突破",
      title: "うさぴょん中毒Lv.4",
    },
    {
      condition: playTime + nowTime - launchTime >= 43200,
      number: "achievement7_5",
      description: "累計プレイ時間43200秒突破",
      title: "うさぴょん中毒Lv.5",
    },
    {
      condition: total.tairyou + tairyou >= 1,
      number: "achievement8_1",
      description: "大漁1回突破",
      title: "大漁Lv.1",
    },
    {
      condition: total.tairyou + tairyou >= 5,
      number: "achievement8_2",
      description: "大漁5回突破",
      title: "大漁Lv.2",
    },
    {
      condition: total.tairyou + tairyou >= 10,
      number: "achievement8_3",
      description: "大漁10回突破",
      title: "大漁Lv.3",
    },
    {
      condition: total.tairyou + tairyou >= 50,
      number: "achievement8_4",
      description: "大漁50回突破",
      title: "大漁Lv.4",
    },
    {
      condition: total.tairyou + tairyou >= 100,
      number: "achievement8_5",
      description: "大漁100回突破",
      title: "大漁Lv.5",
    },
    {
      condition:
        current.usagi === 0 &&
        current.kuma === 0 &&
        current.risu === 0 &&
        current.aja === 1,
      number: "achievement9_1",
      description: "最初にあじゃを出した",
      title: "奇跡のあじゃ",
    },
    {
      condition:
        current.usagi === 0 &&
        current.risu === 0 &&
        current.aja === 0 &&
        current.kuma === 1,
      number: "achievement9_2",
      description: "最初にくまを出した",
      title: "幸運のくま",
    },
    {
      condition:
        current.usagi === 0 &&
        current.kuma === 0 &&
        current.aja === 0 &&
        current.risu === 1,
      number: "achievement9_3",
      description: "最初にりすを出した",
      title: "運命のトッテナム",
    },
    {
      condition:
        current.usagi === 1000 &&
        current.kuma === 0 &&
        current.aja === 0 &&
        current.risu === 0 &&
        Number(localStorage.getItem("usapri")) !== 1,
      number: "achievement9_4",
      description: "うさぎのみで1000匹を達成した",
      title: "うさぴょんプレイヤーの鑑",
    },
    {
      condition: current.usagi >= 10000,
      number: "achievement10_1",
      description: "エンディングを見た",
      title: "Thank you for playing",
    },
    {
      condition: totalAchievement >= 10,
      number: "achievement11_1",
      description: "実績10個解除",
      title: "うさぴょんマスターLv.1",
    },
    {
      condition: totalAchievement >= 20,
      number: "achievement11_2",
      description: "実績20個解除",
      title: "うさぴょんマスターLv.2",
    },
    {
      condition: totalAchievement >= 30,
      number: "achievement11_3",
      description: "実績30個解除",
      title: "うさぴょんマスターLv.3",
    },
    {
      condition: totalAchievement >= 40,
      number: "achievement11_4",
      description: "実績40個解除",
      title: "うさぴょんマスターLv.4",
    },
    {
      condition: totalAchievement >= 49,
      number: "achievement11_5",
      description: "全実績解除",
      title: "Congratulations!",
    },
  ];
  achievements.forEach((achievement) => {
    if (localStorage.getItem(achievement.number) === null) {
      if (!achievement.condition) {
        return false;
      }
      infotext = `<span class="notice">${achievement.description}🐰実績：${achievement.title}解除</span><br>\n${infotext}`;
      localStorage.setItem(achievement.number, "1");
      const info = document.getElementById("info");
      if (info !== null) {
        info.innerHTML = infotext;
      }
      $("#info").show();
      sound.soundis4.play();
      setTimeout(fadeOutInfo, 5000);
    } else {
      achievementList += `<span class="notice">${achievement.title}</span> - ${achievement.description}<br>\n`;
      totalAchievement += 1;
    }
    return false;
  });
  // 実績解除
  localStorage.setItem("totalAchievement", totalAchievement.toString());
  const achievementListElement = document.getElementById("achievement_list");
  if (achievementListElement !== null) {
    achievementListElement.innerHTML = achievementList;
  }
}

function deleteData() {
  if (localStorage.getItem("usapri") === "1") {
    alert("消せません");
  } else {
    const del = window.confirm("全てのデータを初期化します。よろしいですか？");
    if (del) {
      localStorage.clear();
      clearInterval(setInterval(checkAchievement, 10));
      window.location.reload();
    }
  }
}

document.getElementById("mute_se")?.addEventListener("click", muteSE);

document.getElementById("mute_bgm")?.addEventListener("click", muteBGM);

document.getElementById("not_carmen")?.addEventListener("click", setNotCarmen);

document.getElementById("play_ko")?.addEventListener("click", playKo);

document.getElementById("play_ca")?.addEventListener("click", playCa);

document.getElementById("play_hi")?.addEventListener("click", playHi);

document.getElementById("version")?.addEventListener("click", showCredit);

document.getElementById("tori")?.addEventListener("click", clickTori);

document.getElementById("del")?.addEventListener("click", deleteData);

document.getElementById("1")?.addEventListener("click", usafuya);

setInterval(checkAchievement, 1000);

setInterval(displayScore, 1000);

setInterval(showStatus, 100);
