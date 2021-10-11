var usagi = 0;
var kuma = 0;
var risu = 0;
var aja = 0;
var tori = 0;
var tairyou = 0;
var notCarmen = 0;
var n = 1;
var n2 = 1;
var no = 1;
var creimg;
var usaran = [
  "image/usa (1).png",
  "image/usa (2).png",
  "image/usa (3).png",
  "image/usa (4).png",
  "image/usa (5).png",
  "image/usa (6).png",
  "image/usa (7).png",
];
for (var i = 0; i < 40; i++) {
  var key = localStorage.key(i);
  console.log(key + ":" + localStorage[key]);
}

//データ読み込み
var launchTimes = localStorage.getItem("launchTimes");

var launchTime = Math.floor(Date.now() / 1000);

////初回プレイの場合
if (!localStorage.getItem("launchTimes")) {
  localStorage.clear();
  localStorage.setItem("launchTimes", 1);
  localStorage.setItem("totalUsagi", 0);
  localStorage.setItem("totalKuma", 0);
  localStorage.setItem("totalRisu", 0);
  localStorage.setItem("totalAja", 0);
  localStorage.setItem("totalTori", 0);
  var totalUsagi = 0;
  var totalKuma = 0;
  var totalRisu = 0;
  var totalAja = 0;
  var totalTori = 0;
  var launchTimes = 1;
  var infotext = "初回プレイです";
  $(document).ready(function () {
    $("#info").html(infotext);
    setTimeout(function () {
      $("#info").fadeOut("slow");
      infotext = "";
    }, 5000);
  });
} else {
  ////二回目以降の場合
  var totalUsagi = Number(localStorage.getItem("totalUsagi"));
  var totalKuma = Number(localStorage.getItem("totalKuma"));
  var totalRisu = Number(localStorage.getItem("totalRisu"));
  var totalAja = Number(localStorage.getItem("totalAja"));
  var totalTori = Number(localStorage.getItem("totalTori"));
  var totalTairyou = Number(localStorage.getItem("totalTairyou"));
  if (localStorage.usapri != 1) {
    launchTimes++;
    localStorage.setItem("launchTimes", launchTimes);
    var infotext = launchTimes + "回目のプレイです";
  } else {
    var infotext = "あなたはうさプリに入れられました";
  }
  infotext =
    infotext + "<br>\n今まで累計" + totalUsagi + "匹のうさぎを増やしました";
  if (totalKuma >= 1) {
    infotext =
      infotext + "<br>\n今まで累計" + totalKuma + "匹のくまを見つけました";
  }
  if (totalRisu >= 1) {
    infotext =
      infotext + "<br>\n今まで累計" + totalRisu + "匹のりすを見つけました";
  }
  if (totalAja >= 1) {
    infotext =
      infotext + "<br>\n今まで累計" + totalAja + "匹のあじゃを見つけました";
  }
  $(document).ready(function () {
    $("#info").html(infotext);
    setTimeout(function () {
      $("#info").fadeOut("slow");
      infotext = "";
    }, 5000);
  });
}
if (typeof localStorage.totalTairyou === "undefined") {
  localStorage.totalTairyou = 0;
  var totalTairyou = Number(localStorage.totalTairyou);
}
if (typeof localStorage.usapriTimes === "undefined") {
  localStorage.usapriTimes = 0;
}
if (typeof localStorage.playTime === "undefined") {
  localStorage.playTime = 0;
  var playTime = Number(localStorage.playTime);
} else {
  var playTime = Number(localStorage.playTime);
}

//データ保存
$(window).on("pagehide", function () {
  var totalUsagi = Number(localStorage.getItem("totalUsagi"));
  var totalKuma = Number(localStorage.getItem("totalKuma"));
  var totalRisu = Number(localStorage.getItem("totalRisu"));
  var totalAja = Number(localStorage.getItem("totalAja"));
  var totalTairyou = Number(localStorage.getItem("totalTairyou"));
  totalUsagi = totalUsagi + usagi;
  totalKuma = totalKuma + kuma;
  totalRisu = totalRisu + risu;
  totalAja = totalAja + aja;
  totalTairyou = totalTairyou + tairyou;
  var nowTime = Math.floor(Date.now() / 1000);
  playTime = playTime + nowTime - launchTime;
  localStorage.setItem("totalUsagi", totalUsagi);
  localStorage.setItem("totalKuma", totalKuma);
  localStorage.setItem("totalRisu", totalRisu);
  localStorage.setItem("totalAja", totalAja);
  localStorage.totalTairyou = totalTairyou;
  localStorage.playTime = playTime;
});

