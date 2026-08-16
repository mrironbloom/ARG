// PHASEチェック
const phase = localStorage.getItem("offlinePhase");

/* ============================
   PHASE2：異常演出
============================ */
if (phase === "phase2") {

  const originalTitle = document.title;
  document.title = "端末同期中...";
  setTimeout(() => {
    document.title = originalTitle;
  }, 1200);

  const alertBar = document.createElement("div");
  alertBar.className = "phase2-alert";
  alertBar.textContent = "警告：一部データに不一致が検出されました。";
  document.body.prepend(alertBar);

  setTimeout(() => alertBar.classList.add("show"), 100);
  setTimeout(() => alertBar.classList.remove("show"), 3000);

  const imgs = document.querySelectorAll(".material-img, .compare-img");
  imgs.forEach(img => img.classList.add("phase2-img-broken"));
}

/* ============================
   適合率
============================ */
function generateCompareRate() {
  if (phase === "phase2") {
    return (85 + Math.random() * 10).toFixed(1);
  }
  return (60 + Math.random() * 20).toFixed(1);
}

const compareRate = generateCompareRate();
const compareRateElement = document.getElementById("compareRate");
if (compareRateElement) {
  compareRateElement.textContent = compareRate + "%";
}

/* ============================
   照合ログ
============================ */
const compareLog = document.getElementById("compareLog");
if (compareLog) {
  compareLog.textContent += `\n[LOG] 適合率：${compareRate}% を検出しました。`;

  if (phase === "phase2") {
    compareLog.textContent += `\n[WARN] 特徴データの一部が既存情報と重複しています。`;
  }
}

/* ============================
   PHASE3 遷移（唯一のイベント）
============================ */
document.getElementById("toFormBtn").addEventListener("click", () => {
  localStorage.setItem("offlinePhase", "phase3");
  window.location.href = "index.html#form";
});
