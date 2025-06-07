/**
 * THEME MANAGEMENT
 * Dark/light mode with system preference detection
 */

class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("themeToggle")
    this.prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")

    this.init()
  }

  init() {
    this.setupThemeToggle()
    this.applyInitialTheme()
    this.setupSystemThemeListener()
  }

  getCurrentTheme() {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      return savedTheme
    }
    return this.prefersDarkScheme.matches ? "dark" : "light"
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme)

    // Update toggle icon
    if (this.themeToggle) {
      const icon = this.themeToggle.querySelector("i")
      if (icon) {
        icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon"
      }
    }

    // Save to localStorage
    localStorage.setItem("theme", theme)

    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(theme)
  }

  updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]')

    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta")
      metaThemeColor.name = "theme-color"
      document.head.appendChild(metaThemeColor)
    }

    metaThemeColor.content = theme === "dark" ? "#0f172a" : "#ffffff"
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    this.applyTheme(newTheme)

    // Animate the toggle button
    if (this.themeToggle) {
      this.themeToggle.style.transform = "scale(0.8)"
      setTimeout(() => {
        this.themeToggle.style.transform = "scale(1)"
      }, 150)
    }
  }

  setupThemeToggle() {
    if (!this.themeToggle) return

    this.themeToggle.addEventListener("click", () => {
      this.toggleTheme()
    })

    // Keyboard support
    this.themeToggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        this.toggleTheme()
      }
    })
  }

  applyInitialTheme() {
    const initialTheme = this.getCurrentTheme()
    this.applyTheme(initialTheme)
  }

  setupSystemThemeListener() {
    this.prefersDarkScheme.addEventListener("change", (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem("theme")) {
        this.applyTheme(e.matches ? "dark" : "light")
      }
    })
  }
}

// Initialize theme manager
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager()
})
