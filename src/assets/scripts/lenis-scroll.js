import Lenis from "lenis";

const lenis = new Lenis({
  autoRaf: true, // Usa su propio requestAnimationFrame
  smooth: true,
  lerp: 0.1,
});

lenis.on("scroll", (e) => {
  // console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
