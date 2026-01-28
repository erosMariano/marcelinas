const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

window.addEventListener('load', () => {
  console.log("oii");
  
  const tl = gsap.timeline({
    defaults: { duration: 1, ease: "power3.out" }
  });

  tl.to(".hero h1", {
    y: 0,
    opacity: 1,
    duration: 1.2
  }).to(".hero p", {
    y: 0,
    opacity: 1,
    duration: 1.2
  }, "-=0.8").to(".hero a", {
    y: 0,
    opacity: 1,
    duration: 1.2
  }, "-=0.6");
});