setInterval(function () {
  var nowTime = Math.floor(Date.now() / 1000);
  var showlaunchtime = "累計プレイ回数 : " + launchTimes + "回<br>\n";
  var showPlayTime =
    "累計プレイ時間 : " + (playTime + nowTime - launchTime) + "秒<br>\n";
  var usagiRuikei = "累計うさぎ増やし数 : " + (totalUsagi + usagi) + "匹<br>\n";
  var kumaRuikei = "累計くま発見数 : " + (totalKuma + kuma) + "匹<br>\n";
  var risuRuikei = "累計りす発見数 : " + (totalRisu + risu) + "匹<br>\n";
  var ajaRuikei = "累計あじゃ発見数 : " + (totalAja + aja) + "匹<br>\n";
  if (totalTori + tori >= 1) {
    var toriRuikei = "累計鳥になった回数 : " + (totalTori + tori) + "回<br>\n";
  } else {
    var toriRuikei = "";
  }
  if (Number(localStorage.usapriTimes) >= 1) {
    var priRuikei =
      "累計うさプリ収監回数 : " + localStorage.usapriTimes + "回<br>\n";
  } else {
    var priRuikei = "";
  }
  if (totalTairyou + tairyou >= 1) {
    var tairyouRuikei =
      "累計大漁回数 : " + (totalTairyou + tairyou) + "回<br>\n";
  } else {
    var tairyouRuikei = "";
  }
  var usagiHeikin =
    "1プレイでの平均うさぎ増やし数 : " +
    Math.round(((totalUsagi + usagi) / launchTimes) * 10) / 10 +
    "匹<br>\n";
  var kumaHeikin =
    "1プレイでの平均くま発見数 : " +
    Math.round(((totalKuma + kuma) / launchTimes) * 10) / 10 +
    "匹<br>\n";
  var risuHeikin =
    "1プレイでの平均りす発見数 : " +
    Math.round(((totalRisu + risu) / launchTimes) * 10) / 10 +
    "匹<br>\n";
  var ajaHeikin =
    "1プレイでの平均あじゃ発見数 : " +
    Math.round(((totalAja + aja) / launchTimes) * 10) / 10 +
    "匹<br>\n";
  var score = Math.round(((totalUsagi + usagi) / launchTimes) * 10) / 10;
  score =
    score + (Math.round(((totalKuma + kuma) / launchTimes) * 10) / 10) * 100;
  score =
    score + (Math.round(((totalRisu + risu) / launchTimes) * 10) / 10) * 100;
  score =
    score + (Math.round(((totalAja + aja) / launchTimes) * 10) / 10) * 2000;
  score = score + (totalTori + tori) * 10;
  score = score + Number(localStorage.usapriTimes) * 1000;
  score = score + (totalTairyou + tairyou) * 100;
  score = (score * (Number(localStorage.totalAchievement) + 10)) / 10;
  score =
    (score * (Math.round((playTime + nowTime - launchTime) / 60) + 10)) / 10;
  score = Math.round(score);
  var showScore = "スコア : " + score + "点<br>\n";
  $("#status").html(
    showlaunchtime +
      showPlayTime +
      usagiRuikei +
      kumaRuikei +
      risuRuikei +
      ajaRuikei +
      toriRuikei +
      priRuikei +
      tairyouRuikei +
      usagiHeikin +
      kumaHeikin +
      risuHeikin +
      ajaHeikin +
      showScore
  );
}, 1000);

