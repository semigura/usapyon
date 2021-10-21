// eslint-disable-next-line import/extensions
import { muteBGM, muteSE, play, sound } from "./soundSettings";

let usagi = 0;
let kuma = 0;
let risu = 0;
let aja = 0;
let tori = 0;
let tairyou = 0;
let notCarmen = 0;
let tairyouCount = 1;
let staffRollCount = 1;
let playTime: number;
let totalTairyou: number;
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
let totalTori: number;
let totalUsagi = 0;
let totalKuma = 0;
let totalRisu = 0;
let totalAja = 0;
// データ読み込み
let launchTimes = Number(localStorage.launchTimes);

const launchTime = Math.floor(Date.now() / 1000);

console.log(localStorage);

console.log(localStorage.achievement7_5);

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
if (!localStorage.launchTimes) {
  localStorage.clear();
  localStorage.setItem("launchTimes", "1");
  localStorage.setItem("totalUsagi", "0");
  localStorage.setItem("totalKuma", "0");
  localStorage.setItem("totalRisu", "0");
  localStorage.setItem("totalAja", "0");
  localStorage.setItem("totalTori", "0");
  totalUsagi = 0;
  totalKuma = 0;
  totalRisu = 0;
  totalAja = 0;
  totalTori = 0;
  launchTimes = 1;
  infotext = "初回プレイです";
  document.addEventListener("DOMContentLoaded", showInfo);
} else {
  /// /二回目以降の場合
  totalUsagi = Number(localStorage.totalUsagi);
  totalKuma = Number(localStorage.totalKuma);
  totalRisu = Number(localStorage.totalRisu);
  totalAja = Number(localStorage.totalAja);
  totalTori = Number(localStorage.totalTori);
  totalTairyou = Number(localStorage.totalTairyou);
  if (localStorage.usapri !== 1) {
    launchTimes += 1;
    localStorage.setItem("launchTimes", launchTimes.toString());
    infotext = `${launchTimes}回目のプレイです`;
  } else {
    infotext = "あなたはうさプリに入れられました";
  }
  infotext = `${infotext}<br>\n今まで累計${Number(
    localStorage.totalUsagi
  )}匹のうさぎを増やしました`;
  if (totalKuma >= 1) {
    infotext = `${infotext}<br>\n今まで累計${Number(
      localStorage.totalKuma
    )}匹のくまを見つけました`;
  }
  if (totalRisu >= 1) {
    infotext = `${infotext}<br>\n今まで累計${Number(
      localStorage.totalRisu
    )}匹のりすを見つけました`;
  }
  if (totalAja >= 1) {
    infotext = `${infotext}<br>\n今まで累計${Number(
      localStorage.totalAja
    )}匹のあじゃを見つけました`;
  }
  document.addEventListener("DOMContentLoaded", showInfo);
}
if (localStorage.getItem("totalTairyou") === null) {
  localStorage.setItem("totalTairyou", "0");
  totalTairyou = Number(localStorage.totalTairyou);
}
if (localStorage.getItem("usapriTimes") === null) {
  localStorage.setItem("usapriTimes", "0");
}
if (localStorage.getItem("playTime") === null) {
  localStorage.setItem("playTime", "0");
  playTime = Number(localStorage.playTime);
} else {
  playTime = Number(localStorage.playTime);
}

function dataSave() {
  let totalUsagin = Number(localStorage.totalUsagi);
  let totalKuman = Number(localStorage.totalKuma);
  let totalRisun = Number(localStorage.totalRisu);
  let totalAjan = Number(localStorage.totalAja);
  let totalTairyoun = Number(localStorage.totalTairyou);
  totalUsagin += usagi;
  totalKuman += kuma;
  totalRisun += risu;
  totalAjan += aja;
  totalTairyoun += tairyou;
  playTime = playTime + Math.floor(Date.now() / 1000) - launchTime;
  localStorage.setItem("totalUsagi", totalUsagin.toString());
  localStorage.setItem("totalKuma", totalKuman.toString());
  localStorage.setItem("totalRisu", totalRisun.toString());
  localStorage.setItem("totalAja", totalAjan.toString());
  localStorage.setItem("totalTairyou", totalTairyoun.toString());
  localStorage.setItem("playTime", playTime.toString());
}

