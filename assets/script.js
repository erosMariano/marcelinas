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

  if (!isMobile) {
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

  // FAQ

  // Animação inicial da página
  // Animação quando chegar na seção FAQ
  gsap.from(".faq-section-wrapper .container", {
    scrollTrigger: {
      trigger: ".faq-section-wrapper",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    ease: "power3.out",
  });

  gsap.from(".faq-content h1", {
    scrollTrigger: {
      trigger: ".faq-section-wrapper",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    duration: 0.6,
    y: 30,
    opacity: 0,
    delay: 0.3,
    ease: "power2.out",
  });

  gsap.from(".faq-content > p", {
    scrollTrigger: {
      trigger: ".faq-section-wrapper",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    duration: 0.6,
    y: 20,
    opacity: 0,
    delay: 0.4,
    ease: "power2.out",
  });

  gsap.from(".faq-item", {
    scrollTrigger: {
      trigger: ".faq-section-wrapper",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    duration: 0.5,
    y: 20,
    opacity: 0,
    stagger: 0.1,
    delay: 0.5,
    ease: "power2.out",
  });

  gsap.from(".faq-section-wrapper .image-container", {
    scrollTrigger: {
      trigger: ".faq-section-wrapper",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    duration: 0.8,
    scale: 0.8,
    opacity: 0,
    delay: 0.6,
    ease: "back.out(1.7)",
  });

  gsap.from(".image-section .tag", {
    scrollTrigger: {
      trigger: ".faq-section-wrapper",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    duration: 0.6,
    y: 20,
    opacity: 0,
    delay: 0.7,
    ease: "power2.out",
  });

  gsap.from(".image-section h2", {
    scrollTrigger: {
      trigger: ".faq-section-wrapper",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    duration: 0.6,
    y: 20,
    opacity: 0,
    delay: 0.9, // aparece depois da tag
    ease: "power2.out",
  });

  gsap.from(".image-section p", {
    scrollTrigger: {
      trigger: ".faq-section-wrapper",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    duration: 0.6,
    y: 20,
    opacity: 0,
    delay: 1.1, // aparece depois do h2
    ease: "power2.out",
  });

  // Funcionalidade do FAQ
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");
    const answerContent = item.querySelector(".faq-answer-content");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Fecha todos os outros itens
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          const otherAnswer = otherItem.querySelector(".faq-answer");
          const otherIcon = otherItem.querySelector(".faq-icon");

          gsap.to(otherAnswer, {
            height: 0,
            duration: 0.3,
            ease: "power2.inOut",
          });

          gsap.to(otherIcon, {
            rotation: 0,
            duration: 0.3,
            ease: "power2.inOut",
          });
        }
      });

      // Toggle do item atual
      if (isOpen) {
        item.classList.remove("active");

        gsap.to(answer, {
          height: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });

        gsap.to(icon, {
          rotation: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });

        gsap.to(answerContent, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.inOut",
        });
      } else {
        item.classList.add("active");

        // Calcula a altura do conteúdo
        const contentHeight = answerContent.scrollHeight;

        gsap.to(answer, {
          height: contentHeight + 40, // +40 para padding
          duration: 0.4,
          ease: "power2.inOut",
        });

        gsap.to(icon, {
          rotation: 45,
          duration: 0.3,
          ease: "power2.inOut",
        });

        gsap.to(answerContent, {
          opacity: 1,
          duration: 0.3,
          delay: 0.1,
          ease: "power2.inOut",
        });
      }
    });
  });

  // Animação flutuante na imagem
  gsap.to(".image-container", {
    y: -20,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });
});
