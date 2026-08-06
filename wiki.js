document.addEventListener("DOMContentLoaded", () => {
  // Active nav link
  const path = window.location.pathname;
  document.querySelectorAll(".nav-item").forEach((link) => {
    const href = link.getAttribute("href");
    if (href && path.endsWith(href.replace(/^\.\.\//, "").replace(/^\.\//, ""))) {
      link.classList.add("active");
    }
  });

  // Copy buttons on code blocks
  document.querySelectorAll("pre").forEach((pre) => {
    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.textContent = "Copy";
    btn.onclick = () => {
      navigator.clipboard.writeText(pre.querySelector("code")?.textContent || pre.textContent);
      btn.textContent = "✓";
      setTimeout(() => (btn.textContent = "Copy"), 1500);
    };
    pre.appendChild(btn);
  });
});

function initFilterableTable(id) {
  const table = document.getElementById(id);
  if (!table) return;
  const bar = table.previousElementSibling;
  if (!bar?.classList.contains("filter-bar")) return;
  const inputs = bar.querySelectorAll("select, input");
  const rows = [...table.querySelectorAll("tbody tr")];

  function filter() {
    const f = {};
    inputs.forEach((i) => { if (i.dataset.col && i.value) f[i.dataset.col] = i.value.toLowerCase(); });
    rows.forEach((r) => {
      const cells = r.querySelectorAll("td");
      r.style.display = Object.entries(f).every(([c, v]) => (cells[+c]?.textContent.toLowerCase().includes(v))) ? "" : "none";
    });
  }

  inputs.forEach((i) => i.addEventListener("input", filter));
}
