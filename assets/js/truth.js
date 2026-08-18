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

  if (!overlay || !logBox) return;

  overlay.style.display = "flex";
  logBox.innerHTML = "";

  let i = 0;

  function showNext() {
    if (i < logs.length) {
      let currentLine = logs[i];

      // ログの特定ワードを検出してスタイリング（赤字・揺れ）
      if (currentLine.includes("UNSTABLE")) {
        currentLine = currentLine.replace("UNSTABLE", '<span class="log-warn">UNSTABLE</span>');
      } else if (currentLine.includes("BYPASSED")) {
        currentLine = currentLine.replace("BYPASSED", '<span class="log-warn">BYPASSED</span>');
      } else if (currentLine.includes("STARTING SERVICE...")) {
        currentLine = '<span class="log-alert shake-word">' + currentLine + '</span>';
      }

      logBox.innerHTML += currentLine + "<br>";
      i++;
      setTimeout(showNext, 90 + Math.random() * 110); // テンポよく表示
    } else {
      // ▼ ① 解析ウィンドウのフェードアウト
      setTimeout(() => {
        overlay.style.transition = "opacity 0.6s ease";
        overlay.style.opacity = "0";

        // ▼ ② フェードアウト後に次へ遷移
        setTimeout(() => {
          proceedToNextPhase();
        }, 600);
      }, 1000);
    }
  }

  showNext();
}

// イベントリスナーの登録
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startServiceBtn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      spawnMultipleGlitches(10);
      startAnalysis();
    });
  }
});