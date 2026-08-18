document.addEventListener("DOMContentLoaded", () => {

  // ============================
  // SPハンバーガーメニュー開閉制御
  // ============================
  const ghHamburger = document.getElementById("ghHamburger");
  const ghNavMobile = document.getElementById("ghNavMobile");

  if (ghHamburger && ghNavMobile) {
    ghHamburger.addEventListener("click", () => {
      ghNavMobile.classList.toggle("is-open");
    });

    const mobileNavLinks = ghNavMobile.querySelectorAll("a");
    mobileNavLinks.forEach(link => {
      link.addEventListener("click", () => {
        ghNavMobile.classList.remove("is-open");
      });
    });
  }

  // ============================
  // PHASE読み込み
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

      // phase3以外は送信処理を遮断（または演出に進ませない）
      if (currentPhase !== "phase3") {
        e.preventDefault();
        return;
      }

      e.preventDefault();

      // 必須入力チェック
      const requiredFields = form.querySelectorAll("input[required]");
      let isValid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add("input-error");
        } else {
          field.classList.remove("input-error");
        }
      });

      if (!isValid) {
        alert("未入力の項目があります。すべて入力してください。");
        return;
      }

      localStorage.setItem("offlinePhase", "phase3");

      // 解析演出を表示
      const overlay = document.getElementById("analysisOverlay");
      const textBox = document.getElementById("analysisText");

      if (overlay) overlay.style.display = "flex";
      if (textBox) textBox.innerHTML = "";

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
          if (textBox) textBox.innerHTML += finalMessage[i];
          i++;

          if (i >= finalMessage.length) {
            clearInterval(interval);
            setTimeout(() => {
              localStorage.setItem("offlinePhase", "phase4");
              window.location.href = "truth.html";
            }, 800);
          }
        }, 150);
      };

      const showNext = () => {
        if (textBox) textBox.innerHTML += logs[index] + "<br>";
        index++;

        if (index < logs.length) {
          setTimeout(showNext, 300 + Math.random() * 500);
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

      const notice = document.getElementById("phaseNotice");
      if (notice) {
        notice.style.opacity = "1";
        notice.style.pointerEvents = "auto";

        setTimeout(() => {
          notice.style.opacity = "0";
          notice.style.pointerEvents = "none";
        }, 2500);
      }

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
          // 1. クリックされた瞬間に画面全体の操作を即座にブロック
          document.body.style.pointerEvents = "none";
          document.body.style.cursor = "wait";

          const notice = document.getElementById("phaseNotice");

          if (notice) {
            // 2. 異常探知モーダルを表示（pointerEventsを1つ上で遮断しているので表示だけでOK）
            notice.style.opacity = "1";

            // 3. 0.3秒後にページ移動
            setTimeout(() => {
              localStorage.setItem("offlineBackFlag", "returnToForm");
              window.location.href = "material.html";
            }, 2500);
          } else {
            localStorage.setItem("offlineBackFlag", "returnToForm");
            window.location.href = "material.html";
          }
        });
      }
    });
  }

  // ============================
  // PHASE2 のときはフォーム送信を無効化
  // ============================
  if (phase === "phase2") {
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        return;
      });
    }
  }

  // ============================
  // PHASE3 追加項目の初期状態
  // ============================
  const fields = document.getElementById("phase3Fields");

  // ============================
  // material.html → 戻ってきたとき（PHASE3展開）
  // ============================
  if (backFlag === "returnToForm") {
    localStorage.setItem("offlinePhase", "phase3");

    if (fields) {
      fields.classList.remove("phase3-hidden");
      fields.style.display = "block";
    }

    setTimeout(() => {
      if (form) form.scrollIntoView({ behavior: "smooth" });
    }, 100);

    localStorage.removeItem("offlineBackFlag");
  }

  // ============================
  // PHASE4：右下共有ボタン表示
  // ============================
  if (phase === "phase4") {
    const floating = document.getElementById("floatingShare");
    if (floating) floating.style.display = "block";
  }

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

});