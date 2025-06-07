/**
 * CONTACT FORM FUNCTIONALITY
 * Handles form submission with Formspree integration
 */

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")
  const successMessage = document.getElementById("formSuccess")
  const errorMessage = document.getElementById("formError")

  if (!contactForm) return

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Get form data
    const formData = new FormData(contactForm)

    // Check honeypot field for spam protection
    if (formData.get("_gotcha")) {
      return // Likely spam, silently ignore
    }

    // Show loading state
    const submitBtn = contactForm.querySelector(".submit-btn")
    const originalText = submitBtn.innerHTML
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
    submitBtn.disabled = true

    // Hide any existing messages
    successMessage.classList.remove("show")
    errorMessage.classList.remove("show")

    try {
      // Submit to Formspree
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        // Show success message
        successMessage.classList.add("show")
        contactForm.reset()

        // Add celebration animation
        createConfetti()
      } else {
        throw new Error("Form submission failed")
      }
    } catch (error) {
      // Show error message
      errorMessage.classList.add("show")
      console.error("Form submission error:", error)
    } finally {
      // Reset button state
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }
  })

  // Auto-hide messages after 5 seconds
  function autoHideMessage(element) {
    setTimeout(() => {
      element.classList.remove("show")
    }, 5000)
  }

  // Watch for message visibility changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.target.classList.contains("show")) {
        autoHideMessage(mutation.target)
      }
    })
  })

  observer.observe(successMessage, { attributes: true, attributeFilter: ["class"] })
  observer.observe(errorMessage, { attributes: true, attributeFilter: ["class"] })
})

/**
 * CONFETTI ANIMATION
 * Creates a celebration effect when form is submitted successfully
 */
function createConfetti() {
  const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4", "#10b981"]
  const confettiCount = 50

  for (let i = 0; i < confettiCount; i++) {
    createConfettiPiece(colors[Math.floor(Math.random() * colors.length)])
  }
}

function createConfettiPiece(color) {
  const confetti = document.createElement("div")
  confetti.style.cssText = `
    position: fixed;
    width: 10px;
    height: 10px;
    background: ${color};
    top: -10px;
    left: ${Math.random() * 100}vw;
    z-index: 10000;
    pointer-events: none;
    border-radius: 50%;
  `

  document.body.appendChild(confetti)

  // Animate the confetti
  const animation = confetti.animate(
    [
      {
        transform: `translateY(0) rotate(0deg)`,
        opacity: 1,
      },
      {
        transform: `translateY(100vh) rotate(720deg)`,
        opacity: 0,
      },
    ],
    {
      duration: Math.random() * 2000 + 1000,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    },
  )

  // Remove confetti after animation
  animation.addEventListener("finish", () => {
    confetti.remove()
  })
}
