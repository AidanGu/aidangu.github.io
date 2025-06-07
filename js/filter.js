// Project filtering functionality
document.addEventListener("DOMContentLoaded", () => {
  const filterTabs = document.querySelectorAll(".filter-tab")
  const projectCards = document.querySelectorAll(".project-card")

  if (filterTabs.length === 0 || projectCards.length === 0) {
    return // Exit if not on projects page
  }

  // Filter functionality
  function filterProjects(category) {
    projectCards.forEach((card) => {
      const cardCategories = card.getAttribute("data-category").split(" ")

      if (category === "all" || cardCategories.includes(category)) {
        card.style.display = "block"
        card.classList.remove("hidden")

        // Add animation
        setTimeout(() => {
          card.style.opacity = "1"
          card.style.transform = "translateY(0)"
        }, 100)
      } else {
        card.style.opacity = "0"
        card.style.transform = "translateY(20px)"

        setTimeout(() => {
          card.style.display = "none"
          card.classList.add("hidden")
        }, 300)
      }
    })
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

      // Update URL hash (optional)
      if (category !== "all") {
        window.history.replaceState(null, null, `#${category}`)
      } else {
        window.history.replaceState(null, null, window.location.pathname)
      }
    })
  })

  // Initialize filter based on URL hash
  function initializeFilter() {
    const hash = window.location.hash.substring(1)

    if (hash) {
      const targetTab = document.querySelector(`[data-filter="${hash}"]`)
      if (targetTab) {
        // Remove active from all tabs
        filterTabs.forEach((tab) => tab.classList.remove("active"))

        // Activate target tab
        targetTab.classList.add("active")

        // Filter projects
        filterProjects(hash)
      }
    }
  }

  // Initialize on page load
  initializeFilter()

  // Search functionality (bonus feature)
  function createSearchBox() {
    const filterSection = document.querySelector(".filter-section .container")
    if (!filterSection) return

    const searchContainer = document.createElement("div")
    searchContainer.style.cssText = `
            margin-top: 2rem;
            display: flex;
            justify-content: center;
        `

    const searchInput = document.createElement("input")
    searchInput.type = "text"
    searchInput.placeholder = "Search projects..."
    searchInput.style.cssText = `
            padding: 0.75rem 1rem;
            border: 2px solid var(--border-color);
            border-radius: 2rem;
            background: var(--bg-primary);
            color: var(--text-primary);
            font-family: inherit;
            width: 300px;
            max-width: 100%;
            transition: border-color var(--transition-fast);
        `

    searchInput.addEventListener("focus", function () {
      this.style.borderColor = "var(--accent-primary)"
    })

    searchInput.addEventListener("blur", function () {
      this.style.borderColor = "var(--border-color)"
    })

    searchContainer.appendChild(searchInput)
    filterSection.appendChild(searchContainer)

    // Search functionality
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase()

      projectCards.forEach((card) => {
        const title = card.querySelector(".project-title").textContent.toLowerCase()
        const description = card.querySelector(".project-description").textContent.toLowerCase()
        const tags = Array.from(card.querySelectorAll(".project-tag")).map((tag) => tag.textContent.toLowerCase())

        const matchesSearch =
          title.includes(searchTerm) || description.includes(searchTerm) || tags.some((tag) => tag.includes(searchTerm))

        if (matchesSearch || searchTerm === "") {
          card.style.display = "block"
          card.classList.remove("hidden")
        } else {
          card.style.display = "none"
          card.classList.add("hidden")
        }
      })

      // Update project count
      updateProjectCount()
    })
  }

  // Create search box
  createSearchBox()

  // Project count display
  function updateProjectCount() {
    const visibleProjects = document.querySelectorAll(".project-card:not(.hidden)").length
    let countDisplay = document.querySelector(".project-count")

    if (!countDisplay) {
      countDisplay = document.createElement("div")
      countDisplay.className = "project-count"
      countDisplay.style.cssText = `
                text-align: center;
                margin-bottom: 2rem;
                color: var(--text-secondary);
                font-weight: 500;
            `

      const projectsGrid = document.querySelector(".projects-grid")
      if (projectsGrid) {
        projectsGrid.parentNode.insertBefore(countDisplay, projectsGrid)
      }
    }

    countDisplay.textContent = `Showing ${visibleProjects} project${visibleProjects !== 1 ? "s" : ""}`
  }

  // Initialize project count
  updateProjectCount()

  // Isotope-like layout animation
  function animateLayout() {
    const visibleCards = document.querySelectorAll(".project-card:not(.hidden)")

    visibleCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`
      card.classList.add("animate-scale-in")

      // Remove animation class after animation completes
      setTimeout(
        () => {
          card.classList.remove("animate-scale-in")
        },
        600 + index * 100,
      )
    })
  }

  // Add layout animation to filter function
  const originalFilterProjects = filterProjects
  filterProjects = (category) => {
    originalFilterProjects(category)

    setTimeout(() => {
      animateLayout()
      updateProjectCount()
    }, 350)
  }

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

  // Make filter tabs focusable
  filterTabs.forEach((tab) => {
    tab.setAttribute("tabindex", "0")
    tab.setAttribute("role", "button")
    tab.setAttribute("aria-pressed", "false")

    tab.addEventListener("click", function () {
      // Update aria-pressed for accessibility
      filterTabs.forEach((t) => t.setAttribute("aria-pressed", "false"))
      this.setAttribute("aria-pressed", "true")
    })
  })

  // Set initial aria-pressed state
  const activeTab = document.querySelector(".filter-tab.active")
  if (activeTab) {
    activeTab.setAttribute("aria-pressed", "true")
  }

  // Responsive filter tabs (horizontal scroll on mobile)
  function makeFilterTabsScrollable() {
    const filterTabsContainer = document.querySelector(".filter-tabs")
    if (!filterTabsContainer) return

    // Add scroll indicators
    const scrollIndicator = document.createElement("div")
    scrollIndicator.style.cssText = `
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            background: linear-gradient(to left, var(--bg-secondary), transparent);
            width: 30px;
            height: 100%;
            pointer-events: none;
            opacity: 0;
            transition: opacity var(--transition-fast);
        `

    filterTabsContainer.style.position = "relative"
    filterTabsContainer.appendChild(scrollIndicator)

    filterTabsContainer.addEventListener("scroll", function () {
      const isScrollable = this.scrollWidth > this.clientWidth
      const isAtEnd = this.scrollLeft >= this.scrollWidth - this.clientWidth - 10

      if (isScrollable && !isAtEnd) {
        scrollIndicator.style.opacity = "1"
      } else {
        scrollIndicator.style.opacity = "0"
      }
    })

    // Initial check
    window.addEventListener("resize", () => {
      const isScrollable = filterTabsContainer.scrollWidth > filterTabsContainer.clientWidth
      if (isScrollable) {
        scrollIndicator.style.opacity = "1"
      } else {
        scrollIndicator.style.opacity = "0"
      }
    })
  }

  makeFilterTabsScrollable()
})
