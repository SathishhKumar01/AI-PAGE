document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const header = document.querySelector(".header");
  const nav = document.querySelector(".nav-item");

  // Toggle the navigation visibility
  hamburger.addEventListener("click", () => {
    header.classList.toggle("nav-active");
  });
});

document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevents click events from bubbling up
    closeOtherSubmenus(item); // Close other open submenus

    // Toggle the `show-submenu` class only for the clicked menu item
    item.classList.toggle("open");
  });
});

// Function to close other submenus
function closeOtherSubmenus(currentItem) {
  document.querySelectorAll(".nav-item").forEach((item) => {
    if (item !== currentItem) {
      item.classList.remove("open"); // Remove `show-submenu` from all other items
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
    // Keep track of the current section index
    let currentSection = -1;
    let isScrolling = false;  // Prevent multiple scrolls at the same time
    let scrollCount = 0;      // Count the number of scrolls
    const scrollThreshold = 3; // Number of scrolls needed to move to the next section

    // List of sections to scroll to (ensure elements are available in DOM)
    const sections = [
        document.querySelector("[data-scroll-to='section1Container']"),
        document.querySelector("[data-scroll-to='rectangle2']"),
        document.querySelector("[data-scroll-to='rectangle3']"),
        document.querySelector("[data-scroll-to='rectangle4']"),
        document.querySelector("[data-scroll-to='rectangle5']"),
        document.querySelector("[data-scroll-to='rectangle6']"),
        document.querySelector("[data-scroll-to='section7Container']")
    ];

    // Function to scroll to the next section
    function scrollToNextSection() {
        if (currentSection < sections.length - 1 && !isScrolling) {
            isScrolling = true; // Lock scrolling
            currentSection++; // Move to the next section
            const nextSection = sections[currentSection];
            if (nextSection) {
                nextSection.scrollIntoView({ block: "start", behavior: "smooth" });
                setTimeout(() => { isScrolling = false; }, 1300); // Unlock after 1 second
            }
           
        }
    }
     
    // Function to scroll to the previous section
    function scrollToPreviousSection() {
        if (currentSection > 0 && !isScrolling) {
            isScrolling = true; // Lock scrolling
            currentSection--; // Move to the previous section
            const prevSection = sections[currentSection];
            if (prevSection) {
                prevSection.scrollIntoView({ block: "start", behavior: "smooth" });
                setTimeout(() => { isScrolling = false; }, 1300); // Unlock after 1 second
            }
        }
    }

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
 
});
document.querySelectorAll('[data-scroll-to]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('data-scroll-to');
      const targetElement = document.getElementById(targetId);
  
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

