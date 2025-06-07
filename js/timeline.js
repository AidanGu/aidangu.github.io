/**
 * TIMELINE FUNCTIONALITY
 * High-performance timeline with optimized filtering
 */

class TimelineManager {
  constructor() {
    this.timelineContainer = document.getElementById("timelineContainer")
    this.filterButtons = document.querySelectorAll(".timeline-filter")
    this.timelineItems = document.querySelectorAll(".timeline-item")
    this.isAnimating = false

    if (this.timelineContainer) {
      this.init()
    }
  }

  init() {
    this.setupFilters()
    this.setupOptimizedScrollAnimations()
    this.setupKeyboardNavigation()
    this.preloadImages()
  }

  setupFilters() {
    this.filterButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        if (this.isAnimating) return // Prevent rapid clicking

        const year = e.target.getAttribute("data-year")
        this.filterTimeline(year)
        this.updateActiveFilter(e.target)
      })
    })

    // Initialize with URL hash if present
    const urlHash = window.location.hash.substring(1)
    if (urlHash && urlHash !== "story") {
      const targetButton = document.querySelector(`[data-year="${urlHash}"]`)
      if (targetButton) {
        this.filterTimeline(urlHash)
        this.updateActiveFilter(targetButton)
      }
    }
  }

  filterTimeline(year) {
    this.isAnimating = true

    // Use document fragment for better performance
    const fragment = document.createDocumentFragment()

    this.timelineItems.forEach((item, index) => {
      const itemYear = item.getAttribute("data-year")
      const shouldShow = year === "all" || itemYear === year

      if (shouldShow) {
        item.classList.remove("hidden")
        // Reduced stagger for better performance
        setTimeout(() => {
          item.classList.add("visible")
        }, index * 50)
      } else {
        item.classList.add("hidden")
        item.classList.remove("visible")
      }
    })

    // Update URL hash
    if (year !== "all") {
      window.history.replaceState(null, null, `#${year}`)
    } else {
      window.history.replaceState(null, null, window.location.pathname)
    }

    // Reset animation lock
    setTimeout(() => {
      this.isAnimating = false
    }, 500)
  }

  updateActiveFilter(activeButton) {
    this.filterButtons.forEach((button) => {
      button.classList.remove("active")
    })
    activeButton.classList.add("active")
  }

  setupOptimizedScrollAnimations() {
    // Optimized intersection observer with better performance
    const observerOptions = {
      root: null,
      rootMargin: "50px 0px -100px 0px", // Trigger earlier, finish earlier
      threshold: 0.2, // Higher threshold for better performance
    }

    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("hidden")) {
          entry.target.classList.add("visible")
          // Immediately unobserve for performance
          timelineObserver.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Only observe visible items initially
    this.timelineItems.forEach((item) => {
      if (!item.classList.contains("hidden")) {
        timelineObserver.observe(item)
      }
    })
  }

  setupKeyboardNavigation() {
    this.filterButtons.forEach((button, index) => {
      button.setAttribute("tabindex", "0")
      button.setAttribute("role", "button")

      button.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          button.click()
        } else if (e.key === "ArrowLeft" && index > 0) {
          e.preventDefault()
          this.filterButtons[index - 1].focus()
        } else if (e.key === "ArrowRight" && index < this.filterButtons.length - 1) {
          e.preventDefault()
          this.filterButtons[index + 1].focus()
        }
      })
    })
  }

  preloadImages() {
    // Preload timeline images for better performance
    this.timelineItems.forEach((item) => {
      const img = item.querySelector("img")
      if (img && img.loading !== "eager") {
        const imageUrl = img.src
        const preloadLink = document.createElement("link")
        preloadLink.rel = "preload"
        preloadLink.as = "image"
        preloadLink.href = imageUrl
        document.head.appendChild(preloadLink)
      }
    })
  }

  // Optimized method to add new timeline items
  addTimelineItem(itemData) {
    const newItem = this.createTimelineItem(itemData)
    this.timelineContainer.appendChild(newItem)

    // Update the items list
    this.timelineItems = document.querySelectorAll(".timeline-item")

    // Only observe if visible
    if (!newItem.classList.contains("hidden")) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
          }
        })
      })
      observer.observe(newItem)
    }
  }

  createTimelineItem(data) {
    const article = document.createElement("article")
    article.className = "timeline-item reveal-on-scroll"
    article.setAttribute("data-year", data.year)

    article.innerHTML = `
      <div class="timeline-marker">
        <div class="marker-dot"></div>
        <div class="marker-year">${data.year}</div>
      </div>
      <div class="timeline-content ${data.reverse ? "reverse" : ""}">
        <div class="timeline-image">
          <img src="${data.image}" alt="${data.title}" loading="lazy">
        </div>
        <div class="timeline-text">
          <h3>${data.title}</h3>
          <p class="timeline-location">${data.location}</p>
          ${data.duration ? `<p class="timeline-duration">${data.duration}</p>` : ""}
          <p class="timeline-description">${data.description}</p>
          <div class="timeline-highlights">
            ${data.highlights.map((highlight) => `<span class="highlight">${highlight}</span>`).join("")}
          </div>
          ${data.links ? this.createLinks(data.links) : ""}
        </div>
      </div>
    `

    return article
  }

  createLinks(links) {
    return `
      <div class="timeline-links">
        ${links
          .map(
            (link) => `
          <a href="${link.url}" target="_blank" class="${link.class}">
            <i class="${link.icon}"></i>
            <span>${link.text}</span>
          </a>
        `,
          )
          .join("")}
      </div>
    `
  }
}

// Initialize timeline when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new TimelineManager()
})
