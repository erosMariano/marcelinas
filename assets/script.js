// ========================================
// CONFIGURAÇÃO INICIAL
// ========================================

const lenis = new Lenis();
const isMobile = window.innerWidth <= 768;

// Sincroniza o scroll suave do Lenis com o ScrollTrigger do GSAP
lenis.on("scroll", ScrollTrigger.update);

// Adiciona o método requestAnimationFrame do Lenis ao ticker do GSAP
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Desativa o lag smoothing do GSAP para evitar atrasos nas animações
gsap.ticker.lagSmoothing(0);

// ========================================
// INICIALIZAÇÃO DAS ANIMAÇÕES
// ========================================

window.addEventListener("load", () => {
  // ========================================
  // SEÇÃO HERO - Animação Inicial
  // ========================================

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

  // ========================================
  // SEÇÃO POTENCIAL
  // ========================================

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

  // Estado inicial — cards invisíveis e pequenos
  gsap.set(".nossos-servicos__cell", {
    opacity: 0,
    scale: 0.6,
    y: 40,
  });

  // Animação popup com stagger ao entrar na seção
  gsap.to(".nossos-servicos__cell", {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.6,
    ease: "back.out(1.8)",   // <- o "efeito borracha"
    stagger: 0.2,            
    scrollTrigger: {
      trigger: ".nossos-servicos__grid",
      start: "top -50%",    
      toggleActions: "play none none reverse",
    },
  });
  // ========================================
  // SEÇÃO FAQ - Animações de entrada
  // ========================================

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
    delay: 0.9,
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
    delay: 1.1,
    ease: "power2.out",
  });

  // ========================================
  // SEÇÃO FAQ - Funcionalidade do accordion
  // ========================================

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");
    const answerContent = item.querySelector(".faq-answer-content");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Fecha todos os outros itens antes de abrir o atual
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

      // Toggle do item clicado
      if (isOpen) {
        // Fecha o item
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
        // Abre o item
        item.classList.add("active");

        const contentHeight = answerContent.scrollHeight;

        gsap.to(answer, {
          height: contentHeight + 40,
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

  // Animação flutuante contínua na imagem
  gsap.to(".faq-section-wrapper .image-container", {
    y: -10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });

  // ========================================
  // SEÇÃO SOBRE NÓS
  // ========================================

  const sec = document.getElementById("v4");
  const els = sec.querySelectorAll("h1,.toy,.cta-row,.pill-tag,.desc");

  gsap.set(els, { opacity: 0, y: 28 });

  // Animação ao scroll
  gsap.to(els, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.08,
    ease: "power2.out",
    scrollTrigger: { trigger: sec, start: "top 80%" },
  });

  // Animação ao carregar (caso seja a primeira seção visível)
  gsap.to(els, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.08,
    ease: "power2.out",
    delay: 0.2,
  });

  // ========================================
  // SEÇÃO NOSSO PROCESSO - Scroll horizontal
  // ========================================

  const cardsProcess = gsap.utils.toArray(".nosso-processo .card");
  const cardsContainer = document.querySelector(
    ".nosso-processo .cards-container",
  );

  gsap.set(cardsProcess[0], { opacity: 1 });

  // Calcula o scroll horizontal total
  const totalScroll =
    cardsContainer.scrollWidth - window.innerWidth + (isMobile ? 24 : 50);

  // Cria animação de scroll horizontal
  const scrollTrack = gsap.to(cardsContainer, {
    x: -totalScroll,
    duration: cardsProcess.length,
    ease: "none",
    scrollTrigger: {
      trigger: ".nosso-processo .scroll-section",
      start: `top ${isMobile ? "24px" : "60px"}`,
      end: `+=${totalScroll}`,
      scrub: true,
      pin: true,
    },
  });

  // Anima cada card ao entrar na viewport durante o scroll horizontal
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
  // SEÇÃO CADA CONQUISTA
  // ========================================

  // Função para animar contador de números
  function animateCounter(element, finalValue) {
    const counter = { value: 0 };
    const duration = 2;

    gsap.to(counter, {
      value: finalValue,
      duration: duration,
      ease: "power2.out",
      onUpdate: function () {
        const hasPlus = element.textContent.includes("+");
        const rounded = Math.round(counter.value);
        element.textContent = hasPlus ? `${rounded}+` : rounded;
      },
    });
  }

  // Anima cards de conteúdo da esquerda
  gsap.utils.toArray(".cada-conquista .content").forEach((content, index) => {
    gsap.from(content, {
      scrollTrigger: {
        trigger: content,
        start: "top 80%",
        once: true,
      },
      opacity: 0,
      x: -50,
      duration: 0.8,
      delay: index * 0.15,
      ease: "power2.out",
    });
  });

  // Anima a imagem central (persona)
  gsap.from(".cada-conquista .persona", {
    scrollTrigger: {
      trigger: ".cada-conquista .persona",
      start: "top 80%",
      once: true,
    },
    opacity: 0,
    scale: 0.8,
    duration: 1,
    ease: "back.out(1.2)",
  });

  // Anima cards da direita com contador de números
  gsap.utils
    .toArray(".cada-conquista .content-right")
    .forEach((content, index) => {
      const numberElement = content.querySelector("p");
      const textContent = numberElement.textContent.trim();
      const finalValue = parseInt(textContent.replace("+", ""));

      gsap.from(content, {
        scrollTrigger: {
          trigger: content,
          start: "top 80%",
          once: true,
          onEnter: () => {
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

  // Anima título da seção
  gsap.from(".cada-conquista h2", {
    scrollTrigger: {
      trigger: ".cada-conquista h2",
      start: "top 85%",
      once: true,
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
  });

  // ========================================
  // MODAL DE VÍDEO
  // ========================================

  const openBtn = document.getElementById("openModal");
  const closeBtn = document.getElementById("closeModal");
  const modalOverlay = document.getElementById("modalOverlay");
  const modal = document.getElementById("modal");
  const video = modal.querySelector("video");
  // Função para abrir o modal com animação
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

  // Função para fechar o modal com animação
  function closeModal() {
    console.log("Fechando modal...");
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

    video.pause();
    video.currentTime = 0;
  }

  // Event listeners do modal
  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);

  // Fecha ao clicar fora do modal
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Fecha ao pressionar ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.style.visibility === "visible") {
      closeModal();
    }
  });

  // ========================================
  // SEÇÃO TESTEMONIALS (Depoimentos)
  // ========================================

  // Define estado inicial dos cards
  gsap.set(".testemonials .card", {
    opacity: 0,
    y: 50,
  });

  // Anima cards ao entrar na viewport
  gsap.utils.toArray(".testemonials .card").forEach((card, index) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: index * 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".testemonials",
        start: "top 80%",
        toggleActions: "play none none reverse",
        once: true,
      },
    });
  });

  // Hover effect nos cards
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
