const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on("scroll", ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);

window.addEventListener("load", () => {
  console.log("oii");

  const tl = gsap.timeline({
    defaults: { duration: 1, ease: "power3.out" },
  });

  tl.to(".hero h1", {
    y: 0,
    opacity: 1,
    duration: 1.2,
  })
    .to(
      ".hero p",
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
      },
      "-=0.8",
    )
    .to(
      ".hero a",
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
      },
      "-=0.6",
    );

  gsap.from(".potencial .tag, .potencial .container_imgs img, .potencial h2", {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".potencial .tag",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  gsap.from(".potencial p, .potencial a", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".potencial p",
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  // Seção de Nossos serviços
  const textItems = document.querySelectorAll(".text-item");
  const imageItems = document.querySelectorAll(".image-item");
  const scrollSections = document.querySelectorAll(".scroll-section");
  const isMobile = window.innerWidth <= 768;

  if(!isMobile){
    // Ativa o primeiro item
    textItems[0].classList.add("active");
    imageItems[0].classList.add("active");
  
    // Cria animação para cada seção
    scrollSections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => activateItem(index),
        onEnterBack: () => activateItem(index),
      });
    });
  
    textItems.forEach((item) => {
      item.addEventListener("click", () => {
        activateItem(parseInt(item.dataset.index));
      });
    });
    
    function activateItem(index) {
      console.log("Ativando item", index);
      // Remove active de todos
      textItems.forEach((item) => item.classList.remove("active"));
      imageItems.forEach((item) => item.classList.remove("active"));
  
      // Adiciona active no item atual
      textItems[index].classList.add("active");
  
      // Anima TODAS as imagens
      imageItems.forEach((image, i) => {
        if (i === index) {
          // Imagem atual: fade in
          gsap.to(image, {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          });
          image.classList.add("active");
        } else {
          // Outras imagens: fade out
          gsap.to(image, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          });
        }
      });
    }
  
    imageItems.forEach((image, index) => {
      gsap.set(image, {
        opacity: index === 0 ? 1 : 0,
        scale: 1,
      });
    });
  }
});
