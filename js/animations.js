// Animation and scroll effects
document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active")
      }
    })
  }, observerOptions)

  // Observe elements for animations
  document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale").forEach((el) => {
    observer.observe(el)
  })

  // Add reveal classes to elements
  function addRevealClasses() {
    // Stats cards
    document.querySelectorAll(".stat-card").forEach((card, index) => {
      card.classList.add("reveal")
      card.style.animationDelay = `${index * 0.1}s`
    })

    // Role cards
    document.querySelectorAll(".role-card").forEach((card, index) => {
      card.classList.add("reveal-scale")
      card.style.animationDelay = `${index * 0.2}s`
    })

    // Project cards
    document.querySelectorAll(".project-card").forEach((card, index) => {
      card.classList.add("reveal")
      card.style.animationDelay = `${index * 0.1}s`
    })

    // Timeline items
    document.querySelectorAll(".timeline-item").forEach((item, index) => {
      item.classList.add("reveal-left")
      item.style.animationDelay = `${index * 0.2}s`
    })

    // Contact methods
    document.querySelectorAll(".contact-method").forEach((method, index) => {
      method.classList.add("reveal-right")
      method.style.animationDelay = `${index * 0.1}s`
    })

    // Social cards
    document.querySelectorAll(".social-card").forEach((card, index) => {
      card.classList.add("reveal-scale")
      card.style.animationDelay = `${index * 0.1}s`
    })
  }

  addRevealClasses()

  // Counter animation for stats
  function animateCounters() {
    const counters = document.querySelectorAll(".stat-number")

    counters.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-target"))
      const increment = target / 100
      let current = 0

      const updateCounter = () => {
        if (current < target) {
          current += increment
          counter.textContent = Math.ceil(current)
          requestAnimationFrame(updateCounter)
        } else {
          counter.textContent = target
        }
      }

      // Start animation when element is visible
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateCounter()
            counterObserver.unobserve(entry.target)
          }
        })
      })

      counterObserver.observe(counter)
    })
  }

  animateCounters()

  // Parallax effect for hero background
  function parallaxEffect() {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".gradient-orb")

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1
      const yPos = -(scrolled * speed)
      element.style.transform = `translateY(${yPos}px)`
    })
  }

  // Throttled scroll handler for performance
  function throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments
      
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  const throttledParallax = throttle(parallaxEffect, 16)
  window.addEventListener("scroll", throttledParallax)

  // Smooth reveal animation for page sections
  function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal:not(.active)")

    reveals.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("active")
      }
    })
  }

  window.addEventListener("scroll", throttle(revealOnScroll, 16))

  // Add stagger animation to navigation links
  document.querySelectorAll(".nav-link").forEach((link, index) => {
    link.style.animationDelay = `${index * 0.1}s`
    link.classList.add("animate-fade-in")
  })

  // Hover animations for interactive elements
  function addHoverAnimations() {
    // Project cards
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px) scale(1.02)"
      })

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)"
      })
    })

    // Role cards
    document.querySelectorAll(".role-card").forEach((card) => {
      card.addEventListener("mouseenter", function () {
        const icon = this.querySelector(".role-icon")
        if (icon) {
          icon.style.transform = "scale(1.1) rotate(5deg)"
        }
      })

      card.addEventListener("mouseleave", function () {
        const icon = this.querySelector(".role-icon")
        if (icon) {
          icon.style.transform = "scale(1) rotate(0deg)"
        }
      })
    })

    // Skill tags
    document.querySelectorAll(".skill-tag, .interest-tag").forEach((tag) => {
      tag.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-2px) scale(1.05)"
      })

      tag.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)"
      })
    })
  }

  addHoverAnimations()

  // Page transition effects
  function pageTransition() {
    document.body.style.opacity = "0"
    document.body.style.transform = "translateY(20px)"

    setTimeout(() => {
      document.body.style.transition = "opacity 0.5s ease, transform 0.5s ease"
      document.body.style.opacity = "1"
      document.body.style.transform = "translateY(0)"
    }, 100)
  }

  // Call page transition on load
  pageTransition()

  // Add loading animation to images
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "0"
      this.style.transform = "scale(1.1)"
      this.style.transition = "opacity 0.5s ease, transform 0.5s ease"

      setTimeout(() => {
        this.style.opacity = "1"
        this.style.transform = "scale(1)"
      }, 100)
    })
  })

  // Magnetic effect for buttons
  document.querySelectorAll(".cta-button, .submit-btn").forEach((button) => {
    button.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translate(0, 0)"
    })
  })

  // Text reveal animation
  function revealText() {
    const textElements = document.querySelectorAll("h1, h2, h3, p")

    textElements.forEach((element) => {
      const text = element.textContent
      element.innerHTML = ""

      text.split("").forEach((char, index) => {
        const span = document.createElement("span")
        span.textContent = char === " " ? "\u00A0" : char
        span.style.opacity = "0"
        span.style.transform = "translateY(20px)"
        span.style.transition = `opacity 0.5s ease ${index * 0.02}s, transform 0.5s ease ${index * 0.02}s`
        element.appendChild(span)
      })

      // Trigger animation when element is visible
      const textObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll("span").forEach((span) => {
              span.style.opacity = "1"
              span.style.transform = "translateY(0)"
            })
            textObserver.unobserve(entry.target)
          }
        })
      })

      textObserver.observe(element)
    })
  }

  // Uncomment to enable text reveal animation (can be performance intensive)
  // revealText();

  // Particle system for hero background
  function createParticles() {
    const particlesContainer = document.createElement("div")
    particlesContainer.className = "particles"

    const heroSection = document.querySelector(".hero-section")
    if (heroSection) {
      heroSection.appendChild(particlesContainer)

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div")
        particle.className = "particle"
        particle.style.left = Math.random() * 100 + "%"
        particle.style.animationDelay = Math.random() * 8 + "s"
        particle.style.animationDuration = Math.random() * 3 + 5 + "s"
        particlesContainer.appendChild(particle)
      }
    }
  }

  // Uncomment to enable particles (can impact performance)
  // createParticles();

  // Scroll progress indicator
  function createScrollProgress() {
    const progressBar = document.createElement("div")
    progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--accent-gradient);
            z-index: 9999;
            transition: width 0.1s ease;
        `

    document.body.appendChild(progressBar)

    window.addEventListener("scroll", () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      progressBar.style.width = scrollPercent + "%"
    })
  }

  createScrollProgress()
})
