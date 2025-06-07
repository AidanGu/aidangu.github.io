// Main JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobileMenuToggle")
  const navLinks = document.querySelector(".nav-links")

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      mobileMenuToggle.classList.toggle("active")
    })
  }

  // Typing animation for hero section
  const typingText = document.getElementById("typingText")
  if (typingText) {
    const phrases = [
      "Computer Engineering Student.",
      "Maker Space Intern.",
      "AI Researcher.",
      "Adobe Ambassador.",
      "Musician.",
    ]

    let phraseIndex = 0
    let charIndex = 0
    let isDeleting = false

    function typeWriter() {
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

  // Smooth scrolling for navigation links
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

  // Active navigation link highlighting
  const navLinksElements = document.querySelectorAll(".nav-link")
  const currentPage = window.location.pathname.split("/").pop() || "index.html"

  navLinksElements.forEach((link) => {
    const href = link.getAttribute("href")
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })

  // Navbar background on scroll
  const nav = document.querySelector(".nav-container")
  if (nav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        nav.classList.add("scrolled")
      } else {
        nav.classList.remove("scrolled")
      }
    })
  }

  // Contact form handling
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const name = formData.get("name")
      const email = formData.get("email")
      const subject = formData.get("subject")
      const message = formData.get("message")

      // Create mailto link
      const mailtoLink = `mailto:aidan@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`

      // Open email client
      window.location.href = mailtoLink

      // Show success message (you can customize this)
      alert("Thank you for your message! Your email client should open now.")

      // Reset form
      contactForm.reset()
    })
  }

  // Scroll to top functionality
  const scrollToTopBtn = document.createElement("button")
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  scrollToTopBtn.className = "scroll-to-top"
  scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--accent-gradient);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all var(--transition-normal);
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `

  document.body.appendChild(scrollToTopBtn)

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.style.opacity = "1"
      scrollToTopBtn.style.visibility = "visible"
    } else {
      scrollToTopBtn.style.opacity = "0"
      scrollToTopBtn.style.visibility = "hidden"
    }
  })

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Add hover effects to buttons
  document.querySelectorAll(".cta-button, .submit-btn, .download-btn").forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Lazy loading for images
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("loading")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))

  // Add loading states
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", () => {
      const submitBtn = form.querySelector('button[type="submit"]')
      if (submitBtn) {
        submitBtn.disabled = true
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'

        setTimeout(() => {
          submitBtn.disabled = false
          submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>'
        }, 2000)
      }
    })
  })
})

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

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

// Performance optimization
const debouncedResize = debounce(() => {
  // Handle resize events
  console.log("Window resized")
}, 250)

window.addEventListener("resize", debouncedResize)
