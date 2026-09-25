const spacer = document.getElementById('scroll-spacer');
const mainContainer = document.getElementById('main-container');
const projects = document.getElementById('projects');
const projectsArrow = document.getElementById('projects-arrow');
const topBar = document.getElementById('top-bar');

const fadeDistance = window.innerHeight * 0.5;
const maxStep = 40; // hard cap per wheel event, so fast scrolling can't skip past logic

let scrollDistance = 0;
let showingProjects = false;
let animating = false;

// updates based on scroll. meaningfully updates when we enter the project view, which lets us scroll through projects without switching screens. 
let virtualScroll = 0;


//sets the scroll zone for the projects area. 
function setSpacerHeight() {
    const extraScroll = 100;

    // scrollheight is the entire height of projects, and we take away what we can already see. 
    // we then add the extrascroll buffer to see all projects
    scrollDistance = Math.max(projects.scrollHeight - window.innerHeight, 0) + extraScroll;

    spacer.style.height = `${window.innerHeight + fadeDistance + scrollDistance}px`;
}

// toggles state between front page and projects area
function setView(view) {
    showingProjects = view === 'projects';

    mainContainer.style.opacity = showingProjects ? 0 : 1;
    mainContainer.style.transform = showingProjects ? 'translateY(-40px)' : 'translateY(0)';  //cool transition effect
    mainContainer.style.pointerEvents = showingProjects ? 'none' : 'auto';

    projects.style.opacity = showingProjects ? 1 : 0;
    projects.style.pointerEvents = showingProjects ? 'auto' : 'none';
    topBar.classList.toggle('projects-view', showingProjects);
}

//snaps to either the front page view or projects view by calling setView. 
function snapTo(view) {
    animating = true;
    virtualScroll = 0;
    setView(view);

    // 600ms means user interaction can't happen for 600ms, avoiding lots of input. 
    setTimeout(() => { animating = false; }, 600);
}

//scrolling logic, ran when mouse wheel scrolls. 
window.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (animating) return;  //prevents scrolling during state transition

    //delta is how much the user has scrolled vertically (positive if down, negative if up)
    const delta = Math.max(Math.min(e.deltaY, maxStep), -maxStep);

    //if we are on the front page, then delta > 0 means we switch to projects. 
    if (!showingProjects) {
        if (delta > 0) snapTo('projects');
        return;
    }

    virtualScroll = Math.min(
        Math.max(virtualScroll + delta, 0), 
        scrollDistance
    );

    if (virtualScroll <= 0 && delta < 0) {
        snapTo('main');
        return;
    }

    projects.style.transform = `translateY(${-virtualScroll}px)`;
}, { passive: false });

window.addEventListener('resize', setSpacerHeight);

setSpacerHeight();
setView('main');

projectsArrow.addEventListener('click', () => snapTo('projects'));