//0.1秒毎に状態チェック
function achievement() {
  var nowTime = Math.floor(Date.now() / 1000);
  var achievementList = "";
  var totalAchievement = 0;
  if (typeof localStorage.achievement1_1 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">うさぴょんLv.1</span> - 累計うさぎ数100匹突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement1_2 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">うさぴょんLv.2</span> - 累計うさぎ数500匹突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement1_3 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">うさぴょんLv.3</span> - 累計うさぎ数1000匹突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement1_4 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">うさぴょんLv.4</span> - 累計うさぎ数5000匹突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement1_5 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">うさぴょんLv.5</span> - 累計うさぎ数10000匹突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement2_1 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">くまぴょんLv.1</span> - くま発見<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement2_2 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">くまぴょんLv.2</span> - 累計くま発見数5匹突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement2_3 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">くまぴょんLv.3</span> - 累計くま発見数10匹突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement2_4 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">くまぴょんLv.4</span> - 累計くま発見数50匹突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement2_5 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">くまぴょんLv.5</span> - 累計くま発見数100匹突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement3_1 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">トッテナムLv.1</span> - りす発見<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement3_2 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">トッテナムLv.2</span> - 累計りす発見数5匹突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement3_3 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">トッテナムLv.3</span> - 累計りす発見数10匹突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement3_4 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">トッテナムLv.4</span> - 累計りす発見数50匹突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement3_5 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">トッテナムLv.5</span> - 累計りす発見数100匹突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement4_1 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">あじゃぴょんLv.1</span> - あじゃ発見<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement4_2 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">あじゃぴょんLv.2</span> - 累計あじゃ発見数3匹突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement4_3 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">あじゃぴょんLv.3</span> - 累計あじゃ発見数5匹突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement4_4 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">あじゃぴょんLv.4</span> - 累計あじゃ発見数10匹突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement4_5 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">あじゃぴょんLv.5</span> - 累計あじゃ発見数30匹突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement5_1 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">鳥貴族Lv.1</span> - 鳥になった回数1回突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement5_2 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">鳥貴族Lv.2</span> - 鳥になった回数5回突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement5_3 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">鳥貴族Lv.3</span> - 鳥になった回数10回突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement5_4 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">鳥貴族Lv.4</span> - 鳥になった回数30回突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement5_5 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">鳥貴族Lv.5</span> - 鳥になった回数50回突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement6_1 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">うさプリズナーLv.1</span> - うさプリ収監<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement6_2 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">うさプリズナーLv.2</span> - うさプリ収監3回突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement6_3 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">うさプリズナーLv.3</span> - うさプリ収監5回突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement6_4 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">うさプリズナーLv.4</span> - うさプリ収監10回突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement6_5 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">うさプリズナーLv.5</span> - うさプリ収監30回突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement7_1 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">うさぴょん中毒Lv.1</span> - 累計プレイ時間10秒突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement7_2 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">うさぴょん中毒Lv.2</span> - 累計プレイ時間60秒突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement7_3 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">うさぴょん中毒Lv.3</span> - 累計プレイ時間600秒突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement7_4 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">うさぴょん中毒Lv.4</span> - 累計プレイ時間3600秒突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement7_5 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">うさぴょん中毒Lv.5</span> - 累計プレイ時間43200秒突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement8_1 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">大漁Lv.1</span> - 大漁1回突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement8_2 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">大漁Lv.2</span> - 大漁5回突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement8_3 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">大漁Lv.3</span> - 大漁10回突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement8_4 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">大漁Lv.4</span> - 大漁50回突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement8_5 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">大漁Lv.5</span> - 大漁100回突破<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement9_1 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">奇跡のあじゃ</span> - 最初にあじゃを出した<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement9_2 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">幸運のくま</span> - 最初にくまを出した<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement9_3 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">運命のトッテナム</span> - 最初にりすを出した<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement9_4 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">うさぴょんプレイヤーの鑑</span> - うさぎのみで大漁を達成した<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement10_1 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">Thank you for playing</span> - エンディングを見た<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement11_1 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">うさぴょんマスターLv.1</span> - 実績10個解除<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement11_2 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">うさぴょんマスターLv.2</span> - 実績20個解除<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement11_3 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">うさぴょんマスターLv.3</span> - 実績30個解除<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement11_4 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">うさぴょんマスターLv.4</span> - 実績40個解除<br>\n';
    totalAchievement++;
  }
  if (typeof localStorage.achievement11_5 !== "undefined") {
    achievementList =
      achievementList +
      '<span class="notice">Congratulations!</span> - 全実績解除<br>\n';
    totalAchievement++;
  }

  //実績解除
  if (
    totalUsagi + usagi >= 100 &&
    typeof localStorage.achievement1_1 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計うさぎ数100匹突破🐰実績：うさぴょんLv.1解除</span><br>\n' +
      infotext;
    localStorage.achievement1_1 = 1;
    achshow();
  }
  if (
    totalUsagi + usagi >= 500 &&
    typeof localStorage.achievement1_2 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計うさぎ数500匹突破🐰実績：うさぴょんLv.2解除</span><br>\n' +
      infotext;
    localStorage.achievement1_2 = 1;
    achshow();
  }
  if (
    totalUsagi + usagi >= 1000 &&
    typeof localStorage.achievement1_3 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計うさぎ数1000匹突破🐰実績：うさぴょんLv.3解除</span><br>\n' +
      infotext;
    localStorage.achievement1_3 = 1;
    achshow();
  }
  if (
    totalUsagi + usagi >= 5000 &&
    typeof localStorage.achievement1_4 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計うさぎ数5000匹突破🐰実績：うさぴょんLv.4解除</span><br>\n' +
      infotext;
    localStorage.achievement1_4 = 1;
    achshow();
  }
  if (
    totalUsagi + usagi >= 10000 &&
    typeof localStorage.achievement1_5 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計うさぎ数10000匹突破🐰実績：うさぴょんLv.5解除</span><br>\n' +
      infotext;
    localStorage.achievement1_5 = 1;
    achshow();
  }
  if (
    totalKuma + kuma >= 1 &&
    typeof localStorage.achievement2_1 === "undefined"
  ) {
    infotext =
      '<span class="notice">くま発見🐰実績：くまぴょんLv.1解除</span><br>\n' +
      infotext;
    localStorage.achievement2_1 = 1;
    achshow();
  }
  if (
    totalKuma + kuma >= 5 &&
    typeof localStorage.achievement2_2 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計くま発見数5匹突破🐰実績：くまぴょんLv.2解除</span><br>\n' +
      infotext;
    localStorage.achievement2_2 = 1;
    achshow();
  }
  if (
    totalKuma + kuma >= 10 &&
    typeof localStorage.achievement2_3 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計くま発見数10匹突破🐰実績：くまぴょんLv.3解除</span><br>\n' +
      infotext;
    localStorage.achievement2_3 = 1;
    achshow();
  }
  if (
    totalKuma + kuma >= 50 &&
    typeof localStorage.achievement2_4 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計くま発見数50匹突破🐰実績：くまぴょんLv.4解除</span><br>\n' +
      infotext;
    localStorage.achievement2_4 = 1;
    achshow();
  }
  if (
    totalKuma + kuma >= 100 &&
    typeof localStorage.achievement2_5 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計くま発見数100匹突破🐰実績：くまぴょんLv.5解除</span><br>\n' +
      infotext;
    localStorage.achievement2_5 = 1;
    achshow();
  }
  if (
    totalRisu + risu >= 1 &&
    typeof localStorage.achievement3_1 === "undefined"
  ) {
    infotext =
      '<span class="notice">りす発見🐰実績：トッテナムLv.1解除</span><br>\n' +
      infotext;
    localStorage.achievement3_1 = 1;
    achshow();
  }
  if (
    totalRisu + risu >= 5 &&
    typeof localStorage.achievement3_2 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計りす発見数5匹突破🐰実績：トッテナムLv.2解除</span><br>\n' +
      infotext;
    localStorage.achievement3_2 = 1;
    achshow();
  }
  if (
    totalRisu + risu >= 10 &&
    typeof localStorage.achievement3_3 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計りす発見数10匹突破🐰実績：トッテナムLv.3解除</span><br>\n' +
      infotext;
    localStorage.achievement3_3 = 1;
    achshow();
  }
  if (
    totalRisu + risu >= 50 &&
    typeof localStorage.achievement3_4 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計りす発見数50匹突破🐰実績：トッテナムLv.4解除</span><br>\n' +
      infotext;
    localStorage.achievement3_4 = 1;
    achshow();
  }
  if (
    totalRisu + risu >= 100 &&
    typeof localStorage.achievement3_5 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計りす発見数100匹突破🐰実績：トッテナムLv.5解除</span><br>\n' +
      infotext;
    localStorage.achievement3_5 = 1;
    achshow();
  }
  if (
    totalAja + aja >= 1 &&
    typeof localStorage.achievement4_1 === "undefined"
  ) {
    infotext =
      '<span class="notice">あじゃ発見🐰実績：あじゃぴょんLv.1解除</span><br>\n' +
      infotext;
    localStorage.achievement4_1 = 1;
    achshow();
  }
  if (
    totalAja + aja >= 3 &&
    typeof localStorage.achievement4_2 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計あじゃ発見数3匹突破🐰実績：あじゃぴょんLv.2解除</span><br>\n' +
      infotext;
    localStorage.achievement4_2 = 1;
    achshow();
  }
  if (
    totalAja + aja >= 5 &&
    typeof localStorage.achievement4_3 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計あじゃ発見数5匹突破🐰実績：あじゃぴょんLv.3解除</span><br>\n' +
      infotext;
    localStorage.achievement4_3 = 1;
    achshow();
  }
  if (
    totalAja + aja >= 10 &&
    typeof localStorage.achievement4_4 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計あじゃ発見数10匹突破🐰実績：あじゃぴょんLv.4解除</span><br>\n' +
      infotext;
    localStorage.achievement4_4 = 1;
    achshow();
  }
  if (
    totalAja + aja >= 30 &&
    typeof localStorage.achievement4_5 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計あじゃ発見数30匹突破🐰実績：あじゃぴょんLv.5解除</span><br>\n' +
      infotext;
    localStorage.achievement4_5 = 1;
    achshow();
  }
  if (
    localStorage.totalTori >= 1 &&
    typeof localStorage.achievement5_1 === "undefined"
  ) {
    infotext =
      '<span class="notice">鳥になった回数1回突破🐰実績：鳥貴族Lv.1解除</span><br>\n' +
      infotext;
    localStorage.achievement5_1 = 1;
    achshow();
  }
  if (
    localStorage.totalTori >= 5 &&
    typeof localStorage.achievement5_2 === "undefined"
  ) {
    infotext =
      '<span class="notice">鳥になった回数5回突破🐰実績：鳥貴族Lv.2解除</span><br>\n' +
      infotext;
    localStorage.achievement5_2 = 1;
    achshow();
  }
  if (
    localStorage.totalTori >= 10 &&
    typeof localStorage.achievement5_3 === "undefined"
  ) {
    infotext =
      '<span class="notice">鳥になった回数10回突破🐰実績：鳥貴族Lv.3解除</span><br>\n' +
      infotext;
    localStorage.achievement5_3 = 1;
    achshow();
  }
  if (
    localStorage.totalTori >= 30 &&
    typeof localStorage.achievement5_4 === "undefined"
  ) {
    infotext =
      '<span class="notice">鳥になった回数30回突破🐰実績：鳥貴族Lv.4解除</span><br>\n' +
      infotext;
    localStorage.achievement5_4 = 1;
    achshow();
  }
  if (
    localStorage.totalTori >= 50 &&
    typeof localStorage.achievement5_5 === "undefined"
  ) {
    infotext =
      '<span class="notice">鳥になった回数50回突破🐰実績：鳥貴族Lv.5解除</span><br>\n' +
      infotext;
    localStorage.achievement5_5 = 1;
    achshow();
  }
  if (
    localStorage.usapriTimes >= 1 &&
    typeof localStorage.achievement6_1 === "undefined"
  ) {
    infotext =
      '<span class="notice">うさプリ収監🐰実績：うさプリズナーLv.1解除</span><br>\n' +
      infotext;
    localStorage.achievement6_1 = 1;
    achshow();
  }
  if (
    localStorage.usapriTimes >= 3 &&
    typeof localStorage.achievement6_2 === "undefined"
  ) {
    infotext =
      '<span class="notice">うさプリ収監3回突破🐰実績：うさプリズナーLv.2解除</span><br>\n' +
      infotext;
    localStorage.achievement6_2 = 1;
    achshow();
  }
  if (
    localStorage.usapriTimes >= 5 &&
    typeof localStorage.achievement6_3 === "undefined"
  ) {
    infotext =
      '<span class="notice">うさプリ収監5回突破🐰実績：うさプリズナーLv.3解除</span><br>\n' +
      infotext;
    localStorage.achievement6_3 = 1;
    achshow();
  }
  if (
    localStorage.usapriTimes >= 10 &&
    typeof localStorage.achievement6_4 === "undefined"
  ) {
    infotext =
      '<span class="notice">うさプリ収監10回突破🐰実績：うさプリズナーLv.4解除</span><br>\n' +
      infotext;
    localStorage.achievement6_4 = 1;
    achshow();
  }
  if (
    localStorage.usapriTimes >= 30 &&
    typeof localStorage.achievement6_5 === "undefined"
  ) {
    infotext =
      '<span class="notice">うさプリ収監30回突破🐰実績：うさプリズナーLv.5解除</span><br>\n' +
      infotext;
    localStorage.achievement6_5 = 1;
    achshow();
  }
  if (
    playTime + nowTime - launchTime >= 10 &&
    typeof localStorage.achievement7_1 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計プレイ時間10秒突破🐰実績：うさぴょん中毒Lv.1解除</span><br>\n' +
      infotext;
    localStorage.achievement7_1 = 1;
    achshow();
  }
  if (
    playTime + nowTime - launchTime >= 60 &&
    typeof localStorage.achievement7_2 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計プレイ時間60秒突破🐰実績：うさぴょん中毒Lv.2解除</span><br>\n' +
      infotext;
    localStorage.achievement7_2 = 1;
    achshow();
  }
  if (
    playTime + nowTime - launchTime >= 600 &&
    typeof localStorage.achievement7_3 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計プレイ時間600秒突破🐰実績：うさぴょん中毒Lv.3解除</span><br>\n' +
      infotext;
    localStorage.achievement7_3 = 1;
    achshow();
  }
  if (
    playTime + nowTime - launchTime >= 3600 &&
    typeof localStorage.achievement7_4 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計プレイ時間3600秒突破🐰実績：うさぴょん中毒Lv.4解除</span><br>\n' +
      infotext;
    localStorage.achievement7_4 = 1;
    achshow();
  }
  if (
    playTime + nowTime - launchTime >= 43200 &&
    typeof localStorage.achievement7_5 === "undefined"
  ) {
    infotext =
      '<span class="notice">累計プレイ時間43200秒突破🐰実績：うさぴょん中毒Lv.5解除</span><br>\n' +
      infotext;
    localStorage.achievement7_5 = 1;
    achshow();
  }
  if (
    totalTairyou + tairyou >= 1 &&
    typeof localStorage.achievement8_1 === "undefined"
  ) {
    infotext =
      '<span class="notice">大漁1回突破🐰実績：大漁Lv.1解除</span><br>\n' +
      infotext;
    localStorage.achievement8_1 = 1;
    achshow();
  }
  if (
    totalTairyou + tairyou >= 5 &&
    typeof localStorage.achievement8_2 === "undefined"
  ) {
    infotext =
      '<span class="notice">大漁5回突破🐰実績：大漁Lv.2解除</span><br>\n' +
      infotext;
    localStorage.achievement8_2 = 1;
    achshow();
  }
  if (
    totalTairyou + tairyou >= 10 &&
    typeof localStorage.achievement8_3 === "undefined"
  ) {
    infotext =
      '<span class="notice">大漁10回突破🐰実績：大漁Lv.3解除</span><br>\n' +
      infotext;
    localStorage.achievement8_3 = 1;
    achshow();
  }
  if (
    totalTairyou + tairyou >= 50 &&
    typeof localStorage.achievement8_4 === "undefined"
  ) {
    infotext =
      '<span class="notice">大漁50回突破🐰実績：大漁Lv.4解除</span><br>\n' +
      infotext;
    localStorage.achievement8_4 = 1;
    achshow();
  }
  if (
    totalTairyou + tairyou >= 100 &&
    typeof localStorage.achievement8_5 === "undefined"
  ) {
    infotext =
      '<span class="notice">大漁100回突破🐰実績：大漁Lv.5解除</span><br>\n' +
      infotext;
    localStorage.achievement8_5 = 1;
    achshow();
  }
  if (
    usagi == 0 &&
    kuma == 0 &&
    risu == 0 &&
    aja == 1 &&
    typeof localStorage.achievement9_1 === "undefined"
  ) {
    infotext =
      '<span class="notice">最初にあじゃを出した🐰実績：奇跡のあじゃ解除</span><br>\n' +
      infotext;
    localStorage.achievement9_1 = 1;
    achshow();
  }
  if (
    usagi == 0 &&
    risu == 0 &&
    aja == 0 &&
    kuma == 1 &&
    typeof localStorage.achievement9_2 === "undefined"
  ) {
    infotext =
      '<span class="notice">最初にくまを出した🐰実績：幸運のくま解除</span><br>\n' +
      infotext;
    localStorage.achievement9_2 = 1;
    achshow();
  }
  if (
    usagi == 0 &&
    kuma == 0 &&
    aja == 0 &&
    risu == 1 &&
    typeof localStorage.achievement9_3 === "undefined"
  ) {
    infotext =
      '<span class="notice">最初にりすを出した🐰実績：運命のトッテナム解除</span><br>\n' +
      infotext;
    localStorage.achievement9_3 = 1;
    achshow();
  }
  if (
    usagi == 1000 &&
    kuma == 0 &&
    aja == 0 &&
    risu == 0 &&
    localStorage.usapri != 1 &&
    typeof localStorage.achievement9_4 === "undefined"
  ) {
    infotext =
      '<span class="notice">うさぎのみで1000匹を達成した🐰実績：うさぴょんプレイヤーの鑑解除</span><br>\n' +
      infotext;
    localStorage.achievement9_3 = 1;
    achshow();
  }
  if (usagi >= 10000 && typeof localStorage.achievement10_1 === "undefined") {
    infotext =
      '<span class="notice">エンディングを見た🐰実績：Thank you for playing解除</span><br>\n' +
      infotext;
    localStorage.achievement10_1 = 1;
    achshow();
  }
  if (
    totalAchievement >= 10 &&
    typeof localStorage.achievement11_1 === "undefined"
  ) {
    infotext =
      '<span class="notice">実績10個解除🐰実績：うさぴょんマスターLv.1解除</span><br>\n' +
      infotext;
    localStorage.achievement11_1 = 1;
    achshow();
  }
  if (
    totalAchievement >= 20 &&
    typeof localStorage.achievement11_2 === "undefined"
  ) {
    infotext =
      '<span class="notice">実績20個解除🐰実績：うさぴょんマスターLv.2解除</span><br>\n' +
      infotext;
    localStorage.achievement11_2 = 1;
    achshow();
  }
  if (
    totalAchievement >= 30 &&
    typeof localStorage.achievement11_3 === "undefined"
  ) {
    infotext =
      '<span class="notice">実績30個解除🐰実績：うさぴょんマスターLv.3解除</span><br>\n' +
      infotext;
    localStorage.achievement11_3 = 1;
    achshow();
  }
  if (
    totalAchievement >= 40 &&
    typeof localStorage.achievement11_4 === "undefined"
  ) {
    infotext =
      '<span class="notice">実績40個解除🐰実績：うさぴょんマスターLv.4解除</span><br>\n' +
      infotext;
    localStorage.achievement11_4 = 1;
    achshow();
  }
  if (
    totalAchievement >= 49 &&
    typeof localStorage.achievement11_5 === "undefined"
  ) {
    infotext =
      '<span class="notice">全実績解除🐰実績：Congratulations!解除</span><br>\n' +
      infotext;
    localStorage.achievement11_5 = 1;
    achshow();
  }
  console.log(totalAchievement);
  localStorage.totalAchievement = totalAchievement;
  $("#achievement_list").html(achievementList);
}
//実績表示
function achshow() {
  $("#info").html(infotext);
  $("#info").show();
  $("#sound4").get(0).play();
  setTimeout(function () {
    $("#info").fadeOut("slow");
    infotext = "";
  }, 5000);
}
setInterval(achievement, 1000);