// データ保存
window.addEventListener("pagehide", dataSave);

function displayScore() {
  const nowTime = Math.floor(Date.now() / 1000);
  let score = Math.round(((totalUsagi + usagi) / launchTimes) * 10) / 10;
  score += (Math.round(((totalKuma + kuma) / launchTimes) * 10) / 10) * 100;
  score += (Math.round(((totalRisu + risu) / launchTimes) * 10) / 10) * 100;
  score += (Math.round(((totalAja + aja) / launchTimes) * 10) / 10) * 2000;
  score += (totalTori + tori) * 10;
  score += Number(localStorage.usapriTimes) * 1000;
  score += (totalTairyou + tairyou) * 100;
  score = (score * (Number(localStorage.totalAchievement) + 10)) / 10;
  score =
    (score * (Math.round((playTime + nowTime - launchTime) / 60) + 10)) / 10;
  score = Math.round(score);
  const status = document.getElementById("status");
  if (status !== null) {
    status.innerHTML =
      `累計プレイ回数 : ${launchTimes}回<br>\n` +
      `累計プレイ時間 : ${playTime + nowTime - launchTime}秒<br>\n` +
      `累計うさぎ増やし数 : ${totalUsagi + usagi}匹<br>\n` +
      `累計くま発見数 : ${totalKuma + kuma}匹<br>\n` +
      `累計りす発見数 : ${totalRisu + risu}匹<br>\n` +
      `累計あじゃ発見数 : ${totalAja + aja}匹<br>\n${
        totalTori + tori >= 1
          ? `累計鳥になった回数 : ${totalTori + tori}回<br>\n`
          : ""
      }${
        Number(localStorage.usapriTimes) >= 1
          ? `累計うさプリ収監回数 : ${localStorage.usapriTimes}回<br>\n`
          : ""
      }${
        totalTairyou + tairyou >= 1
          ? `累計大漁回数 : ${totalTairyou + tairyou}回<br>\n`
          : ""
      }1プレイでの平均うさぎ増やし数 : ${
        Math.round(((totalUsagi + usagi) / launchTimes) * 10) / 10
      }匹<br>\n` +
      `1プレイでの平均くま発見数 : ${
        Math.round(((totalKuma + kuma) / launchTimes) * 10) / 10
      }匹<br>\n` +
      `1プレイでの平均りす発見数 : ${
        Math.round(((totalRisu + risu) / launchTimes) * 10) / 10
      }匹<br>\n` +
      `1プレイでの平均あじゃ発見数 : ${
        Math.round(((totalAja + aja) / launchTimes) * 10) / 10
      }匹<br>\nスコア : ${score}点<br>\n`;
  }
}

