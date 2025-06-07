/**
 * CORE FUNCTIONALITY
 * Essential features for site operation
 */

// Performance-optimized utilities
const Utils = {
  // Throttle function for performance
  throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments
      
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },

  // Debounce function for performance
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  // Intersection Observer for scroll animations
  createObserver(callback, options = {}) {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    return new IntersectionObserver(callback, { ...defaultOptions, ...options })
  },
}

// Main application initialization
class PortfolioApp {
  constructor() {
    this.init()
  }

  init() {
    this.setupNavigation()
    this.setupScrollAnimations()
    this.setupTypingAnimation()
    this.setupMobileMenu()
    this.setupSmoothScrolling()
  }

  setupNavigation() {
    const nav = document.querySelector(".nav-container")
    if (!nav) return

    // Navbar background on scroll
    const handleScroll = Utils.throttle(() => {
      if (window.scrollY > 50) {
        nav.classList.add("scrolled")
      } else {
        nav.classList.remove("scrolled")
      }
    }, 16)

    window.addEventListener("scroll", handleScroll)

    // Active navigation link highlighting
    this.updateActiveNavLink()
  }

  updateActiveNavLink() {
    const navLinks = document.querySelectorAll(".nav-link")
    const currentPage = window.location.pathname.split("/").pop() || "index.html"

    navLinks.forEach((link) => {
      const href = link.getAttribute("href")
      if (href === currentPage || (currentPage === "" && href === "index.html")) {
        link.classList.add("active")
      } else {
        link.classList.remove("active")
      }
    })
  }

  setupScrollAnimations() {
    // Performance-optimized scroll animations using Intersection Observer
    const animateOnScroll = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          // Unobserve after animation to improve performance
          scrollObserver.unobserve(entry.target)
        }
      })
    }

    const scrollObserver = Utils.createObserver(animateOnScroll)

    // Observe all elements that need scroll animations
    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      scrollObserver.observe(el)
    })
  }

  setupTypingAnimation() {
    const typingText = document.getElementById("typingText")
    if (!typingText) return

    const phrases = [
      "Computer Engineering Student.",
      "Maker Space Intern.",
      "AI Researcher.",
      "Adobe Ambassador.",
      "Community Builder.",
    ]

    let phraseIndex = 0
    let charIndex = 0
    let isDeleting = false

    const typeWriter = () => {
      const currentPhrase = phrases[phraseIndex]

      if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1)
        charIndex--
      } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1)
        charIndex++
      }

      let typeSpeed = isDeleting ? 50 : 100

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000 // Pause at end
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        phraseIndex = (phraseIndex + 1) % phrases.length
        typeSpeed = 500 // Pause before next phrase
      }

      setTimeout(typeWriter, typeSpeed)
    }

    typeWriter()
  }

  setupMobileMenu() {
    const mobileMenuToggle = document.getElementById("mobileMenuToggle")
    const navLinks = document.querySelector(".nav-links")

    if (!mobileMenuToggle || !navLinks) return

    mobileMenuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      mobileMenuToggle.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    navLinks.addEventListener("click", (e) => {
      if (e.target.classList.contains("nav-link")) {
        navLinks.classList.remove("active")
        mobileMenuToggle.classList.remove("active")
      }
    })
  }

  setupSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PortfolioApp()
})

// Export for use in other modules
window.PortfolioApp = PortfolioApp
window.Utils = Utils