//BGM流す
document.getElementById("sound5").volume = 0.5;
document.getElementById("sound8").volume = 0.5;
document.getElementById("sound1").loop = true;
document.getElementById("sound5").loop = true;
document.getElementById("sound8").loop = true;
if (localStorage.usapri == 1) {
  document.getElementById("sound8").play();
} else {
  document.getElementById("sound5").play();
}

function muteSE() {
  document.getElementById("sound2").volume = 0;
  document.getElementById("sound4").volume = 0;
  document.getElementById("sound6").volume = 0;
  document.getElementById("sound7").volume = 0;
}

function muteBGM() {
  document.getElementById("sound1").volume = 0;
  document.getElementById("sound3").volume = 0;
  document.getElementById("sound5").volume = 0;
  document.getElementById("sound8").volume = 0;
}

function stopAll() {
  document.getElementById("sound1").pause();
  document.getElementById("sound2").pause();
  document.getElementById("sound3").pause();
  document.getElementById("sound4").pause();
  document.getElementById("sound5").pause();
  document.getElementById("sound6").pause();
  document.getElementById("sound7").pause();
  document.getElementById("sound8").pause();
}

$("#mute_se").click(function () {
  muteSE();
});

$("#mute_bgm").click(function () {
  muteBGM();
});

$("#not_carmen").click(function () {
  var notCarmen = 1;
  console.log(notCarmen);
});

