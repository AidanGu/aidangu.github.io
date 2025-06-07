/**
 * ENHANCED PROJECT FILTERS
 * Improved filtering with smooth animations and better UX
 */

document.addEventListener("DOMContentLoaded", () => {
  const filterTabs = document.querySelectorAll(".filter-tab")
  const projectCards = document.querySelectorAll(".project-card")

  if (filterTabs.length === 0 || projectCards.length === 0) return

  // Enhanced filter functionality with animations
  function filterProjects(category) {
    // Add loading state
    const projectsGrid = document.querySelector(".projects-grid")
    projectsGrid.style.opacity = "0.7"

    projectCards.forEach((card, index) => {
      const cardCategories = card.getAttribute("data-category").split(" ")
      const shouldShow = category === "all" || cardCategories.includes(category)

      if (shouldShow) {
        // Show card with staggered animation
        setTimeout(() => {
          card.style.display = "block"
          card.style.opacity = "0"
          card.style.transform = "translateY(20px) scale(0.95)"

          // Trigger animation
          requestAnimationFrame(() => {
            card.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
            card.style.opacity = "1"
            card.style.transform = "translateY(0) scale(1)"
          })
        }, index * 100)
      } else {
        // Hide card
        card.style.transition = "all 0.3s ease"
        card.style.opacity = "0"
        card.style.transform = "translateY(-20px) scale(0.95)"

        setTimeout(() => {
          card.style.display = "none"
        }, 300)
      }
    })

    // Restore grid opacity
    setTimeout(() => {
      projectsGrid.style.opacity = "1"
    }, 500)

    // Update project count
    updateProjectCount(category)
  }

  // Add click event listeners to filter tabs
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      filterTabs.forEach((t) => t.classList.remove("active"))

      // Add active class to clicked tab
      this.classList.add("active")

      // Get filter category
      const category = this.getAttribute("data-filter")

      // Filter projects
      filterProjects(category)

      // Update URL hash
      if (category !== "all") {
        window.history.replaceState(null, null, `#${category}`)
      } else {
        window.history.replaceState(null, null, window.location.pathname)
      }

      // Add ripple effect
      createRipple(this)
    })
  })

  // Project count display
  function updateProjectCount(category) {
    const visibleProjects = Array.from(projectCards).filter((card) => {
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

      const projectsGrid = document.querySelector(".projects-grid")
      if (projectsGrid) {
        projectsGrid.parentNode.insertBefore(countDisplay, projectsGrid)
      }
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

  // Initialize filter based on URL hash
  function initializeFilter() {
    const hash = window.location.hash.substring(1)

    if (hash) {
      const targetTab = document.querySelector(`[data-filter="${hash}"]`)
      if (targetTab) {
        filterTabs.forEach((tab) => tab.classList.remove("active"))
        targetTab.classList.add("active")
        filterProjects(hash)
      }
    } else {
      updateProjectCount("all")
    }
  }

  // Ripple effect for buttons
  function createRipple(element) {
    const ripple = document.createElement("span")
    const rect = element.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)

    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      width: ${size}px;
      height: ${size}px;
      left: ${rect.width / 2 - size / 2}px;
      top: ${rect.height / 2 - size / 2}px;
    `

    element.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  // Add ripple animation keyframes
  const style = document.createElement("style")
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)

  // Initialize on page load
  initializeFilter()

  // Keyboard navigation for filters
  document.addEventListener("keydown", (e) => {
    if (e.target.classList.contains("filter-tab")) {
      const currentIndex = Array.from(filterTabs).indexOf(e.target)

      if (e.key === "ArrowLeft" && currentIndex > 0) {
        e.preventDefault()
        filterTabs[currentIndex - 1].focus()
      } else if (e.key === "ArrowRight" && currentIndex < filterTabs.length - 1) {
        e.preventDefault()
        filterTabs[currentIndex + 1].focus()
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        e.target.click()
      }
    }
  })

  // Make filter tabs focusable and accessible
  filterTabs.forEach((tab) => {
    tab.setAttribute("tabindex", "0")
    tab.setAttribute("role", "button")
    tab.setAttribute("aria-pressed", "false")

    tab.addEventListener("click", function () {
      filterTabs.forEach((t) => t.setAttribute("aria-pressed", "false"))
      this.setAttribute("aria-pressed", "true")
    })
  })

  // Set initial aria-pressed state
  const activeTab = document.querySelector(".filter-tab.active")
  if (activeTab) {
    activeTab.setAttribute("aria-pressed", "true")
  }
})
