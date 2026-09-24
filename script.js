const spacer = document.getElementById('scroll-spacer');
const pageWrapper = document.getElementById('page-wrapper');
const mainContainer = document.getElementById('main-container');
const projects = document.getElementById('projects');

const fadeDistance = window.innerHeight * 0.5; // how much scroll it takes to complete the fade — tune this

let scrollDistance = 0;

function setSpacerHeight() {

    // how much taller #projects' real content is than one viewport
    // extrascroll adds some extra space to scroll
    const extraScroll = 100;

    scrollDistance = Math.max(
        projects.scrollHeight - window.innerHeight,
        0
    ) + extraScroll;

    spacer.style.height = `${window.innerHeight + fadeDistance + scrollDistance}px`;
}

function updateScrollFade() {
    const rect = spacer.getBoundingClientRect();
    const raw = Math.max(-rect.top, 0);

    // phase 1: fading main-container out / projects in
    let fadeProgress = Math.min(raw / fadeDistance, 1);

    const backgroundFadeProgress = Math.min(raw / (fadeDistance * 0.9), 1);

    mainContainer.style.opacity = 1 - backgroundFadeProgress;
    mainContainer.style.transform = `translateY(${-fadeProgress * 40}px)`;
    projects.style.opacity = fadeProgress;

    mainContainer.style.pointerEvents = fadeProgress > 0.5 ? 'none' : 'auto';
    projects.style.pointerEvents = fadeProgress > 0.5 ? 'auto' : 'none';

    // phase 2: once fully faded in, scrolling further moves through the cards
    const scrollRaw = Math.min(Math.max(raw - fadeDistance, 0), scrollDistance);
    const entranceOffset = (1 - fadeProgress) * 40; // keeps the slide-up-on-appear effect

    projects.style.transform = `translateY(${entranceOffset - scrollRaw}px)`;
}

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateScrollFade();
            ticking = false;
        });
        ticking = true;
    }
});

window.addEventListener('resize', () => {
    setSpacerHeight();
    updateScrollFade();
});

setSpacerHeight();
updateScrollFade();

const projectsArrow = document.getElementById('projects-arrow');
projectsArrow.addEventListener('click', () => {
    const spacerTop = spacer.offsetTop;
    window.scrollTo({
        top: spacerTop + fadeDistance,
        behavior: 'smooth'
    });
});