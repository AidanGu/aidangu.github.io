// Content Loader - Dynamically populates the website from content data
document.addEventListener("DOMContentLoaded", () => {
  // Check if content data is available
  if (typeof window.siteContent === "undefined") {
    console.error("Site content not loaded. Make sure data/content.js is included.")
    return
  }

  const content = window.siteContent

  // Load Hero Content
  loadHeroContent(content.hero)

  // Load Stats
  loadStats(content.stats)

  // Load About Content
  loadAboutContent(content.about)

  // Load Roles
  loadRoles(content.roles)

  // Load Timeline
  loadTimeline(content.timeline)

  // Load Reflection
  loadReflection(content.reflection)

  // Load Skills
  loadSkills(content.skills)
})

function loadHeroContent(hero) {
  // Update typing animation phrases
  if (window.updateTypingPhrases) {
    window.updateTypingPhrases(hero.titles)
  }

  // Update hero description
  const heroDescription = document.querySelector(".hero-description")
  if (heroDescription) {
    heroDescription.textContent = hero.description
  }

  // Update profile image
  const profileImage = document.querySelector(".profile-image")
  if (profileImage) {
    profileImage.src = hero.profileImage
    profileImage.alt = hero.name
  }

  // Update CTA buttons
  const primaryCTA = document.querySelector(".cta-button.primary")
  const secondaryCTA = document.querySelector(".cta-button.secondary")

  if (primaryCTA) {
    primaryCTA.href = hero.cta.primary.link
    primaryCTA.querySelector("span").textContent = hero.cta.primary.text
  }

  if (secondaryCTA) {
    secondaryCTA.href = hero.cta.secondary.link
    secondaryCTA.querySelector("span").textContent = hero.cta.secondary.text
  }
}

function loadStats(stats) {
  const statsGrid = document.querySelector(".stats-grid")
  if (!statsGrid) return

  statsGrid.innerHTML = ""

  stats.forEach((stat) => {
    const statCard = document.createElement("div")
    statCard.className = "stat-card"
    statCard.innerHTML = `
      <div class="stat-number" data-target="${stat.number}">0</div>
      <div class="stat-label">${stat.label}</div>
    `
    statsGrid.appendChild(statCard)
  })
}

function loadAboutContent(about) {
  // Update about section if it exists on the page
  const aboutSection = document.querySelector(".about-content")
  if (!aboutSection) return

  const aboutTitle = aboutSection.querySelector("h2")
  const aboutDescription = aboutSection.querySelector("p")
  const aboutImage = aboutSection.querySelector(".about-photo")

  if (aboutTitle) aboutTitle.textContent = about.title
  if (aboutDescription) aboutDescription.textContent = about.description
  if (aboutImage) {
    aboutImage.src = about.image
    aboutImage.alt = about.title
  }
}

function loadRoles(roles) {
  const rolesGrid = document.querySelector(".roles-grid")
  if (!rolesGrid) return

  rolesGrid.innerHTML = ""

  roles.forEach((role) => {
    const roleCard = document.createElement("div")
    roleCard.className = "role-card"
    roleCard.innerHTML = `
      <div class="role-icon">
        <i class="${role.icon}"></i>
      </div>
      <h3>${role.title}</h3>
      <p>${role.description}</p>
    `
    rolesGrid.appendChild(roleCard)
  })
}

function loadTimeline(timeline) {
  const timelineWrapper = document.querySelector(".timeline-wrapper")
  if (!timelineWrapper) return

  // Clear existing content except timeline line
  const timelineLine = timelineWrapper.querySelector(".timeline-line")
  timelineWrapper.innerHTML = ""
  if (timelineLine) {
    timelineWrapper.appendChild(timelineLine)
  } else {
    timelineWrapper.innerHTML = '<div class="timeline-line"></div>'
  }

  timeline.forEach((milestone, index) => {
    const milestoneDiv = document.createElement("div")
    milestoneDiv.className = "story-milestone"
    milestoneDiv.setAttribute("data-year", milestone.year)

    const reverseClass = milestone.reverse ? "reverse" : ""
    const placeholderNote = milestone.placeholder ? `<div class="edit-note">${milestone.editNote}</div>` : ""

    milestoneDiv.innerHTML = `
      <div class="milestone-marker">
        <div class="marker-dot"></div>
        <div class="marker-year">${milestone.year}</div>
      </div>
      <div class="milestone-content ${reverseClass}">
        <div class="milestone-image">
          <img src="${milestone.image}" alt="${milestone.title}">
        </div>
        <div class="milestone-text">
          <h3>${milestone.title}</h3>
          <p class="milestone-location">${milestone.location}</p>
          ${milestone.duration ? `<p class="milestone-duration">${milestone.duration}</p>` : ""}
          <p class="milestone-description">${milestone.description}</p>
          <div class="milestone-highlights">
            ${milestone.highlights.map((highlight) => `<span class="highlight">${highlight}</span>`).join("")}
          </div>
          ${
            milestone.link
              ? `
            <a href="${milestone.link.url}" target="_blank" class="milestone-link">
              <i class="fas fa-external-link-alt"></i>
              ${milestone.link.text}
            </a>
          `
              : ""
          }
          ${placeholderNote}
        </div>
      </div>
    `

    timelineWrapper.appendChild(milestoneDiv)

    // Add testimonial if it exists
    if (milestone.testimonial) {
      const testimonialDiv = document.createElement("div")
      testimonialDiv.className = "cambridge-testimonial"
      testimonialDiv.innerHTML = `
        <div class="container">
          <div class="testimonial-content">
            <img src="${milestone.testimonial.image}" alt="Cambridge Testimonial" class="testimonial-image">
            <div class="testimonial-overlay">
              <a href="${milestone.testimonial.link}" target="_blank" class="testimonial-link">
                <i class="fas fa-external-link-alt"></i>
                <span>Read my full testimonial on the UCEAP website</span>
              </a>
            </div>
          </div>
        </div>
      `
      timelineWrapper.appendChild(testimonialDiv)
    }
  })
}

function loadReflection(reflection) {
  const reflectionSection = document.querySelector(".story-reflection")
  if (!reflectionSection) return

  const reflectionContent = reflectionSection.querySelector(".reflection-content")
  if (!reflectionContent) return

  reflectionContent.innerHTML = `
    <h2>${reflection.title}</h2>
    ${reflection.content.map((paragraph) => `<p class="reflection-text">${paragraph}</p>`).join("")}
  `
}

function loadSkills(skills) {
  const skillsGrid = document.querySelector(".skills-grid")
  if (!skillsGrid) return

  skillsGrid.innerHTML = `
    <div class="skill-category">
      <h3>Technical</h3>
      <div class="skill-tags">
        ${skills.technical.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
      </div>
    </div>
    <div class="skill-category">
      <h3>Creative</h3>
      <div class="skill-tags">
        ${skills.creative.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
      </div>
    </div>
    <div class="skill-category">
      <h3>Leadership</h3>
      <div class="skill-tags">
        ${skills.leadership.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
      </div>
    </div>
  `
}

// Helper function to update typing animation phrases
window.updateTypingPhrases = (phrases) => {
  if (window.typingPhrases) {
    window.typingPhrases = phrases
  }
}

// Add CSS for edit notes
const style = document.createElement("style")
style.textContent = `
  .edit-note {
    background: #fef3c7;
    color: #92400e;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    margin-top: 1rem;
    border-left: 4px solid #f59e0b;
  }
  
  [data-theme="dark"] .edit-note {
    background: #451a03;
    color: #fbbf24;
    border-left-color: #f59e0b;
  }
`
document.head.appendChild(style)
