import { muteBGM, muteSE, sound, stopAll } from "./soundSettings";

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
let u;
let usasrc;
let totalTori: number;

//データ読み込み
let launchTimes: number = Number(localStorage.getItem("launchTimes"));

var launchTime = Math.floor(Date.now() / 1000);

////初回プレイの場合
if (!localStorage.getItem("launchTimes")) {
  localStorage.clear();
  localStorage.setItem("launchTimes", "1");
  localStorage.setItem("totalUsagi", "0");
  localStorage.setItem("totalKuma", "0");
  localStorage.setItem("totalRisu", "0");
  localStorage.setItem("totalAja", "0");
  localStorage.setItem("totalTori", "0");
  var totalUsagi = 0;
  var totalKuma = 0;
  var totalRisu = 0;
  var totalAja = 0;
  totalTori = 0;
  launchTimes = 1;
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
  totalTori = Number(localStorage.getItem("totalTori"));
  var totalTairyou = Number(localStorage.getItem("totalTairyou"));
  if (localStorage.usapri != 1) {
    launchTimes++;
    localStorage.setItem("launchTimes", launchTimes.toString());
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
  localStorage.setItem("totalUsagi", totalUsagi.toString());
  localStorage.setItem("totalKuma", totalKuma.toString());
  localStorage.setItem("totalRisu", totalRisu.toString());
  localStorage.setItem("totalAja", totalAja.toString());
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

//実績表示
function achshow() {
  $("#info").html(infotext);
  $("#info").show();
  sound.soundis4.play();
  setTimeout(function () {
    $("#info").fadeOut("slow");
    infotext = "";
  }, 5000);
}
setInterval(achievement, 1000);

//BGM流す
sound.soundis5.volume = 0.5;
sound.soundis8.volume = 0.5;
sound.soundis1.loop = true;
sound.soundis5.loop = true;
sound.soundis8.loop = true;
if (localStorage.usapri == 1) {
  sound.soundis8.play();
} else {
  sound.soundis5.play();
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
    sound.soundis7.play();
    alert("ダメです");
  } else {
    stopAll();
    sound.soundis5.currentTime = 0;
    sound.soundis5.play();
  }
});

$("#play_ca").click(function () {
  if (localStorage.usapri == 1) {
    sound.soundis7.play();
    alert("ダメです");
  } else {
    stopAll();
    sound.soundis1.currentTime = 0;
    sound.soundis1.play();
  }
});

$("#play_hi").click(function () {
  if (localStorage.usapriTimes == 0) {
    sound.soundis7.play();
    alert("聴いたことがないのでダメです");
  } else {
    stopAll();
    sound.soundis8.currentTime = 0;
    sound.soundis8.play();
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
if (localStorage.getItem("mute") === "1") {
  soundis1.volume = 0;
  soundis2.volume = 0;
  soundis3.volume = 0;
  soundis4.volume = 0;
  soundis5.volume = 0;
  soundis6.volume = 0;
  soundis7.volume = 0;
  soundis8.volume = 0;
}
$("#tori").click(function () {
  soundis7.play();
  alert("できません");
  if (typeof localStorage.totalTori === "undefined") {
    localStorage.setItem("totalTori", "1");
  } else {
    var totalTori = Number(localStorage.getItem("totalTori"));
    totalTori++;
    localStorage.setItem("totalTori", totalTori.toString());
  }
  tori++;
  if (tori >= 5) {
    var usapriTimes = Number(localStorage.getItem("usapriTimes"));
    usapriTimes++;
    localStorage.setItem("usapriTimes", usapriTimes.toString());
    alert("鳥になりすぎです");
    window.location.href = "usapri.html";
    localStorage.setItem("usapri", "1");
  }
});

//ボタンクリック
function usafuya() {
  soundis2.currentTime = 0;
  soundis2.play();
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
          sound.soundis6.currentTime = 0;
          sound.soundis6.play();
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
    sound.soundis3.play();
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
    no++;
    n++;
    //うさぎが1000匹を超える毎に大漁を表示しカルメン組曲を再生
  } else if (usagi >= 1000 * n) {
    if (notCarmen != 1) {
      stopAll();
      sound.soundis1.currentTime = 0;
      sound.soundis1.play();
    }
    var creimg = document.createElement("img");
    creimg.setAttribute("src", "image/tairyou.png");
    creimg.setAttribute("style", "position:fixed; bottom:10px; right:10px;");
    document.body.appendChild(creimg);
    n++;
    tairyou++;
  }
  let raabrjea = document.getElementById("1")!;
  //うさぎが500匹を超える毎にボタン再描画
  if (usagi >= 500 * n2) {
    var bleft = raabrjea.offsetLeft;
    var btop = raabrjea.offsetTop;
    console.log(bleft);
    var k = document.createElement("button");
    var n22 = n2 + 1;
    var n2c = "#" + n2;
    var n22c = "#" + n22;
    k.setAttribute("id", n22.toString());
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
