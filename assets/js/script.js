document.addEventListener("DOMContentLoaded", () => {

  // ============================
  // PHASE読み込み（最重要）
  // ============================
  let phase = localStorage.getItem("offlinePhase") || "phase0";
  let backFlag = localStorage.getItem("offlineBackFlag") || "none";

  // ============================
  // 解析（PHASE3 のときだけ発火）
  // ============================
  const form = document.getElementById("mainForm");
  if (form) {
    form.addEventListener("submit", (e) => {

      const currentPhase = localStorage.getItem("offlinePhase") || "phase0";

      if (currentPhase !== "phase3") {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      localStorage.setItem("offlinePhase", "phase3");

      // 解析演出を表示
      const overlay = document.getElementById("analysisOverlay");
      const textBox = document.getElementById("analysisText");

      if (overlay) overlay.style.display = "flex";

const logs = [
  "入力データを確認しています……",
  "表情パターンを解析しています……完了",
  "会話パターンを解析しています……完了",
  "行動パターンを解析しています……完了",
  "対人関係を解析しています……完了",
  "社会的特徴を統合しています……完了"
];

const finalMessage = "あなたの社会的特徴の再構成……";

let index = 0;

const typeFinalMessage = () => {
  let i = 0;
  const interval = setInterval(() => {
    textBox.innerHTML += finalMessage[i];
    i++;

    if (i >= finalMessage.length) {
      clearInterval(interval);
      setTimeout(() => {
        localStorage.setItem("offlinePhase", "phase4");
        window.location.href = "truth.html";
      }, 800);
    }
  }, 200);
};

const showNext = () => {
  if (textBox) textBox.innerHTML += logs[index] + "<br>";

  index++;

  if (index < logs.length) {
    setTimeout(showNext, 300 + Math.random() * 700);
  } else {
    typeFinalMessage();
  }
};
      showNext();
    });
  }

  // ============================
  // PHASE4：ステータス変更
  // ============================
  if (phase === "phase4") {
    const staff = document.getElementById("staffStatus");
    if (staff) staff.textContent = "担当スタッフ：稼働中";
  }

  // ============================
  // スタッフ返信トグル
  // ============================
  document.querySelectorAll(".reply-toggle").forEach(btn => {
    const body = btn.parentElement.querySelector(".reply-body");
    const icon = btn.querySelector(".toggle-icon");
    if (!body || !icon) return;

    body.style.display = "none";
    body.setAttribute("hidden", "");
    btn.setAttribute("aria-expanded", "false");

    icon.textContent = "▲";
    icon.style.transition = "transform 0.25s ease";

    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");

      if (!expanded) {
        body.style.display = "block";
        body.removeAttribute("hidden");
        icon.textContent = "▲";
        icon.style.transform = "rotate(180deg)";
      } else {
        body.style.display = "none";
        body.setAttribute("hidden", "");
        icon.textContent = "▲";
        icon.style.transform = "rotate(0deg)";
      }
    });
  });

  // ============================
  // PHASE1：契約不整合リンク → サイト改変
  // ============================
  const contractLink = document.getElementById("contractAlertLink");
  if (contractLink) {
    contractLink.addEventListener("click", (e) => {
      e.preventDefault();

      localStorage.setItem("offlinePhase", "phase2");
      phase = "phase2";

      document.body.classList.add("phase3-mode");

      const staff = document.getElementById("staffStatus");
      if (staff) staff.textContent = "スタッフID:2034";

      const officeImg = document.getElementById("officeImg");
      if (officeImg) {
        officeImg.src = "assets/images/office-02.jpg";
        officeImg.alt = "実験棟の写真";
        officeImg.style.cursor = "pointer";

        officeImg.addEventListener("click", () => {
          localStorage.setItem("offlineBackFlag", "returnToForm");
          window.location.href = "material.html";
        });
      }
    });
  }

  // ============================
  // phase2 のときはフォーム送信を完全に無効化
  // ============================
  if (phase === "phase2") {
    const form = document.getElementById("mainForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        return;
      });
    }
  }

  // ============================
  // 追加項目の初期状態
  // ============================
  const fields = document.getElementById("phase3Fields");
  if (fields) {
    fields.classList.add("phase3-hidden");
    fields.style.display = "none";
  }

  // ============================
  // material.html → 戻ってきたとき
  // ============================
  if (backFlag === "returnToForm") {

    if (fields) {
      fields.classList.remove("phase3-hidden");
      fields.classList.add("phase3-revealed");
      fields.style.display = "block";

      const warn = document.createElement("div");
      warn.className = "phase3-warning-bar";

      const warnText = document.createElement("span");
      warnText.className = "phase3-warning-text";
      warnText.textContent = "サービス向上のため、追加でご入力下さい";

      warn.appendChild(warnText);
      fields.parentNode.insertBefore(warn, fields);
    }

    setTimeout(() => {
      const form = document.getElementById("mainForm");
      if (form) form.scrollIntoView({ behavior: "smooth" });
    }, 50);

    localStorage.removeItem("offlineBackFlag");
  }

  // ============================
  // PHASE4：右下共有ボタン
  // ============================
  if (phase === "phase4") {
    const floating = document.getElementById("floatingShare");
    if (floating) floating.style.display = "block";
  }

});

// ============================
// リセットボタン
// ============================
const resetBtn = document.getElementById("resetPhase");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("offlinePhase");
    localStorage.removeItem("offlineBackFlag");
    window.location.reload();
  });
}

// ============================
// サイト改変演出
// ============================
const contractLink = document.getElementById("contractAlertLink");
if (contractLink) {
  contractLink.addEventListener("click", (e) => {
    e.preventDefault();

    const notice = document.getElementById("phaseNotice");
    if (notice) {
notice.style.opacity = "1";
notice.style.transform = "translateY(-50%) scale(1.05)";

setTimeout(() => {
  notice.style.opacity = "0";
  notice.style.transform = "translateY(-50%) scale(1)";
}, 2500);
    }

    // 既存の改変処理
    localStorage.setItem("offlinePhase", "phase2");
    phase = "phase2";

    document.body.classList.add("phase3-mode");

    const staff = document.getElementById("staffStatus");
    if (staff) staff.textContent = "スタッフID:2034";

    const officeImg = document.getElementById("officeImg");
    if (officeImg) {
      officeImg.src = "assets/images/office-02.jpg";
      officeImg.alt = "実験棟の写真";
      officeImg.style.cursor = "pointer";

      officeImg.addEventListener("click", () => {
        localStorage.setItem("offlineBackFlag", "returnToForm");
        window.location.href = "material.html";
      });
    }
  });
}