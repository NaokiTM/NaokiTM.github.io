function createProjectCard({ title, image, tech, points, github, showButton = true }) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.setProperty('--background-image', `url('${image}')`);

    card.innerHTML = `
        <div class="project-card-container">
            <div class="project-topbar">
                <div class="project-card-title">${title}</div>
                <div class="card-carousel" data-items="${tech.join(', ')}">
                    <span class="carousel-item">${tech[0]}</span>
                </div>
            </div>

            <div class="project-card-description-container">
                <div class="project-card-description">
                    <ul>
                        ${points.map(point => `<li>${point}</li>`).join('')}
                    </ul>
                </div>
            </div>

            ${showButton ? `
                <a class="project-github-button" href="${github}" target="_blank" rel="noopener noreferrer" aria-label="View ${title} on GitHub">
                    <img src="/projectimages/github.png" alt="">
                    <span>View on GitHub</span>
                </a>
            ` : ''}
        </div>
    `;

    return card;
}

const projectsContainer = document.getElementById('projects');

projectsContainer.appendChild(createProjectCard({
    title: "Bookmarks",
    image: "projectimages/reader.png",
    tech: ["React-Native", "Expo", "Javascript"],
    points: [
        "EPUB and PDF reader with inline LLM assistance for exploring books in greater depth.",
        "Multiple bookmarks make cross-referencing different sections easier for study.",
        "Contextual explanations help explain smaller sections within the bigger picture.",
        "A welcome summary recaps the book so far after time away.",
        "AI-powered PDF text extraction can also summarise manga stories."
    ],
    github: "https://github.com/NaokiTM/bookmarks"
}));

projectsContainer.appendChild(createProjectCard({
    title: "knights tour solver",
    image: "projectimages/chess.png",
    tech: ["Python", "Pygame"],
    points: [
        "A graphical solver for the classic Knight's Tour problem.",
        "Implemented Warnsdorff's heuristic to greedily select the most constrained next move.",
        "Visualised available moves and the knight's previous path using Pygame.",
        "Planned extensions include a user-solve mode and support for custom board sizes."
    ],
    github: "https://github.com/NaokiTM/knights-tour"
}));

projectsContainer.appendChild(createProjectCard({
    title: "Synthasonik",
    image: "projectimages/daw.png",
    tech: ["SvelteKit", "Tailwind"],
    points: [
        "A minimalistic web-based DAW / DAW interface, loosely inspired by Logic Pro X.",
        "Implemented multi-track audio playback and sample importing using the Web Audio API.",
        "Used Svelte stores and writable stores to manage global and dynamic application state.",
        "Used Tailwind CSS to rapidly develop and style a complex interactive interface."
    ],
    github: "https://github.com/NaokiTM/SynthaSonik"
}));

projectsContainer.appendChild(createProjectCard({
    title: "Linux Dotfiles",
    image: "projectimages/dots.png",
    tech: ["Stow", "Shell"],
    points: [
        "Personal Linux dotfiles for my current Arch Linux setup.",
        "Configured around Hyprland and the Kitty terminal.",
        "Uses GNU Stow to manage and symlink configuration files.",
        "Includes installation instructions in the README.",
    ],
    github: "https://github.com/NaokiTM/dotfiles"
}));

projectsContainer.appendChild(createProjectCard({
    title: "ML based DDOS detection",
    image: "projectimages/diss.png",
    tech: ["Python", "Scikit-learn", "TensorFlow", "Mininet"],
    points: [
        "Used software-defined networking (SDN) with Mininet to simulate DDoS traffic.",
        "Developed POX modules to detect and block malicious traffic.",
        "Implemented machine-learning models using Scikit-learn and TensorFlow.",
        "Investigated automated DDoS detection and mitigation within an SDN environment."
    ],

    // redundant github link
    github: "https://github.com/NaokiTM",
    showButton: false
}));

// this will now run after the project cards have been appended, which prevents loading time issues
document.querySelectorAll('.card-carousel').forEach(carousel => {
    const words = carousel.dataset.items.split(',').map(w => w.trim());
    const item = carousel.querySelector('.carousel-item');
    let index = 0;

    setInterval(() => {
        index = (index + 1) % words.length;
        item.textContent = words[index];

        item.style.animation = 'none';
        void item.offsetWidth;
        item.style.animation = null;
    }, 1000);
});