// 実績表示
function achshow() {
  const info = document.getElementById("info");
  if (info !== null) {
    info.innerHTML = infotext;
  }
  $("#info").show();
  sound.soundis4.play();
  setTimeout(fadeOutInfo, 5000);
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
  if (localStorage.getItem("totalTori") === null) {
    localStorage.setItem("totalTori", "1");
  } else {
    let totalTorin = Number(localStorage.totalTori);
    totalTorin += 1;
    localStorage.setItem("totalTori", totalTorin.toString());
  }
  tori += 1;
  if (tori >= 5) {
    let usapriTimes = Number(localStorage.usapriTimes);
    usapriTimes += 1;
    localStorage.setItem("usapriTimes", usapriTimes.toString());
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
      risu += 1;
      break;
    case 1:
      usasrc = "image/kuma.png";
      kuma += 1;
      break;
    case 2:
      switch (random20) {
        case 0:
          sound.soundis6.currentTime = 0;
          sound.soundis6.play();
          usasrc = "image/aja.png";
          aja += 1;
          break;
        default:
          usasrc = usaran[Math.floor(Math.random() * usaran.length)];
          usagi += 1;
          break;
      }
      break;
    default:
      usasrc = usaran[Math.floor(Math.random() * usaran.length)];
      usagi += 1;
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
  if (usagi >= 500 * redrawCount) {
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
  let u = `${usagi}匹のうさぎがいます`;
  if (kuma >= 1) {
    u = `${u}<br>\n${kuma}匹のくまがいます`;
  }
  if (risu >= 1) {
    u = `${u}<br>\n${risu}匹のりすがいます`;
  }
  if (aja >= 1) {
    u = `${u}<br>\n${aja}匹のあじゃがいます`;
  }

  const usa = document.getElementById("usa");
  if (usa !== null) {
    usa.innerHTML = u;
  }
  // うさぎが10000匹を超えた場合ジュピターを流してスタッフロールを表示
  if (usagi >= 10000 * staffRollCount) {
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
  } else if (usagi >= 2 * tairyouCount) {
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
function achievement() {
  const nowTime = Math.floor(Date.now() / 1000);
  let achievementList = "";
  let totalAchievement = 0;
  function hasAchievement(
    achievementNumber: string,
    achievementTitle: string,
    achievementDescription: string
  ) {
    if (localStorage.getItem(achievementNumber) !== null) {
      achievementList += `<span class="notice">${achievementTitle}</span> - ${achievementDescription}<br>\n`;
      totalAchievement += 1;
    }
  }
  hasAchievement("achievement1_1", "うさぴょんLv.1", "累計うさぎ数100匹突破");
  hasAchievement("achievement1_2", "うさぴょんLv.2", "累計うさぎ数500匹突破");
  hasAchievement("achievement1_3", "うさぴょんLv.3", "累計うさぎ数1000匹突破");
  hasAchievement("achievement1_4", "うさぴょんLv.4", "累計うさぎ数5000匹突破");
  hasAchievement("achievement1_5", "うさぴょんLv.5", "累計うさぎ数10000匹突破");
  hasAchievement("achievement2_1", "くまぴょんLv.1", "くま発見");
  hasAchievement("achievement2_2", "くまぴょんLv.2", "累計くま発見数5匹突破");
  hasAchievement("achievement2_3", "くまぴょんLv.3", "累計くま発見数10匹突破");
  hasAchievement("achievement2_4", "くまぴょんLv.4", "累計くま発見数50匹突破");
  hasAchievement("achievement2_5", "くまぴょんLv.5", "累計くま発見数100匹突破");
  hasAchievement("achievement3_1", "トッテナムLv.1", "りす発見");
  hasAchievement("achievement3_2", "トッテナムLv.2", "累計りす発見数5匹突破");
  hasAchievement("achievement3_3", "トッテナムLv.3", "累計りす発見数10匹突破");
  hasAchievement("achievement3_4", "トッテナムLv.4", "累計りす発見数50匹突破");
  hasAchievement("achievement3_5", "トッテナムLv.5", "累計りす発見数100匹突破");
  hasAchievement("achievement4_1", "あじゃぴょんLv.1", "あじゃ発見");
  hasAchievement(
    "achievement4_2",
    "あじゃぴょんLv.2",
    "累計あじゃ発見数3匹突破"
  );
  hasAchievement(
    "achievement4_3",
    "あじゃぴょんLv.3",
    "累計あじゃ発見数5匹突破"
  );
  hasAchievement(
    "achievement4_4",
    "あじゃぴょんLv.4",
    "累計あじゃ発見数10匹突破"
  );
  hasAchievement(
    "achievement4_5",
    "あじゃぴょんLv.5",
    "累計あじゃ発見数30匹突破"
  );
  hasAchievement("achievement5_1", "鳥貴族Lv.1", "鳥になった回数1回突破");
  hasAchievement("achievement5_2", "鳥貴族Lv.2", "鳥になった回数5回突破");
  hasAchievement("achievement5_3", "鳥貴族Lv.3", "鳥になった回数10回突破");
  hasAchievement("achievement5_4", "鳥貴族Lv.4", "鳥になった回数30回突破");
  hasAchievement("achievement5_5", "鳥貴族Lv.5", "鳥になった回数50回突破");
  hasAchievement("achievement6_1", "うさプリズナーLv.1", "うさプリ収監");
  hasAchievement("achievement6_2", "うさプリズナーLv.2", "うさプリ収監3回突破");
  hasAchievement("achievement6_3", "うさプリズナーLv.3", "うさプリ収監5回突破");
  hasAchievement(
    "achievement6_4",
    "うさプリズナーLv.4",
    "うさプリ収監10回突破"
  );
  hasAchievement(
    "achievement6_5",
    "うさプリズナーLv.5",
    "うさプリ収監30回突破"
  );
  hasAchievement(
    "achievement7_1",
    "うさぴょん中毒Lv.1",
    "累計プレイ時間10秒突破"
  );
  hasAchievement(
    "achievement7_2",
    "うさぴょん中毒Lv.2",
    "累計プレイ時間60秒突破"
  );
  hasAchievement(
    "achievement7_3",
    "うさぴょん中毒Lv.3",
    "累計プレイ時間600秒突破"
  );
  hasAchievement(
    "achievement7_4",
    "うさぴょん中毒Lv.4",
    "累計プレイ時間3600秒突破"
  );
  hasAchievement(
    "achievement7_5",
    "うさぴょん中毒Lv.5",
    "累計プレイ時間43200秒突破"
  );
  hasAchievement("achievement8_1", "大漁Lv.1", "大漁1回突破");
  hasAchievement("achievement8_2", "大漁Lv.2", "大漁5回突破");
  hasAchievement("achievement8_3", "大漁Lv.3", "大漁10回突破");
  hasAchievement("achievement8_4", "大漁Lv.4", "大漁50回突破");
  hasAchievement("achievement8_5", "大漁Lv.5", "大漁100回突破");
  hasAchievement("achievement9_1", "奇跡のあじゃ", "最初にあじゃを出した");
  hasAchievement("achievement9_2", "幸運のくま", "最初にくまを出した");
  hasAchievement("achievement9_3", "運命のトッテナム", "最初にりすを出した");
  hasAchievement(
    "achievement9_4",
    "うさぴょんプレイヤーの鑑",
    "うさぎのみで大漁を達成した"
  );
  hasAchievement(
    "achievement10_1",
    "Thank you for playing",
    "エンディングを見た"
  );
  hasAchievement("achievement11_1", "うさぴょんマスターLv.1", "実績10個解除");
  hasAchievement("achievement11_2", "うさぴょんマスターLv.2", "実績20個解除");
  hasAchievement("achievement11_3", "うさぴょんマスターLv.3", "実績30個解除");
  hasAchievement("achievement11_4", "うさぴょんマスターLv.4", "実績40個解除");
  hasAchievement("achievement11_5", "Congratulations!", "全実績解除");

  // 実績解除
  function setAchievement(
    condition: boolean,
    achievementNumber: string,
    achievementDescription: string,
    achievementTitle: string
  ) {
    if (condition && localStorage.getItem(achievementNumber) === null) {
      infotext = `<span class="notice">${achievementDescription}🐰実績：${achievementTitle}解除</span><br>\n${infotext}`;
      localStorage.setItem(achievementNumber, "1");
      achshow();
    }
  }
  setAchievement(
    totalUsagi + usagi >= 100,
    "achievement1_1",
    "累計うさぎ数100匹突破",
    "うさぴょんLv.1"
  );
  setAchievement(
    totalUsagi + usagi >= 500,
    "achievement1_2",
    "累計うさぎ数500匹突破",
    "うさぴょんLv.2"
  );
  setAchievement(
    totalUsagi + usagi >= 1000,
    "achievement1_3",
    "累計うさぎ数1000匹突破",
    "うさぴょんLv.3"
  );
  setAchievement(
    totalUsagi + usagi >= 5000,
    "achievement1_4",
    "累計うさぎ数5000匹突破",
    "うさぴょんLv.4"
  );
  setAchievement(
    totalUsagi + usagi >= 10000,
    "achievement1_5",
    "累計うさぎ数10000匹突破",
    "うさぴょんLv.5"
  );
  setAchievement(
    totalKuma + kuma >= 1,
    "achievement2_1",
    "くま発見",
    "くまぴょんLv.1"
  );
  setAchievement(
    totalKuma + kuma >= 5,
    "achievement2_2",
    "累計くま発見数5匹突破",
    "くまぴょんLv.2"
  );
  setAchievement(
    totalKuma + kuma >= 10,
    "achievement2_3",
    "累計くま発見数10匹突破",
    "くまぴょんLv.3"
  );
  setAchievement(
    totalKuma + kuma >= 50,
    "achievement2_4",
    "累計くま発見数50匹突破",
    "くまぴょんLv.4"
  );
  setAchievement(
    totalKuma + kuma >= 100,
    "achievement2_5",
    "累計くま発見数100匹突破",
    "くまぴょんLv.5"
  );
  setAchievement(
    totalRisu + risu >= 1,
    "achievement3_1",
    "りす発見",
    "トッテナムLv.1"
  );
  setAchievement(
    totalRisu + risu >= 5,
    "achievement3_2",
    "累計りす発見数5匹突破",
    "トッテナムLv.2"
  );
  setAchievement(
    totalRisu + risu >= 10,
    "achievement3_3",
    "累計りす発見数10匹突破",
    "トッテナムLv.3"
  );
  setAchievement(
    totalRisu + risu >= 50,
    "achievement3_4",
    "累計りす発見数50匹突破",
    "トッテナムLv.4"
  );
  setAchievement(
    totalRisu + risu >= 100,
    "achievement3_5",
    "累計りす発見数100匹突破",
    "トッテナムLv.5"
  );
  setAchievement(
    totalAja + aja >= 1,
    "achievement4_1",
    "あじゃ発見",
    "あじゃぴょんLv.1"
  );
  setAchievement(
    totalAja + aja >= 3,
    "achievement4_2",
    "累計あじゃ発見数3匹突破",
    "あじゃぴょんLv.2"
  );
  setAchievement(
    totalAja + aja >= 5,
    "achievement4_3",
    "累計あじゃ発見数5匹突破",
    "あじゃぴょんLv.3"
  );
  setAchievement(
    totalAja + aja >= 10,
    "achievement4_4",
    "累計あじゃ発見数10匹突破",
    "あじゃぴょんLv.4"
  );
  setAchievement(
    totalAja + aja >= 30,
    "achievement4_5",
    "累計あじゃ発見数30匹突破",
    "あじゃぴょんLv.5"
  );
  setAchievement(
    localStorage.totalTori >= 1,
    "achievement5_1",
    "鳥になった回数1回突破",
    "鳥貴族Lv.1"
  );
  setAchievement(
    localStorage.totalTori >= 5,
    "achievement5_2",
    "鳥になった回数5回突破",
    "鳥貴族Lv.2"
  );
  setAchievement(
    localStorage.totalTori >= 10,
    "achievement5_3",
    "鳥になった回数10回突破",
    "鳥貴族Lv.3"
  );
  setAchievement(
    localStorage.totalTori >= 30,
    "achievement5_4",
    "鳥になった回数30回突破",
    "鳥貴族Lv.4"
  );
  setAchievement(
    localStorage.totalTori >= 50,
    "achievement5_5",
    "鳥になった回数50回突破",
    "鳥貴族Lv.5"
  );
  setAchievement(
    localStorage.usapriTimes >= 1,
    "achievement6_1",
    "うさプリ収監",
    "うさプリズナーLv.1"
  );
  setAchievement(
    localStorage.usapriTimes >= 3,
    "achievement6_2",
    "うさプリ収監3回突破",
    "うさプリズナーLv.2"
  );
  setAchievement(
    localStorage.usapriTimes >= 5,
    "achievement6_3",
    "うさプリ収監5回突破",
    "うさプリズナーLv.3"
  );
  setAchievement(
    localStorage.usapriTimes >= 10,
    "achievement6_4",
    "うさプリ収監10回突破",
    "うさプリズナーLv.4"
  );
  setAchievement(
    localStorage.usapriTimes >= 30,
    "achievement6_5",
    "うさプリ収監30回突破",
    "うさプリズナーLv.5"
  );
  setAchievement(
    playTime + nowTime - launchTime >= 10,
    "achievement7_1",
    "累計プレイ時間10秒突破",
    "うさぴょん中毒Lv.1"
  );
  setAchievement(
    playTime + nowTime - launchTime >= 60,
    "achievement7_2",
    "累計プレイ時間60秒突破",
    "うさぴょん中毒Lv.2"
  );
  setAchievement(
    playTime + nowTime - launchTime >= 600,
    "achievement7_3",
    "累計プレイ時間600秒突破",
    "うさぴょん中毒Lv.3"
  );
  setAchievement(
    playTime + nowTime - launchTime >= 3600,
    "achievement7_4",
    "累計プレイ時間3600秒突破",
    "うさぴょん中毒Lv.4"
  );
  setAchievement(
    playTime + nowTime - launchTime >= 43200,
    "achievement7_5",
    "累計プレイ時間43200秒突破",
    "うさぴょん中毒Lv.5"
  );
  setAchievement(
    totalTairyou + tairyou >= 1,
    "achievement8_1",
    "大漁1回突破",
    "大漁Lv.1"
  );
  setAchievement(
    totalTairyou + tairyou >= 5,
    "achievement8_2",
    "大漁5回突破",
    "大漁Lv.2"
  );
  setAchievement(
    totalTairyou + tairyou >= 10,
    "achievement8_3",
    "大漁10回突破",
    "大漁Lv.3"
  );
  setAchievement(
    totalTairyou + tairyou >= 50,
    "achievement8_4",
    "大漁50回突破",
    "大漁Lv.4"
  );
  setAchievement(
    totalTairyou + tairyou >= 100,
    "achievement8_5",
    "大漁100回突破",
    "大漁Lv.5"
  );
  setAchievement(
    usagi === 0 && kuma === 0 && risu === 0 && aja === 1,
    "achievement9_1",
    "最初にあじゃを出した",
    "奇跡のあじゃ"
  );
  setAchievement(
    usagi === 0 && risu === 0 && aja === 0 && kuma === 1,
    "achievement9_2",
    "最初にくまを出した",
    "幸運のくま"
  );
  setAchievement(
    usagi === 0 && kuma === 0 && aja === 0 && risu === 1,
    "achievement9_3",
    "最初にりすを出した",
    "運命のトッテナム"
  );
  setAchievement(
    usagi === 1000 &&
      kuma === 0 &&
      aja === 0 &&
      risu === 0 &&
      localStorage.usapri !== 1,
    "achievement9_4",
    "うさぎのみで1000匹を達成した",
    "うさぴょんプレイヤーの鑑"
  );
  setAchievement(
    usagi >= 10000,
    "achievement10_1",
    "エンディングを見た",
    "Thank you for playing"
  );
  setAchievement(
    totalAchievement >= 10,
    "achievement11_1",
    "実績10個解除",
    "うさぴょんマスターLv.1"
  );
  setAchievement(
    totalAchievement >= 20,
    "achievement11_2",
    "実績20個解除",
    "うさぴょんマスターLv.2"
  );
  setAchievement(
    totalAchievement >= 30,
    "achievement11_3",
    "実績30個解除",
    "うさぴょんマスターLv.3"
  );
  setAchievement(
    totalAchievement >= 40,
    "achievement11_4",
    "実績40個解除",
    "うさぴょんマスターLv.4"
  );
  setAchievement(
    totalAchievement >= 49,
    "achievement11_5",
    "全実績解除",
    "Congratulations!"
  );
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
      clearInterval(setInterval(achievement, 10));
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

setInterval(achievement, 1000);

setInterval(displayScore, 1000);

setInterval(showStatus, 100);
