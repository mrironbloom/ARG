// ▼ フェーズ遷移（解析ログの後に呼ばれる）
function proceedToNextPhase() {
  localStorage.setItem("offlinePhase", "phase4");
  window.location.href = "index.html";
}

// ▼ 解析ログに流す内容
const logs = [
  "> INITIALIZING CORE MODULE...",
  "> USER_PROFILE_SYNC: OK",
  "> MEMORY_TRACE: FOUND",
  "> CONTACT_POINT: UNSTABLE",
  "> OVERRIDE: ENABLED",
  "> PROCESSING REQUEST...",
  "> AUTHORIZATION: BYPASSED",
  "> STARTING SERVICE...",
];

// ▼ 複数の縦ノイズを発生させる
function spawnMultipleGlitches(count = 6) {
  for (let i = 0; i < count; i++) {
    const glitch = document.createElement("div");
    glitch.classList.add("multiGlitch");

    // ランダム位置に配置
    glitch.style.left = Math.random() * 100 + "vw";

    document.body.appendChild(glitch);

    // アニメーション開始
    glitch.style.animation = "glitchLine 0.4s";

    // 終わったら削除
    setTimeout(() => glitch.remove(), 500);
  }
}

// ▼ 解析ログ演出
function startAnalysis() {
  const overlay = document.getElementById("analysisOverlay");
  const logBox = document.getElementById("analysisLog");

  overlay.style.display = "flex";
  logBox.textContent = "";

  let i = 0;

  function showNext() {
    if (i < logs.length) {
      logBox.textContent += logs[i] + "\n";
      i++;
      setTimeout(showNext, 80 + Math.random() * 120); // 高速＆揺らぎ
    } else {
      // ▼ ① 解析ウィンドウのフェードアウト
      document.getElementById("analysisWindow").style.animation =
        "analysisFadeOut 0.6s forwards";

      // ▼ ② 複数縦ノイズを発生させる（ここがクライマックス）
      spawnMultipleGlitches(6); // ← 好きな本数に変更OK

      // ▼ ③ ノイズ後に遷移
      setTimeout(() => {
        overlay.style.display = "none";
        proceedToNextPhase();
      }, 700);
    }
  }

  showNext();
}

// ▼ ボタン押下で解析ログを開始
document.getElementById("startServiceBtn").addEventListener("click", () => {
  startAnalysis();
});
