;(function() { // eslint-disable-line
  const navbarHeight = 80

  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav.navbar')
    const header = document.querySelector('header.header')

    if (window.pageYOffset >= window.innerHeight - navbarHeight) {
      navbar.classList.add('fixed')
      header.classList.add('fixed')
    } else {
      navbar.classList.remove('fixed')
      header.classList.remove('fixed')
    }
  })


  // Display navbar-collapse when navbar-toggle is clicked and hide it when any links inside it are clicked
  const navbarCollapse = document.querySelector('.navbar-collapse')
  const navbarCollapseTogglers = document.querySelectorAll('.navbar-toggle, .navbar-collapse a')

  navbarCollapseTogglers.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      navbarCollapse.classList.toggle('collapsed')
    })
  })


  // Smooth scroll each navbar link to its section
  const pageLinks = document.querySelectorAll('a[href*=\'#\']')

  pageLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      scrollToElement(document.querySelector(e.target.getAttribute('href')))
    })
  })

  function scrollToElement(element) {
    const scrollDuration = 250
    const startingY = window.pageYOffset
    const elementY = element.offsetTop - navbarHeight
    const diff = elementY - startingY
    let start = null

    // Bootstrap our animation - it will get called right before next frame shall be rendered.
    window.requestAnimationFrame(function step(timestamp) {
      if (!start) {
        start = timestamp
      }

      // Elapsed miliseconds since start of scrolling.
      const time = timestamp - start

      // Get percent of completion in range [0, 1].
      const percent = Math.min(time / scrollDuration, 1)

      window.scrollTo(0, startingY + diff * percent)

      // Proceed with animation as long as we wanted it to.
      if (time < scrollDuration) {
        window.requestAnimationFrame(step)
      }
    })
  }
})()
