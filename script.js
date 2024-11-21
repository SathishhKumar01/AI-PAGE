document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const header = document.querySelector(".header");

  // Toggle the navigation visibility
  hamburger.addEventListener("click", () => {
      header.classList.toggle("nav-active");
  });

  // Close other submenus when clicking a nav-item
  document.querySelectorAll(".nav-item").forEach((item) => {
      item.addEventListener("click", (event) => {
          event.stopPropagation(); // Prevents click events from bubbling up
          closeOtherSubmenus(item); // Close other open submenus
          item.classList.toggle("open");
      });
  });

  // Function to close other submenus
  function closeOtherSubmenus(currentItem) {
      document.querySelectorAll(".nav-item").forEach((item) => {
          if (item !== currentItem) {
              item.classList.remove("open");
          }
      });
  }

  // Scrolling functionality
  let currentSection = -1;
  let isScrolling = false;
  let scrollCount = 0;
  const scrollThreshold = 3;

  const sections = [
      document.querySelector("[data-scroll-to='section1Container']"),
      document.querySelector("[data-scroll-to='rectangle2']"),
      document.querySelector("[data-scroll-to='rectangle3']"),
      document.querySelector("[data-scroll-to='rectangle4']"),
      document.querySelector("[data-scroll-to='rectangle5']"),
      document.querySelector("[data-scroll-to='rectangle6']"),
      document.querySelector("[data-scroll-to='section7Container']")
  ];

  function scrollToNextSection() {
      if (currentSection < sections.length - 1 && !isScrolling) {
          isScrolling = true;
          currentSection++;
          const nextSection = sections[currentSection];
          if (nextSection) {
              nextSection.scrollIntoView({ block: "start", behavior: "smooth" });
              setTimeout(() => { isScrolling = false; }, 1300);
          }
      }
  }

  function scrollToPreviousSection() {
      if (currentSection > 0 && !isScrolling) {
          isScrolling = true;
          currentSection--;
          const prevSection = sections[currentSection];
          if (prevSection) {
              prevSection.scrollIntoView({ block: "start", behavior: "smooth" });
              setTimeout(() => { isScrolling = false; }, 1300);
          }
      }
  }

  // Handle desktop scrolling
  window.addEventListener("wheel", (event) => {
      if (event.deltaY > 0) {
          scrollCount++;
          if (scrollCount >= scrollThreshold) {
              scrollToNextSection();
              scrollCount = 0;
          }
      } else {
          scrollCount--;
          if (scrollCount <= -scrollThreshold) {
              scrollToPreviousSection();
              scrollCount = 0;
          }
      }
  });
      // Scroll event listener to detect scroll direction
      window.addEventListener("wheel", function (event) {
        // Increase scroll count based on the scroll direction
        if (event.deltaY > 0) {
            // Scrolling down
            scrollCount++;
            if (scrollCount >= scrollThreshold) {
                if(currentSection==5){
                    const image = document.getElementById('img');
                    image.style.position = 'absolute';
                }
                scrollToNextSection();
                scrollCount = 0; // Reset count after scrolling
            }
        } else {
            // Scrolling up
            scrollCount--;
            if (scrollCount <= -scrollThreshold) {
                if(currentSection==3){
                    const image = document.getElementById('img');
                    image.style.position = 'fixed';
                }
                scrollToPreviousSection();
                scrollCount = 0; // Reset count after scrolling
            }
        }
    });

  // Handle mobile touch scrolling
  let touchStartY = 0;
  let touchEndY = 0;

  window.addEventListener("touchstart", (event) => {
      touchStartY = event.touches[0].clientY;
  });

  window.addEventListener("touchmove", (event) => {
      touchEndY = event.touches[0].clientY;
  });

  window.addEventListener("touchend", () => {
      const touchDifference = touchStartY - touchEndY;

      if (Math.abs(touchDifference) > 50) { // Sensitivity threshold
          if (touchDifference > 0) {
              scrollToNextSection();
          } else {
              scrollToPreviousSection();
          }
      }
  });

  // Smooth scrolling for links
  document.querySelectorAll("[data-scroll-to]").forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
          e.preventDefault();

          const targetId = anchor.getAttribute("data-scroll-to");
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
              targetElement.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
              });
          }
      });
  });
});
