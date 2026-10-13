(() => {
  "use strict";

  // Elements
  const searchInput = document.getElementById("serviceSearch");
  const categoryFilter = document.getElementById("categoryFilter");
  const serviceCards = [...document.querySelectorAll(".service-card")];
  const resultCount = document.getElementById("resultCount");
  const noResults = document.getElementById("noResults");
  const sidebarSearch = document.getElementById("sidebarSearch");
  const menuToggle = document.getElementById("menuToggle");
  const primaryNav = document.getElementById("primaryNav");

  // Filter Services Function
  function filterServices() {
    if (!searchInput || !categoryFilter) return;
    const query = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    let visible = 0;

    serviceCards.forEach((card) => {
      const matchesText = `${card.textContent} ${card.dataset.search || ""}`.toLowerCase().includes(query);
      const matchesCategory = category === "all" || card.dataset.category === category;
      const show = matchesText && matchesCategory;
      card.hidden = !show;
      if (show) visible += 1;
    });

    if (resultCount) resultCount.textContent = `${visible} ${visible === 1 ? "service" : "services"}`;
    if (noResults) noResults.hidden = visible !== 0;
  }

  if (searchInput) searchInput.addEventListener("input", filterServices);
  if (categoryFilter) categoryFilter.addEventListener("change", filterServices);

  // Expandable Card Details
  serviceCards.forEach((card) => {
    const toggle = card.querySelector(".details-toggle");
    const details = card.querySelector(".extra-details");
    if (toggle && details) {
      toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        details.hidden = expanded;
        toggle.innerHTML = expanded
          ? 'View service details <span aria-hidden="true">＋</span>'
          : 'Hide service details <span aria-hidden="true">−</span>';
      });
    }
  });

  // Quick Cards Filtering
  document.querySelectorAll(".quick-card[data-category]").forEach((link) => {
    link.addEventListener("click", () => {
      if (categoryFilter) {
        categoryFilter.value = link.dataset.category;
        filterServices();
      }
    });
  });

  // Directory Scroll Mapping
  document.querySelectorAll(".directory-item").forEach((button) => {
    button.addEventListener("click", () => {
      const title = button.dataset.target;
      const card = serviceCards.find((item) => {
        const h3 = item.querySelector("h3");
        return h3 && h3.textContent.trim() === title;
      });

      if (card) {
        if (searchInput) searchInput.value = "";
        if (categoryFilter) categoryFilter.value = "all";
        filterServices();
        card.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "center"
        });
        card.style.outline = "3px solid var(--gold)";
        setTimeout(() => { card.style.outline = ""; }, 1500);
      }
    });
  });

  // Sidebar Search
  if (sidebarSearch) {
    sidebarSearch.addEventListener("input", () => {
      const query = sidebarSearch.value.trim().toLowerCase();
      document.querySelectorAll(".directory-item").forEach((button) => {
        button.hidden = !button.textContent.toLowerCase().includes(query);
      });
    });
  }

  // Mobile Menu Toggle
  if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!open));
      primaryNav.classList.toggle("open", !open);
    });

    primaryNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      primaryNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }));
  }

  // Contact Form Setup
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");
  if (form && feedback) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      feedback.classList.remove("error");
      if (!form.reportValidity()) return;

      const name = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const office = document.getElementById("office").value;
      const message = document.getElementById("message").value.trim();

      if (name.length < 2 || message.length < 10) {
        feedback.textContent = "Please enter your name and a message of at least 10 characters.";
        feedback.classList.add("error");
        return;
      }

      const subject = encodeURIComponent(`Student enquiry: ${office}`);
      const body = encodeURIComponent(`Dear ${office},\n\n${message}\n\nRegards,\n${name}\nReply email: ${email}`);
      const recipient = "pr@msuas.ac.zw";

      feedback.textContent = `Preparing email draft for ${recipient}...`;
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    });

    form.addEventListener("reset", () => {
      feedback.textContent = "";
      feedback.classList.remove("error");
    });
  }

  // ==========================================
  // MODAL LOGIC & DASHBOARD TRANSITION
  // ==========================================
  const loginModal = document.getElementById("loginModal");
  const openLoginBtn = document.getElementById("openLoginBtn");
  const closeLoginModal = document.getElementById("closeLoginModal");
  const fakeLoginForm = document.getElementById("fakeLoginForm");
  const loginFeedback = document.getElementById("loginFeedback");

  function openModal(e) {
    if (e) e.preventDefault();
    if (loginModal) {
      loginModal.removeAttribute("hidden");
      loginModal.style.display = "grid";
    }
  }

  function closeModal() {
    if (loginModal) {
      loginModal.setAttribute("hidden", "");
      loginModal.style.display = "none";
    }
    if (loginFeedback) loginFeedback.textContent = "";
  }

  if (openLoginBtn) {
    openLoginBtn.addEventListener("click", openModal);
  }

  if (closeLoginModal) {
    closeLoginModal.addEventListener("click", closeModal);
  }

  document.querySelectorAll(".open-card-login").forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  if (loginModal) {
    loginModal.addEventListener("click", (e) => {
      if (e.target === loginModal) closeModal();
    });
  }

  if (fakeLoginForm) {
    fakeLoginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const reg = document.getElementById("regNumber").value.trim();
      const pass = document.getElementById("regPassword").value.trim();

      if (reg === "R201384R" && pass === "12345678") {
        loginFeedback.style.color = "var(--teal)";
        loginFeedback.textContent = "Authentication successful! Loading dashboard...";

        setTimeout(() => {
          closeModal();
          renderStudentDashboard(reg);
        }, 1000);
      } else {
        loginFeedback.style.color = "#a53f2a";
        loginFeedback.textContent = "Invalid registration number or password.";
      }
    });
  }

  function renderStudentDashboard(regNumber) {
    const mainShell = document.getElementById("main");
    if (!mainShell) return;

    // Render Student Portal Content
    mainShell.innerHTML = `
      <section id="home" class="panel" style="margin-bottom:24px; background: var(--navy); color: white;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div>
            <p class="eyebrow" style="color:var(--gold);">STUDENT PORTAL DASHBOARD</p>
            <h1 style="font-family:Manrope; margin: 4px 0;">Welcome back, Lingani Lemu</h1>
            <p style="margin:0; color:#c6d9d9; font-size:14px;">Reg No: <strong>${regNumber}</strong> · BCom Honours Data Science & Informatics</p>
          </div>
          <button class="button button-gold" onclick="window.location.reload()">Sign Out ↵</button>
        </div>
      </section>

      <div class="quick-links" style="margin-bottom:24px;">
        <div class="quick-card" id="btnCurrentSemester" style="cursor:pointer;">
          <span class="quick-icon">📚</span>
          <span><strong>Current Semester</strong><small>Level 2.2 (4 Modules)</small></span>
        </div>
        <div class="quick-card" id="btnResults" style="cursor:pointer;">
          <span class="quick-icon">📊</span>
          <span><strong>Previous Results</strong><small>View L1.1, L1.2 & L2.1 Transcript</small></span>
        </div>
        <div class="quick-card">
          <span class="quick-icon">🎓</span>
          <span><strong>Academic Level</strong><small>Level 2 Semester 2 (2.2)</small></span>
        </div>
        <div class="quick-card" id="btnExamTimetable" style="cursor:pointer;">
          <span class="quick-icon">📅</span>
          <span><strong>Exam Timetable</strong><small>Level 2.2 Schedules</small></span>
        </div>
      </div>

      <div class="content-layout">
        <div class="main-column">
          <section id="services" class="panel">
            <h2 style="font-family:Manrope; color:var(--navy); margin-top:0;">My Level 2.2 e-Learning Courses</h2>
            <div class="service-grid">
              <article class="service-card">
                <div class="service-top"><span class="tag tag-green">12 Credits</span></div>
                <h3>DSI 237 - Statistical Analysis</h3>
                <p>Parametric testing, normality evaluations, SPSS workflows, and distribution analysis.</p>
                <div class="detail-line"><strong>Lecture Time</strong><span>Monday 08:00–11:00</span></div>
              </article>
              <article class="service-card">
                <div class="service-top"><span class="tag tag-green">12 Credits</span></div>
                <h3>DSI 240 - R Programming and Computer Vision</h3>
                <p>Image processing, visual data algorithms, matrix calculations, and R data modeling.</p>
                <div class="detail-line"><strong>Lecture Time</strong><span>Tuesday 11:00–14:00</span></div>
              </article>
              <article class="service-card">
                <div class="service-top"><span class="tag tag-green">12 Credits</span></div>
                <h3>DSI 236 - Introduction to Media Application Development</h3>
                <p>Prerequisite: DSI 133. UI/UX design, interactive web media, dynamic visual interfaces.</p>
                <div class="detail-line"><strong>Lecture Time</strong><span>Wednesday 08:00–11:00</span></div>
              </article>
              <article class="service-card">
                <div class="service-top"><span class="tag tag-green">12 Credits</span></div>
                <h3>DSI 238 - Organisational Informatics</h3>
                <p>Enterprise information flows, business system architectures, and organizational data strategy.</p>
                <div class="detail-line"><strong>Lecture Time</strong><span>Thursday 11:00–14:00</span></div>
              </article>
            </div>
          </section>

          <section id="results-section" class="panel" style="margin-top:24px;">
            <h2 style="font-family:Manrope; color:var(--navy); margin-top:0;">Academic Results History</h2>
            <p class="muted" style="margin-bottom:16px;">Summary of completed coursework and credits earned across prior semesters.</p>

            <h3 style="color:var(--teal); font-size:15px; margin:16px 0 8px;">Level 1 Semester 1 Results</h3>
            <div style="overflow-x:auto;">
              <table style="width:100%; border-collapse:collapse; font-size:12px; text-align:left; margin-bottom:20px;">
                <thead>
                  <tr style="background:var(--teal-pale); color:var(--teal); border-bottom:2px solid var(--teal);">
                    <th style="padding:8px;">Code</th>
                    <th style="padding:8px;">Module Description</th>
                    <th style="padding:8px;">Credits</th>
                    <th style="padding:8px;">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom:1px solid var(--line);"><td style="padding:8px;"><strong>CS 131</strong></td><td style="padding:8px;">Basic Communication Skills</td><td style="padding:8px;">12</td><td style="padding:8px; color:green; font-weight:bold;">Pass (2.1)</td></tr>
                  <tr style="border-bottom:1px solid var(--line);"><td style="padding:8px;"><strong>GSB 211</strong></td><td style="padding:8px;">Gender Studies for Business</td><td style="padding:8px;">12</td><td style="padding:8px; color:green; font-weight:bold;">Pass (2.1)</td></tr>
                  <tr style="border-bottom:1px solid var(--line);"><td style="padding:8px;"><strong>DSI 132</strong></td><td style="padding:8px;">Foundations of Data Science</td><td style="padding:8px;">12</td><td style="padding:8px; color:green; font-weight:bold;">Distinction (1)</td></tr>
                  <tr style="border-bottom:1px solid var(--line);"><td style="padding:8px;"><strong>DSI 136</strong></td><td style="padding:8px;">Data Structures and Algorithms</td><td style="padding:8px;">12</td><td style="padding:8px; color:green; font-weight:bold;">Distinction (1)</td></tr>
                  <tr style="border-bottom:1px solid var(--line);"><td style="padding:8px;"><strong>DSI 131</strong></td><td style="padding:8px;">Introduction to Informatics</td><td style="padding:8px;">12</td><td style="padding:8px; color:green; font-weight:bold;">Pass (2.1)</td></tr>
                  <tr style="border-bottom:1px solid var(--line);"><td style="padding:8px;"><strong>DSI 133</strong></td><td style="padding:8px;">Human-Computer Interaction Principles & Practices</td><td style="padding:8px;">12</td><td style="padding:8px; color:green; font-weight:bold;">Pass (2.1)</td></tr>
                  <tr style="border-bottom:1px solid var(--line);"><td style="padding:8px;"><strong>DSI 134</strong></td><td style="padding:8px;">Principles of Programming Languages</td><td style="padding:8px;">12</td><td style="padding:8px; color:green; font-weight:bold;">Distinction (1)</td></tr>
                  <tr><td style="padding:8px;"><strong>DSI 135</strong></td><td style="padding:8px;">Computer Architecture and Organisation</td><td style="padding:8px;">12</td><td style="padding:8px; color:green; font-weight:bold;">Pass (2.1)</td></tr>
                </tbody>
              </table>
            </div>

            <h3 style="color:var(--teal); font-size:15px; margin:16px 0 8px;">Level 1 Semester 2 Results</h3>
            <div style="overflow-x:auto;">
              <table style="width:100%; border-collapse:collapse; font-size:12px; text-align:left; margin-bottom:20px;">
                <thead>
                  <tr style="background:var(--teal-pale); color:var(--teal); border-bottom:2px solid var(--teal);">
                    <th style="padding:8px;">Code</th>
                    <th style="padding:8px;">Module Description</th>
                    <th style="padding:8px;">Prerequisite</th>
                    <th style="padding:8px;">Credits</th>
                    <th style="padding:8px;">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom:1px solid var(--line);"><td style="padding:8px;"><strong>DSI 137</strong></td><td style="padding:8px;">Computer-Information Ethics, Social Informatics & Data Governance</td><td style="padding:8px;">—</td><td style="padding:8px;">12</td><td style="padding:8px; color:green; font-weight:bold;">Pass (2.1)</td></tr>
                  <tr style="border-bottom:1px solid var(--line);"><td style="padding:8px;"><strong>DSI 139</strong></td><td style="padding:8px;">Introduction to Python</td><td style="padding:8px;">DSI 134 & DSI 136</td><td style="padding:8px;">12</td><td style="padding:8px; color:green; font-weight:bold;">Distinction (1)</td></tr>
                  <tr style="border-bottom:1px solid var(--line);"><td style="padding:8px;"><strong>DSI 142</strong></td><td style="padding:8px;">Operating Systems</td><td style="padding:8px;">DSI 135</td><td style="padding:8px;">12</td><td style="padding:8px; color:green; font-weight:bold;">Pass (2.1)</td></tr>
                  <tr style="border-bottom:1px solid var(--line);"><td style="padding:8px;"><strong>DSI 140</strong></td><td style="padding:8px;">Information Infrastructure 1</td><td style="padding:8px;">DSI 139</td><td style="padding:8px;">12</td><td style="padding:8px; color:green; font-weight:bold;">Pass (2.1)</td></tr>
                  <tr style="border-bottom:1px solid var(--line);"><td style="padding:8px;"><strong>DSI 141</strong></td><td style="padding:8px;">Natural Language Processing</td><td style="padding:8px;">DSI 139</td><td style="padding:8px;">12</td><td style="padding:8px; color:green; font-weight:bold;">Distinction (1)</td></tr>
                  <tr><td style="padding:8px;"><strong>DSI 143</strong></td><td style="padding:8px;">Fundamentals of Data Warehouse and Data Mining</td><td style="padding:8px;">—</td><td style="padding:8px;">12</td><td style="padding:8px; color:green; font-weight:bold;">Distinction (1)</td></tr>
                </tbody>
              </table>
            </div>

            <h3 style="color:var(--teal); font-size:15px; margin:16px 0 8px;">Level 2 Semester 1 Results</h3>
            <div style="overflow-x:auto;">
              <table style="width:100%; border-collapse:collapse; font-size:12px; text-align:left;">
                <thead>
                  <tr style="background:var(--teal-pale); color:var(--teal); border-bottom:2px solid var(--teal);">
                    <th style="padding:8px;">Code</th>
                    <th style="padding:8px;">Module Description</th>
                    <th style="padding:8px;">Prerequisite</th>
                    <th style="padding:8px;">Credits</th>
                    <th style="padding:8px;">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom:1px solid var(--line);"><td style="padding:8px;"><strong>ENT 131</strong></td><td style="padding:8px;">Entrepreneurship 1</td><td style="padding:8px;">—</td><td style="padding:8px;">12</td><td style="padding:8px; color:green; font-weight:bold;">Pass (2.1)</td></tr>
                  <tr style="border-bottom:1px solid var(--line);"><td style="padding:8px;"><strong>DSI 232</strong></td><td style="padding:8px;">Information Systems Analysis, Design and Development Methodologies</td><td style="padding:8px;">—</td><td style="padding:8px;">12</td><td style="padding:8px; color:green; font-weight:bold;">Pass (2.1)</td></tr>
                  <tr style="border-bottom:1px solid var(--line);"><td style="padding:8px;"><strong>DSI 234</strong></td><td style="padding:8px;">Information Representation</td><td style="padding:8px;">—</td><td style="padding:8px;">12</td><td style="padding:8px; color:green; font-weight:bold;">Distinction (1)</td></tr>
                  <tr style="border-bottom:1px solid var(--line);"><td style="padding:8px;"><strong>DSI 231</strong></td><td style="padding:8px;">Introduction to Research in Data Science and Informatics</td><td style="padding:8px;">—</td><td style="padding:8px;">12</td><td style="padding:8px; color:green; font-weight:bold;">Pass (2.1)</td></tr>
                  <tr style="border-bottom:1px solid var(--line);"><td style="padding:8px;"><strong>DSI 233</strong></td><td style="padding:8px;">Enterprise Architecture</td><td style="padding:8px;">—</td><td style="padding:8px;">12</td><td style="padding:8px; color:green; font-weight:bold;">Distinction (1)</td></tr>
                  <tr><td style="padding:8px;"><strong>DSI 235</strong></td><td style="padding:8px;">Machine Learning I: Using Python</td><td style="padding:8px;">DSI 139</td><td style="padding:8px;">12</td><td style="padding:8px; color:green; font-weight:bold;">Distinction (1)</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="timetable-section" class="panel" style="margin-top:24px;">
            <h2 style="font-family:Manrope; color:var(--navy); margin-top:0;">Level 2.2 Examination Timetable</h2>
            <div style="overflow-x:auto;">
              <table style="width:100%; border-collapse:collapse; font-size:13px; text-align:left;">
                <thead>
                  <tr style="background:var(--teal-pale); color:var(--teal); border-bottom:2px solid var(--teal);">
                    <th style="padding:10px;">Date & Time</th>
                    <th style="padding:10px;">Module Code</th>
                    <th style="padding:10px;">Module Title</th>
                    <th style="padding:10px;">Venue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom:1px solid var(--line);">
                    <td style="padding:10px;">Mon 16 Nov (09:00 AM)</td>
                    <td style="padding:10px;"><strong>DSI 237</strong></td>
                    <td style="padding:10px;">Statistical Analysis</td>
                    <td style="padding:10px;">Lab 2</td>
                  </tr>
                  <tr style="border-bottom:1px solid var(--line);">
                    <td style="padding:10px;">Wed 18 Nov (02:00 PM)</td>
                    <td style="padding:10px;"><strong>DSI 240</strong></td>
                    <td style="padding:10px;">R Programming and Computer Vision</td>
                    <td style="padding:10px;">IT Complex Hall</td>
                  </tr>
                  <tr style="border-bottom:1px solid var(--line);">
                    <td style="padding:10px;">Fri 20 Nov (09:00 AM)</td>
                    <td style="padding:10px;"><strong>DSI 236</strong></td>
                    <td style="padding:10px;">Introduction to Media Application Development</td>
                    <td style="padding:10px;">Great Hall A</td>
                  </tr>
                  <tr>
                    <td style="padding:10px;">Mon 23 Nov (02:00 PM)</td>
                    <td style="padding:10px;"><strong>DSI 238</strong></td>
                    <td style="padding:10px;">Organisational Informatics</td>
                    <td style="padding:10px;">Lab 4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="contact" class="panel" style="margin-top:24px;">
            <h2 style="font-family:Manrope; color:var(--navy); margin-top:0;">Student Enquiry Office</h2>
            <p class="muted">Need to contact an official department regarding your Level 2.2 registration or transcript?</p>
            <form id="contactFormPost">
              <div class="form-grid" style="margin-top:14px;">
                <div class="field"><label for="fullNamePost">Full name</label><input id="fullNamePost" value="Lingani Lemu" readonly style="background:#f0f4f4;"></div>
                <div class="field"><label for="emailPost">Your email</label><input id="emailPost" value="lingani@msuas.ac.zw" required></div>
                <div class="field field-full">
                  <label for="officePost">Office / topic</label>
                  <select id="officePost" required>
                    <option value="e-Learning / Student Portal">e-Learning / Student Portal</option>
                    <option value="Admissions">Examinations & Transcripts Office</option>
                    <option value="Bursar / Student Fees">Bursar / Student Fees</option>
                  </select>
                </div>
                <div class="field field-full"><label for="messagePost">Message</label><textarea id="messagePost" rows="4" placeholder="Write your enquiry here..." required minlength="10"></textarea></div>
              </div>
              <div class="form-actions"><button class="button button-primary" type="submit">Submit Enquiry ↗</button></div>
              <p id="postFeedback" class="form-feedback" style="margin-top:8px;"></p>
            </form>
          </section>
        </div>

        <aside class="sidebar panel">
          <h3 style="font-family:Manrope; color:var(--navy); margin-top:0;">Student Directory</h3>
          <div style="font-size:12px; display:grid; gap:12px;">
            <div style="border-bottom:1px solid var(--line); padding-bottom:8px;">
              <strong>Current Level</strong>
              <p style="margin:4px 0 0; color:var(--muted);">Level 2 Semester 2 (2.2)</p>
            </div>
            <div style="border-bottom:1px solid var(--line); padding-bottom:8px;">
              <strong>Library E-Resources</strong>
              <p style="margin:4px 0 0; color:var(--muted);">Access to IEEE & ScienceDirect active.</p>
            </div>
          </div>
        </aside>
      </div>
    `;

    // Navigation scroll handling inside logged-in portal
    const navLinks = primaryNav ? primaryNav.querySelectorAll("a[href^='#']") : [];
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").replace("#", "");
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    // Current Semester Popup (Level 2.2 Weekly Lecture Schedule)
    const btnSemester = document.getElementById("btnCurrentSemester");
    if (btnSemester) {
      btnSemester.addEventListener("click", () => {
        alert(
          "Level 2 Semester 2 (2.2) Lecture Schedule:\n\n" +
          "1. DSI 237: Statistical Analysis\n   Lecture Time: Monday 08:00–11:00 (12 Credits)\n\n" +
          "2. DSI 240: R Programming and Computer Vision\n   Lecture Time: Tuesday 11:00–14:00 (12 Credits)\n\n" +
          "3. DSI 236: Introduction to Media Application Development\n   Lecture Time: Wednesday 08:00–11:00 (12 Credits)\n\n" +
          "4. DSI 238: Organisational Informatics\n   Lecture Time: Thursday 11:00–14:00 (12 Credits)"
        );
      });
    }

    // Results Quick Link Click
    const btnResults = document.getElementById("btnResults");
    if (btnResults) {
      btnResults.addEventListener("click", () => {
        const resultsSec = document.getElementById("results-section");
        if (resultsSec) {
          resultsSec.scrollIntoView({ behavior: "smooth", block: "start" });
          resultsSec.style.outline = "3px solid var(--gold)";
          setTimeout(() => { resultsSec.style.outline = ""; }, 1500);
        }
      });
    }

    // Exam Timetable Quick Link Click
    const btnTimetable = document.getElementById("btnExamTimetable");
    if (btnTimetable) {
      btnTimetable.addEventListener("click", () => {
        const timetableSec = document.getElementById("timetable-section");
        if (timetableSec) {
          timetableSec.scrollIntoView({ behavior: "smooth", block: "start" });
          timetableSec.style.outline = "3px solid var(--gold)";
          setTimeout(() => { timetableSec.style.outline = ""; }, 1500);
        }
      });
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  filterServices();
})();