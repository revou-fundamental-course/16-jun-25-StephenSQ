// make element variables
let NAVBAR, CONTENT, tabButton, tabContent;
document.addEventListener('DOMContentLoaded', () => {
    // Define element variables after everything is loaded
    NAVBAR = document.getElementById('NAVBAR');
    CONTENT = document.getElementById('CONTENT');
    tabButton = document.getElementsByClassName('tab');
    tabContent = document.getElementsByClassName('tab-content');

    // Add EventListeners
    for (let i = 0; i < tabButton.length; i++) {
        // the key is that tabButton and tabContent elements are in the same order in the html n css files
        tabButton[i].addEventListener('click', () => { switchTab(tabButton[i], tabContent[i]) });
    }

    // Make the Arrival tab as initial tab with switchTab
    tabButton[0].click()

    // Controls the NAVBAR's height
    window.addEventListener('resize', () => {
            NAVBAR.style.height = `${window.innerHeight}px`;
    });

    // trigger the resize event so the code inside the EventListener above is executed
    window.dispatchEvent(new Event('resize'));

    // svg injection to use svg graphics stuff
    injectSVG('.icon-house', '../assets/graphics/house.svg');
    injectSVG('.icon-credit', '../assets/graphics/credit.svg');
    injectSVG('.icon-calc', '../assets/graphics/calculator.svg');
    injectSVG('.icon-triangle', '../assets/graphics/triangle.svg');
    injectSVG('.icon-github', '../assets/graphics/github.svg');
    injectSVG('.icon-instagram', '../assets/graphics/instagram.svg');
    injectSVG('.icon-user', '../assets/graphics/user.svg');
});
// svg graphics injection to elements
const svgCache = {};
async function injectSVG(targetSelector, filePath) {
    try {
        // AASSSSSSSSSSSSKKKK
        let svgText = svgCache[filePath];

        if (!svgText) {
            const res = await fetch(filePath);
            if (!res.ok) throw new Error(`Failed to load ${filePath}`);
            svgText = await res.text();
            svgCache[filePath] = svgText;
        }
        // inject svgs for each element with the target
        const targets = document.querySelectorAll(targetSelector);
        targets.forEach(el => {
            el.innerHTML = svgText;
        });

  } catch (err) {
    console.error(err);
  }
}

// a function for NAVBAR's tab switching buttons. NOTE : the order of buttons and its corresponding content must be the same because this function is order dependant
let prevButton, prevContent;
function switchTab(_button, _content) {
    // deactivate previous stuff
    if (prevButton != undefined) {
        prevButton.classList.remove('active');
        prevContent.style.display = 'none';
    }
    // activate current button and content
    _button.classList.add('active');
    _content.style.display = 'block';
    // now current is remembered as previous
    prevButton = _button;
    prevContent = _content;
}