$("#play_ko").click(function () {
  if (localStorage.usapri == 1) {
    document.getElementById("sound7").play();
    alert("ダメです");
  } else {
    stopAll();
    document.getElementById("sound5").currentTime = 0;
    document.getElementById("sound5").play();
  }
});

$("#play_ca").click(function () {
  if (localStorage.usapri == 1) {
    document.getElementById("sound7").play();
    alert("ダメです");
  } else {
    stopAll();
    document.getElementById("sound1").currentTime = 0;
    document.getElementById("sound1").play();
  }
});

$("#play_hi").click(function () {
  if (localStorage.usapriTimes == 0) {
    document.getElementById("sound7").play();
    alert("聴いたことがないのでダメです");
  } else {
    stopAll();
    document.getElementById("sound8").currentTime = 0;
    document.getElementById("sound8").play();
  }
});

$("#del").click(function () {
  if (localStorage.usapri == 1) {
    alert("消せません");
  } else {
    var del = confirm("全てのデータを初期化します。よろしいですか？");
    if (del) {
      localStorage.clear();
      clearInterval(setInterval(achievement, 10));
      location.reload();
    }
  }
});

$("#version").html("ver.1.1.1β");

$("#version").click(function () {
  $("#credit").fadeToggle();
});

$("#1").click(function () {
  usafuya();
});

