(function () {
  const skillsData = [
    { name: "HTML5", category: "frontend", label: "Frontend · Semantic Markup", level: 90 },
    { name: "CSS3 & Responsive Design", category: "frontend", label: "Frontend · Flexbox & Grid", level: 85 },
    { name: "JavaScript (ES6+)", category: "frontend", label: "Frontend · DOM & Events", level: 80 },
    { name: "UI Layout & Accessibility", category: "frontend", label: "Frontend · Mobile-First", level: 78 },
    { name: "Git & GitHub", category: "tools", label: "Tools · Version Control", level: 82 },
    { name: "GitHub Pages", category: "tools", label: "Tools · Static Deployment", level: 85 }
  ];

  const projectsData = [
    {
      id: "portfolio",
      title: "Personal Portfolio Website",
      category: "javascript",
      badge: "HTML · CSS · JS",
      thumbClass: "",
      shortDesc: "A responsive multi-section portfolio with theme switching, interactive filtering, and form validation.",
      fullDesc: "Built from scratch using semantic HTML5, responsive CSS Grid/Flexbox with custom theme variables, and vanilla JavaScript for dark/light mode, skill & project filtering, typing animation, and contact form validation.",
      tags: ["HTML5", "CSS3", "JavaScript", "Responsive"]
    },
    {
      id: "task-tracker",
      title: "Interactive Study Task Tracker",
      category: "javascript",
      badge: "JavaScript App",
      thumbClass: "alt-2",
      shortDesc: "Client-side task manager supporting task creation, completion toggles, and status filtering.",
      fullDesc: "Demonstrates DOM manipulation, event delegation, state updates, and persistent browser storage so students can organize assignments and deadlines cleanly.",
      tags: ["JavaScript", "DOM API", "CSS Flexbox"]
    },
    {
      id: "landing-page",
      title: "Responsive Product Landing Page",
      category: "html-css",
      badge: "HTML & CSS",
      thumbClass: "alt-3",
      shortDesc: "Clean multi-breakpoint landing page featuring a responsive navigation bar, feature cards, and pricing table.",
      fullDesc: "Focused on mobile-first media queries, accessible typography, and fluid grid layouts that adapt smoothly across mobile, tablet, and desktop viewports.",
      tags: ["HTML5", "CSS Grid", "Media Queries"]
    }
  ];

  const htmlEl = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navLinkItems = document.querySelectorAll(".nav-link");
  const skillsGrid = document.getElementById("skillsGrid");
  const skillFilters = document.getElementById("skillFilters");
  const projectsGrid = document.getElementById("projectsGrid");
  const projectFilters = document.getElementById("projectFilters");
  const backToTop = document.getElementById("backToTop");
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  const emailValue = document.getElementById("emailValue");
  const contactForm = document.getElementById("contactForm");
  const projectModal = document.getElementById("projectModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalTags = document.getElementById("modalTags");
  const toast = document.getElementById("toast");

  document.getElementById("currentYear").textContent = new Date().getFullYear();

  function applyTheme(theme) {
    htmlEl.setAttribute("data-theme", theme);
    themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  try {
    const savedTheme = localStorage.getItem("portfolio_theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      applyTheme(savedTheme);
    }
  } catch (e) {}

  themeToggle.addEventListener("click", function () {
    const nextTheme = htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try {
      localStorage.setItem("portfolio_theme", nextTheme);
    } catch (e) {}
  });

  menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinkItems.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  const phrases = [
    "B.Tech. Student at SRMU",
    "HTML · CSS · JavaScript Builder",
    "Responsive Web Enthusiast"
  ];
  const typingText = document.getElementById("typingText");
  let phraseIndex = 0;
  let charIndex = phrases[0].length;
  let isDeleting = true;

  function tickTyping() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      charIndex--;
      typingText.textContent = current.slice(0, charIndex);
      if (charIndex <= 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
      setTimeout(tickTyping, 45);
    } else {
      charIndex++;
      typingText.textContent = current.slice(0, charIndex);
      if (charIndex >= current.length) {
        isDeleting = true;
        setTimeout(tickTyping, 1500);
      } else {
        setTimeout(tickTyping, 75);
      }
    }
  }
  setTimeout(tickTyping, 1500);

  function renderSkills(filter) {
    const filtered = filter === "all"
      ? skillsData
      : skillsData.filter(function (s) { return s.category === filter; });

    skillsGrid.innerHTML = filtered.map(function (skill) {
      return (
        '<article class="skill-card">' +
          '<div class="skill-top">' +
            '<span class="skill-name">' + skill.name + '</span>' +
            '<span class="skill-pct">' + skill.level + '%</span>' +
          '</div>' +
          '<div class="skill-cat">' + skill.label + '</div>' +
          '<div class="progress-track">' +
            '<div class="progress-fill" data-width="' + skill.level + '%"></div>' +
          '</div>' +
        '</article>'
      );
    }).join("");

    requestAnimationFrame(function () {
      skillsGrid.querySelectorAll(".progress-fill").forEach(function (bar) {
        bar.style.width = bar.getAttribute("data-width");
      });
    });
  }

  skillFilters.addEventListener("click", function (e) {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    skillFilters.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    renderSkills(btn.getAttribute("data-filter"));
  });

  function renderProjects(filter) {
    const filtered = filter === "all"
      ? projectsData
      : projectsData.filter(function (p) { return p.category === filter; });

    projectsGrid.innerHTML = filtered.map(function (proj) {
      const tagsHtml = proj.tags.map(function (t) {
        return '<span class="tag">' + t + '</span>';
      }).join("");

      return (
        '<article class="project-card">' +
          '<div class="project-thumb ' + proj.thumbClass + '">' +
            '<span class="project-badge">' + proj.badge + '</span>' +
            '<div class="project-thumb-title">' + proj.title + '</div>' +
          '</div>' +
          '<div class="project-body">' +
            '<p>' + proj.shortDesc + '</p>' +
            '<div class="tag-row">' + tagsHtml + '</div>' +
            '<div class="project-actions">' +
              '<button class="btn btn-primary btn-sm view-project-btn" type="button" data-id="' + proj.id + '">View Details</button>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }).join("");
  }

  projectFilters.addEventListener("click", function (e) {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    projectFilters.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    renderProjects(btn.getAttribute("data-filter"));
  });

  projectsGrid.addEventListener("click", function (e) {
    const btn = e.target.closest(".view-project-btn");
    if (!btn) return;
    const proj = projectsData.find(function (p) { return p.id === btn.getAttribute("data-id"); });
    if (!proj) return;
    modalTitle.textContent = proj.title;
    modalDesc.textContent = proj.fullDesc;
    modalTags.innerHTML = proj.tags.map(function (t) {
      return '<span class="tag">' + t + '</span>';
    }).join("");
    projectModal.classList.add("open");
  });

  closeModalBtn.addEventListener("click", function () {
    projectModal.classList.remove("open");
  });

  projectModal.addEventListener("click", function (e) {
    if (e.target === projectModal) {
      projectModal.classList.remove("open");
    }
  });

  let toastTimer = null;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2800);
  }

  copyEmailBtn.addEventListener("click", function () {
    const text = emailValue.textContent.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast("Email copied to clipboard!");
      }).catch(function () {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
  });

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast("Email copied to clipboard!");
    } catch (e) {
      showToast("Copy failed — please select and copy manually.");
    }
    document.body.removeChild(ta);
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const nameInput = document.getElementById("senderName");
    const emailInput = document.getElementById("senderEmail");
    const msgInput = document.getElementById("senderMessage");
    const nameErr = document.getElementById("nameError");
    const emailErr = document.getElementById("emailError");
    const msgErr = document.getElementById("messageError");

    nameErr.textContent = "";
    emailErr.textContent = "";
    msgErr.textContent = "";

    let valid = true;
    if (nameInput.value.trim().length < 2) {
      nameErr.textContent = "Please enter at least 2 characters.";
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      emailErr.textContent = "Please enter a valid email address.";
      valid = false;
    }
    if (msgInput.value.trim().length < 10) {
      msgErr.textContent = "Please write a message of at least 10 characters.";
      valid = false;
    }

    if (!valid) return;

    showToast("Thanks, " + nameInput.value.trim() + "! Your message has been recorded.");
    contactForm.reset();
  });

  const sections = document.querySelectorAll("main section[id]");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 320) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }

    let activeId = "home";
    sections.forEach(function (sec) {
      if (window.scrollY >= sec.offsetTop - 120) {
        activeId = sec.id;
      }
    });

    navLinkItems.forEach(function (link) {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === "#" + activeId);
    });
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  renderSkills("all");
  renderProjects("all");
})();
