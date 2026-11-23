/* FaceoffEdge v2: scroll reveal for non-hero sections. Never touches forms. */
(function () {
  if (window.__feV2) return;
  window.__feV2 = true;
  try {
    var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    var hasIO = "IntersectionObserver" in window;
    var io = hasIO ? new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }) : null;

    function scan() {
      if (!hasIO) return;
      document.documentElement.classList.add("fe-js");
      var secs = document.querySelectorAll("[data-screen-label]");
      Array.prototype.forEach.call(secs, function (sec) {
        var label = sec.getAttribute("data-screen-label") || "";
        if (/hero|nav|footer|marquee|reaction-clock/.test(label)) return;
        var kids = sec.querySelectorAll(':scope > [data-r~="pad"] > *');
        var i = 0;
        Array.prototype.forEach.call(kids, function (el) {
          if (el.getAttribute("data-fe-rv")) return;
          if (el.querySelector && el.querySelector("form")) return;      // leave forms completely alone
          var pos = el.style && el.style.position;
          if (pos === "absolute" || pos === "fixed") return;
          el.setAttribute("data-fe-rv", "1");
          el.classList.add("rv");
          if (!reduce) el.style.setProperty("--d", Math.min(i, 4) * 0.06 + "s");
          i++;
          io.observe(el);
        });
      });
    }

    // Safety net: never leave content hidden if the observer is slow or unavailable.
    function sweep() {
      Array.prototype.forEach.call(document.querySelectorAll(".rv:not(.in)"), function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < (window.innerHeight || 800)) el.classList.add("in");
      });
    }

    var t = null;
    function later() { clearTimeout(t); t = setTimeout(function () { scan(); }, 120); }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", later); else later();
    window.addEventListener("load", function () { later(); setTimeout(sweep, 2500); });
    if ("MutationObserver" in window) new MutationObserver(later).observe(document.documentElement, { childList: true, subtree: true });
  } catch (e) {}
})();
