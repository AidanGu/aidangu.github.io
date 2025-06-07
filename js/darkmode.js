// Dark mode functionality
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle")
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")

  // Get saved theme or default to system preference
  function getCurrentTheme() {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      return savedTheme
    }
    return prefersDarkScheme.matches ? "dark" : "light"
  }

  // Apply theme
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)

    // Update toggle icon
    if (themeToggle) {
      const icon = themeToggle.querySelector("i")
      if (icon) {
        icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon"
      }
    }

    // Save to localStorage
    localStorage.setItem("theme", theme)

    // Update meta theme-color for mobile browsers
    updateMetaThemeColor(theme)
  }

  // Update meta theme color
  function updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]')

    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta")
      metaThemeColor.name = "theme-color"
      document.head.appendChild(metaThemeColor)
    }

    metaThemeColor.content = theme === "dark" ? "#0f172a" : "#ffffff"
  }

  // Toggle theme
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    // Add transition class for smooth theme switching
    document.body.classList.add("theme-transition")

    applyTheme(newTheme)

    // Remove transition class after animation
    setTimeout(() => {
      document.body.classList.remove("theme-transition")
    }, 300)

    // Animate the toggle button
    if (themeToggle) {
      themeToggle.style.transform = "scale(0.8)"
      setTimeout(() => {
        themeToggle.style.transform = "scale(1)"
      }, 150)
    }
  }

  // Initialize theme
  const initialTheme = getCurrentTheme()
  applyTheme(initialTheme)

  // Add event listener to toggle button
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)

    // Add keyboard support
    themeToggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        toggleTheme()
      }
    })
  }

  // Listen for system theme changes
  prefersDarkScheme.addEventListener("change", (e) => {
    // Only auto-switch if user hasn't manually set a preference
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light")
    }
  })

  // Add smooth transition styles
  const style = document.createElement("style")
  style.textContent = `
        .theme-transition * {
            transition: background-color 0.3s ease, 
                       color 0.3s ease, 
                       border-color 0.3s ease,
                       box-shadow 0.3s ease !important;
        }
        
        .theme-transition *::before,
        .theme-transition *::after {
            transition: background-color 0.3s ease, 
                       color 0.3s ease, 
                       border-color 0.3s ease,
                       box-shadow 0.3s ease !important;
        }
    `
  document.head.appendChild(style)

  // Auto theme switching based on time (optional feature)
  function autoThemeSwitch() {
    const hour = new Date().getHours()
    const isDaytime = hour >= 6 && hour < 18
    const suggestedTheme = isDaytime ? "light" : "dark"

    // Only suggest if user hasn't set a preference recently
    const lastManualSwitch = localStorage.getItem("lastManualThemeSwitch")
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000

    if (!lastManualSwitch || Number.parseInt(lastManualSwitch) < oneDayAgo) {
      const currentTheme = document.documentElement.getAttribute("data-theme")

      if (currentTheme !== suggestedTheme) {
        // Show a subtle notification (optional)
        showThemeSuggestion(suggestedTheme)
      }
    }
  }

  // Show theme suggestion notification
  function showThemeSuggestion(suggestedTheme) {
    const notification = document.createElement("div")
    notification.style.cssText = `
            position: fixed;
            bottom: 2rem;
            left: 2rem;
            background: var(--bg-secondary);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 1rem;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            border: 1px solid var(--border-color);
        `

    notification.innerHTML = `
            <span>Switch to ${suggestedTheme} mode?</span>
            <button onclick="this.parentElement.remove(); applyTheme('${suggestedTheme}'); localStorage.setItem('lastManualThemeSwitch', Date.now())" 
                    style="background: var(--accent-primary); color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: pointer;">
                Yes
            </button>
            <button onclick="this.parentElement.remove(); localStorage.setItem('lastManualThemeSwitch', Date.now())" 
                    style="background: transparent; color: var(--text-secondary); border: 1px solid var(--border-color); padding: 0.5rem 1rem; border-radius: 0.5rem; cursor: pointer;">
                No
            </button>
        `

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateY(0)"
      notification.style.opacity = "1"
    }, 100)

    // Auto remove after 10 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.style.transform = "translateY(100px)"
        notification.style.opacity = "0"
        setTimeout(() => {
          notification.remove()
        }, 300)
      }
    }, 10000)
  }

  // Track manual theme switches
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      localStorage.setItem("lastManualThemeSwitch", Date.now().toString())
    })
  }

  // Uncomment to enable auto theme switching
  // autoThemeSwitch();
})
