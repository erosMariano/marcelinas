const lenis = new Lenis();
const isMobile = window.innerWidth <= 768;

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
  const scrollSections = document.querySelectorAll(
    ".nossos-servicos .scroll-section",
  );

  if (!isMobile) {
    // Ativa o primeiro item
    textItems[0].classList.add("active");
    imageItems[0].classList.add("active");

    let scrollTriggersArray = [];
    let isManualClick = false;

    // Cria animação para cada seção
    scrollSections.forEach((section, index) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 0%",
        end: "bottom center",
        onEnter: () => {
          if (!isManualClick) activateItem(index);
        },
        onEnterBack: () => {
          if (!isManualClick) activateItem(index);
        },
      });
      scrollTriggersArray.push(trigger);
    });

    textItems.forEach((item) => {
      item.addEventListener("click", () => {
        const index = parseInt(item.dataset.index);
        isManualClick = true;
        activateItem(index);

        // Faz scroll suave até a seção correspondente
        if (scrollSections[index]) {
          lenis.scrollTo(scrollSections[index], {
            offset: -window.innerHeight / 2,
            duration: 1.2,
            onComplete: () => {
              // Reabilita os triggers após o scroll completar
              setTimeout(() => {
                isManualClick = false;
              }, 100);
            },
          });
        }
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
  gsap.to(".faq-section-wrapper .image-container", {
    y: -10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });

  // Sobre nós

  let cards = gsap.utils.toArray(".stackCard");

  let stickDistance = 0;

  let firstCardST = ScrollTrigger.create({
    trigger: cards[0],
    start: "center center",
  });

  let lastCardST = ScrollTrigger.create({
    trigger: cards[cards.length - 1],
    start: "center center",
  });

  cards.forEach((card, index) => {
    var scale = 1 - (cards.length - index) * 0.025;
    let scaleDown = gsap.to(card, {
      scale: scale,
      "transform-origin": '"50% ' + (lastCardST.start + stickDistance) + '"',
    });

    ScrollTrigger.create({
      trigger: card,
      start: "center center",
      end: () => lastCardST.start + stickDistance,
      pin: true,
      markers: false,
      pinSpacing: false,
      ease: "none",
      animation: scaleDown,
      toggleActions: "restart none none reverse",
    });
  });

  // Nossos processos
  const cardsProcess = gsap.utils.toArray(".nosso-processo .card");
  const cardsContainer = document.querySelector(
    ".nosso-processo .cards-container",
  );
  gsap.set(cardsProcess[0], { opacity: 1 });

  const totalScroll =
    cardsContainer.scrollWidth - window.innerWidth + (isMobile ? 24 : 50);
  const scrollTrack = gsap.to(cardsContainer, {
    x: -totalScroll,
    duration: cardsProcess.length,
    ease: "none",
    scrollTrigger: {
      trigger: ".nosso-processo .scroll-section",
      start: `top ${isMobile ? "24px" : "80px"}`,
      end: `+=${totalScroll}`,
      scrub: true,
      pin: true,
    },
  });

  cardsProcess.forEach((card, index) => {
    gsap.to(card, {
      opacity: 1,
      scrollTrigger: {
        trigger: card,
        start: "left 95%",
        end: "left 90%",
        scrub: true,
        containerAnimation: scrollTrack,
      },
    });
  });

  // ========================================
  // ANIMAÇÕES DA SEÇÃO CADA-CONQUISTA
  // ========================================

  // Função para animar números (counter)
  function animateCounter(element, finalValue) {
    const counter = { value: 0 };
    const duration = 2; // duração da animação em segundos

    gsap.to(counter, {
      value: finalValue,
      duration: duration,
      ease: "power2.out",
      onUpdate: function () {
        // Se o número tiver '+', mantém o '+'
        const hasPlus = element.textContent.includes("+");
        const rounded = Math.round(counter.value);
        element.textContent = hasPlus ? `${rounded}+` : rounded;
      },
    });
  }

  // Anima os cards de conteúdo da esquerda
  gsap.utils.toArray(".cada-conquista .content").forEach((content, index) => {
    gsap.from(content, {
      scrollTrigger: {
        trigger: content,
        start: "top 80%",
        once: true, // executa apenas uma vez
        // markers: true // descomente para debug
      },
      opacity: 0,
      x: -50,
      duration: 0.8,
      delay: index * 0.15, // delay progressivo para cada card
      ease: "power2.out",
    });
  });

  // Anima a persona (imagem central)
  gsap.from(".cada-conquista .persona", {
    scrollTrigger: {
      trigger: ".cada-conquista .persona",
      start: "top 80%",
      once: true, // executa apenas uma vez
    },
    opacity: 0,
    scale: 0.8,
    duration: 1,
    ease: "back.out(1.2)",
  });

  // Anima os cards da direita (com números)
  gsap.utils
    .toArray(".cada-conquista .content-right")
    .forEach((content, index) => {
      const numberElement = content.querySelector("p");
      const textContent = numberElement.textContent.trim();

      // Extrai o número (remove '+' se existir)
      const finalValue = parseInt(textContent.replace("+", ""));

      // Animação de entrada do card
      gsap.from(content, {
        scrollTrigger: {
          trigger: content,
          start: "top 80%",
          once: true, // executa apenas uma vez
          onEnter: () => {
            // Inicia o contador quando o card entra na viewport
            animateCounter(numberElement, finalValue);
          },
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: index * 0.15,
        ease: "power2.out",
      });
    });

  // Anima o título h2 da seção
  gsap.from(".cada-conquista h2", {
    scrollTrigger: {
      trigger: ".cada-conquista h2",
      start: "top 85%",
      once: true, // executa apenas uma vez
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
  });

  // Animação do modal de video

  const openBtn = document.getElementById("openModal");
  const closeBtn = document.getElementById("closeModal");
  const modalOverlay = document.getElementById("modalOverlay");
  const modal = document.getElementById("modal");

  // Timeline for opening animation
  function openModal() {
    modalOverlay.style.visibility = "visible";

    const tl = gsap.timeline();

    tl.to(modalOverlay, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    }).to(
      modal,
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "-=0.1",
    );
  }

  // Timeline for closing animation
  function closeModal() {
    const tl = gsap.timeline({
      onComplete: () => {
        modalOverlay.style.visibility = "hidden";
      },
    });

    tl.to(modal, {
      scale: 0.7,
      opacity: 0,
      duration: 0.3,
      ease: "back.in(1.7)",
    }).to(
      modalOverlay,
      {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      },
      "-=0.1",
    );
  }

  // Event listeners
  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);

  // Close on overlay click
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.style.visibility === "visible") {
      closeModal();
    }
  });

  // Testemonials

  // Definir estado inicial dos cards
  gsap.set(".testemonials .card", {
    opacity: 0,
    y: 50,
  });

  // Animação dos cards ao aparecer na tela
  gsap.utils.toArray(".testemonials .card").forEach((card, index) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: index * 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".testemonials", // Trigger na seção inteira
        start: "top 80%", // Quando a seção chegar a 80% da viewport
        toggleActions: "play none none reverse",
        once: true, // Anima apenas uma vez
      },
    });
  });

  // Animação hover suave adicional
  const cardsTestemonials = document.querySelectorAll(".testemonials .card");
  cardsTestemonials.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
});
