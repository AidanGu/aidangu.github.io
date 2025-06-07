/**
 * PROJECTS FUNCTIONALITY
 * Scalable project filtering and management
 */

class ProjectsManager {
  constructor() {
    this.projectsGrid = document.getElementById("projectsGrid")
    this.filterTabs = document.querySelectorAll(".filter-tab")
    this.projectCards = document.querySelectorAll(".project-card")

    if (this.projectsGrid) {
      this.init()
    }
  }

  init() {
    this.setupFilters()
    this.setupScrollAnimations()
    this.setupKeyboardNavigation()
    this.initializeFromURL()
  }

  setupFilters() {
    this.filterTabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        const filter = e.target.getAttribute("data-filter")
        this.filterProjects(filter)
        this.updateActiveFilter(e.target)
        this.updateURL(filter)
      })
    })
  }

  filterProjects(category) {
    // Performance-optimized filtering
    requestAnimationFrame(() => {
      this.projectCards.forEach((card, index) => {
        const cardCategories = card.getAttribute("data-category").split(" ")
        const shouldShow = category === "all" || cardCategories.includes(category)

        if (shouldShow) {
          card.classList.remove("hidden")
          // Staggered animation for visible cards
          setTimeout(() => {
            card.classList.add("visible")
          }, index * 100)
        } else {
          card.classList.add("hidden")
          card.classList.remove("visible")
        }
      })
    })

    this.updateProjectCount(category)
  }

  updateActiveFilter(activeTab) {
    this.filterTabs.forEach((tab) => {
      tab.classList.remove("active")
      tab.setAttribute("aria-pressed", "false")
    })
    activeTab.classList.add("active")
    activeTab.setAttribute("aria-pressed", "true")
  }

  updateURL(filter) {
    if (filter !== "all") {
      window.history.replaceState(null, null, `#${filter}`)
    } else {
      window.history.replaceState(null, null, window.location.pathname)
    }
  }

  updateProjectCount(category) {
    const visibleProjects = Array.from(this.projectCards).filter((card) => {
      if (category === "all") return true
      const cardCategories = card.getAttribute("data-category").split(" ")
      return cardCategories.includes(category)
    }).length

    let countDisplay = document.querySelector(".project-count")

    if (!countDisplay) {
      countDisplay = document.createElement("div")
      countDisplay.className = "project-count"
      countDisplay.style.cssText = `
        text-align: center;
        margin-bottom: 2rem;
        color: var(--text-secondary);
        font-weight: 500;
        transition: all 0.3s ease;
      `

      this.projectsGrid.parentNode.insertBefore(countDisplay, this.projectsGrid)
    }

    // Animate count change
    countDisplay.style.transform = "scale(0.8)"
    countDisplay.style.opacity = "0"

    setTimeout(() => {
      countDisplay.textContent = `Showing ${visibleProjects} project${visibleProjects !== 1 ? "s" : ""}`
      countDisplay.style.transform = "scale(1)"
      countDisplay.style.opacity = "1"
    }, 150)
  }

  setupScrollAnimations() {
    const Utils = {
      createObserver: (callback) => {
        return new IntersectionObserver(callback)
      },
    }

    const projectObserver = Utils.createObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting && !entry.target.classList.contains("hidden")) {
          setTimeout(() => {
            entry.target.classList.add("visible")
          }, index * 150)
          projectObserver.unobserve(entry.target)
        }
      })
    })

    this.projectCards.forEach((card) => {
      projectObserver.observe(card)
    })
  }

  setupKeyboardNavigation() {
    this.filterTabs.forEach((tab, index) => {
      tab.setAttribute("tabindex", "0")
      tab.setAttribute("role", "button")
      tab.setAttribute("aria-pressed", "false")

      tab.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          tab.click()
        } else if (e.key === "ArrowLeft" && index > 0) {
          e.preventDefault()
          this.filterTabs[index - 1].focus()
        } else if (e.key === "ArrowRight" && index < this.filterTabs.length - 1) {
          e.preventDefault()
          this.filterTabs[index + 1].focus()
        }
      })
    })
  }

  initializeFromURL() {
    const hash = window.location.hash.substring(1)
    if (hash) {
      const targetTab = document.querySelector(`[data-filter="${hash}"]`)
      if (targetTab) {
        this.filterProjects(hash)
        this.updateActiveFilter(targetTab)
      }
    } else {
      this.updateProjectCount("all")
    }

    // Set initial aria-pressed state
    const activeTab = document.querySelector(".filter-tab.active")
    if (activeTab) {
      activeTab.setAttribute("aria-pressed", "true")
    }
  }

  // Method to add new projects dynamically
  addProject(projectData) {
    const newProject = this.createProjectCard(projectData)
    this.projectsGrid.appendChild(newProject)
    this.projectCards = document.querySelectorAll(".project-card")

    // Re-setup observer for new project
    const projectObserver = Utils.createObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          projectObserver.unobserve(entry.target)
        }
      })
    })

    projectObserver.observe(newProject)
  }

  createProjectCard(data) {
    const article = document.createElement("article")
    article.className = `project-card reveal-on-scroll ${data.featured ? "featured" : ""}`
    article.setAttribute("data-category", data.categories.join(" "))

    article.innerHTML = `
      <div class="project-image">
        <img src="${data.image}" alt="${data.title}" loading="lazy">
        <div class="project-overlay">
          <div class="project-links">
            ${data.links
              .map(
                (link) => `
              <a href="${link.url}" class="project-link" aria-label="${link.label}">
                <i class="${link.icon}"></i>
              </a>
            `,
              )
              .join("")}
          </div>
        </div>
      </div>
      <div class="project-content">
        <div class="project-tags">
          ${data.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join("")}
        </div>
        <h3 class="project-title">${data.title}</h3>
        <p class="project-description">${data.description}</p>
        ${data.authors ? `<div class="project-authors"><small>${data.authors}</small></div>` : ""}
      </div>
    `

    return article
  }
}

// Initialize projects manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ProjectsManager()
})
