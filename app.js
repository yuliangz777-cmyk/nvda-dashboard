const data = window.NVDA_DATA;

document.getElementById("asOf").textContent = `資料框架 · ${new Date().toLocaleDateString("zh-TW")}`;

if (window.Chart) {
  const ctx = document.getElementById("revenueChart");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: data.annualRevenue.labels,
      datasets: [{
        data: data.annualRevenue.values,
        borderColor: "#76e79d",
        backgroundColor: "rgba(118,231,157,.12)",
        pointBackgroundColor: "#b6f36f",
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
        tension: .35,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: { legend: { display: false }, tooltip: { displayColors: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: "#8ca79a", font: { family: "DM Mono" } } },
        y: { beginAtZero: true, grid: { color: "rgba(173,255,204,.08)" }, ticks: { color: "#8ca79a", callback: v => `$${v}B`, font: { family: "DM Mono" } } }
      }
    }
  });
}

const productGrid = document.getElementById("productGrid");
data.products.forEach((product, i) => {
  const article = document.createElement("article");
  article.className = "panel product-card";
  article.tabIndex = 0;
  article.innerHTML = `<span class="number">0${i + 1}</span><h3>${product.name}</h3><p>${product.desc}</p><div class="indicator">WATCH · ${product.indicator}</div>`;
  const activate = () => {
    document.querySelectorAll(".product-card").forEach(el => el.classList.remove("active"));
    article.classList.add("active");
  };
  article.addEventListener("click", activate);
  article.addEventListener("keydown", e => { if (e.key === "Enter") activate(); });
  productGrid.appendChild(article);
});

const chainFlow = document.getElementById("chainFlow");
const chainDetail = document.getElementById("chainDetail");
function showChain(index) {
  const item = data.chain[index];
  document.querySelectorAll(".chain-node").forEach((el, i) => el.classList.toggle("active", i === index));
  chainDetail.innerHTML = `<h3>${item.title}<br><span style="color:#76e79d">${item.subtitle}</span></h3><div><h4>在鏈上的作用</h4><p>${item.role}</p></div><div><h4>要追蹤什麼</h4><p>${item.watch}</p></div>`;
}
data.chain.forEach((item, i) => {
  const button = document.createElement("button");
  button.className = "chain-node";
  button.type = "button";
  button.innerHTML = `<strong>${item.title}</strong>${item.subtitle}`;
  button.addEventListener("click", () => showChain(i));
  chainFlow.appendChild(button);
});
showChain(0);

document.querySelectorAll("[data-persist]").forEach(input => {
  const key = `nvda-check-${input.dataset.persist}`;
  input.checked = localStorage.getItem(key) === "true";
  input.addEventListener("change", () => localStorage.setItem(key, input.checked));
});

const notes = document.getElementById("decisionNotes");
const saveState = document.getElementById("saveState");
notes.value = localStorage.getItem("nvda-decision-notes") || "";
let saveTimer;
notes.addEventListener("input", () => {
  saveState.textContent = "儲存中…";
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    localStorage.setItem("nvda-decision-notes", notes.value);
    saveState.textContent = "已儲存在此裝置";
  }, 350);
});
document.getElementById("clearNotes").addEventListener("click", () => {
  notes.value = "";
  localStorage.removeItem("nvda-decision-notes");
  saveState.textContent = "已清除";
});

const tvScript = document.createElement("script");
tvScript.src = "https://s3.tradingview.com/tv.js";
tvScript.onload = () => new TradingView.widget({
  autosize: true,
  symbol: "NASDAQ:NVDA",
  interval: "D",
  timezone: "Asia/Taipei",
  theme: "dark",
  style: "1",
  locale: "zh_TW",
  toolbar_bg: "#07100d",
  enable_publishing: false,
  allow_symbol_change: true,
  container_id: "tradingview_chart",
  hide_side_toolbar: false,
  studies: ["MASimple@tv-basicstudies", "RSI@tv-basicstudies"]
});
document.body.appendChild(tvScript);