$(window).keydown(function () {
  return false;
});

//初期化
if (localStorage.usapri == 1) {
  window.location.href = "usapri.html";
}
var firstLaunchTime = Date.now();
/*
  if (typeof localStorage.first_launch_time === "undefined"){
  firstLaunchTime = Math.floor(firstLaunchTime/1000);
  localStorage.first_launch_time = firstLaunchTime;
  console.log(localStorage.first_launch_time);
  } else {
      var firstLaunchTime = localStorage.first_launch_time;
  }
  */
if (localStorage.getItem("mute") == 1) {
  document.getElementById("sound1").volume = 0;
  document.getElementById("sound2").volume = 0;
  document.getElementById("sound3").volume = 0;
  document.getElementById("sound4").volume = 0;
  document.getElementById("sound5").volume = 0;
  document.getElementById("sound6").volume = 0;
  document.getElementById("sound7").volume = 0;
  document.getElementById("sound8").volume = 0;
}
$("#tori").click(function () {
  $("#sound7").get(0).play();
  alert("できません");
  if (typeof localStorage.totalTori === "undefined") {
    localStorage.setItem("totalTori", 1);
  } else {
    var totalTori = Number(localStorage.getItem("totalTori"));
    totalTori++;
    localStorage.setItem("totalTori", totalTori);
  }
  tori++;
  if (tori >= 5) {
    var usapriTimes = Number(localStorage.getItem("usapriTimes"));
    usapriTimes++;
    localStorage.setItem("usapriTimes", usapriTimes);
    alert("鳥になりすぎです");
    window.location.href = "usapri.html";
    localStorage.setItem("usapri", 1);
  }
  console.log(totalTori);
});
//ボタンクリック
function usafuya() {
  $("#sound2").get(0).currentTime = 0;
  $("#sound2").get(0).play();
  var sW2 = window.innerWidth + 60;
  var sH2 = window.innerHeight + 100;
  var sW = Math.floor(Math.random() * sW2) - 30;
  var sH = Math.floor(Math.random() * sH2) - 50;
  var ran = Math.floor(Math.random() * 101);
  switch (ran) {
    case 0:
      usasrc = "image/risu.png";
      risu++;
      break;
    case 1:
      usasrc = "image/kuma.png";
      kuma++;
      break;
    case 2:
      var ran = Math.floor(Math.random() * 21);
      switch (ran) {
        case 0:
          $("#sound6").get(0).currentTime = 0;
          $("#sound6").get(0).play();
          usasrc = "image/aja.png";
          aja++;
          break;
        default:
          usasrc = usaran[Math.floor(Math.random() * usaran.length)];
          usagi++;
          break;
      }
      break;
    default:
      usasrc = usaran[Math.floor(Math.random() * usaran.length)];
      usagi++;
      break;
  }
  creimg = document.createElement("img");
  creimg.setAttribute("src", usasrc);
  creimg.setAttribute(
    "style",
    "position:fixed; top:" + sH + "px; left:" + sW + "px;"
  );
  document.body.appendChild(creimg);
}
//0.1秒毎に状態チェック
setInterval(function () {
  u = usagi + "匹のうさぎがいます";
  if (kuma >= 1) {
    u = u + "<br>\n" + kuma + "匹のくまがいます";
  }
  if (risu >= 1) {
    u = u + "<br>\n" + risu + "匹のりすがいます";
  }
  if (aja >= 1) {
    u = u + "<br>\n" + aja + "匹のあじゃがいます";
  }
  u + '"';
  $("#usa").html(u);
  //うさぎが10000匹を超えた場合ジュピターを流してスタッフロールを表示
  if (usagi >= 10000 * no) {
    stopAll();
    $("#sound3").get(0).play();
    var b = document.createElement("img");
    b.setAttribute("src", "image/staff.png");
    b.setAttribute("id", "staff");
    b.setAttribute(
      "style",
      "text-align:center; position:fixed; bottom:0px; left:200px;z-index:9999;opacity:0.9; max-width:50%;margin:0 auto;"
    );
    document.body.appendChild(b);
    $("#staff").animate(
      {
        top: "50px",
      },
      400
    );
    no++;
    n++;
    //うさぎが1000匹を超える毎に大漁を表示しカルメン組曲を再生
  } else if (usagi >= 1000 * n) {
    if (notCarmen != 1) {
      stopAll();
      $("#sound1").get(0).currentTime = 0;
      $("#sound1").get(0).play();
    }
    var creimg = document.createElement("img");
    creimg.setAttribute("src", "image/tairyou.png");
    creimg.setAttribute("style", "position:fixed; bottom:10px; right:10px;");
    document.body.appendChild(creimg);
    n++;
    tairyou++;
  }
  //うさぎが500匹を超える毎にボタン再描画
  if (usagi >= 500 * n2) {
    var bleft = $("#1").offset().left;
    var btop = $("#1").offset().top;
    console.log(bleft);
    var k = document.createElement("button");
    var n22 = n2 + 1;
    var n2c = "#" + n2;
    var n22c = "#" + n22;
    k.setAttribute("id", n22);
    k.setAttribute(
      "style",
      "font-size:500%; position:fixed; top:" +
        btop +
        "px; left:" +
        bleft +
        "px;"
    );
    k.innerHTML = "うさぎを増やす";
    document.body.appendChild(k);
    $(n22c).click(function () {
      usafuya();
    });
    n2++;
  }
}, 100);
