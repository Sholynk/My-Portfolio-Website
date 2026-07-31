if (window.innerWidth <= 768) {
    const navBar = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.menu-icon');

    // Toggle nav visibility and menu icon state
    menuIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        navBar.classList.toggle('open');
        menuIcon.classList.toggle('open');
    });

    // Hide nav when clicking outside
    window.addEventListener('click', (e) => {

        if (!navBar.contains(e.target) && !menuIcon.contains(e.target)) {
            navBar.classList.remove('open');
            menuIcon.classList.remove('open');
        }
    });
}

// Scroll Looping Functionality
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('nav li a');

function setActiveNavLink(id) {
    navLinks.forEach((link) => link.classList.remove('active'));
    document.querySelector(`nav li a[href="#${id}"]`)?.classList.add('active');
}

function updateActiveNavLink() {
    let activeId = 'home';
    const scrollPosition = window.scrollY + 160;

    sections.forEach((section) => {
        const id = section.getAttribute('id');
        if (id && scrollPosition >= section.offsetTop) {
            activeId = id;
        }
    });

    setActiveNavLink(activeId);
}

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        const id = link.getAttribute('href')?.slice(1);
        if (id) setActiveNavLink(id);
        document.documentElement.style.scrollBehavior = 'smooth';
    });
});

window.onscroll = () => {
    updateActiveNavLink();
    // Sticky Navbar
    let nav = document.querySelector('nav');
    nav.classList.toggle('sticky', window.scrollY > 100);
    // Remove nav and menu icon state on scroll
    const navBar = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.menu-icon');

    navBar.classList.remove('open');
    menuIcon.classList.remove('open');

    // // Scroll Up Button Show/Hide
    let scrollUpBtn = document.querySelector('.scroll-up-btn');
    scrollUpBtn.classList.toggle('show', window.scrollY > 500);
    // Remove smooth scroll on scroll up button click
    // scrollUpBtn.addEventListener('click', () => {
    //     document.documentElement.style.scrollBehavior = 'auto';
    // });
    // OR
    // // Show/Hide scroll up button on scroll
    // if (pageYOffset >= 500) {
    //     document.querySelector('.scroll-up-btn').classList.add('show');
    // } else {
    //     document.querySelector('.scroll-up-btn').classList.remove('show');
    // }

};

updateActiveNavLink();


// Typing Animation Script

const TypeWriter = function (txtElement, words, wait = 500) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordindex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function () {
    // console.log('Hello');
    // Current index of words
    const current = this.wordindex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if Deleting
    if (this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    // Initial Type Speed
    let typeSpeed = 500;
    if (this.isDeleting) {
        typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        //Set delete to true
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.wordindex++;
        // Pause before start typing
        typeSpeed = 500;
    }


    setTimeout(() => this.type(), 250)
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
}

// Scroll Reveal Animation
ScrollReveal({
    reset: false,
    distance: '80px',
    duration: 2000,
    delay: 200
});
ScrollReveal().reveal('.header-text, .heading', { origin: 'top' });
ScrollReveal().reveal('.header-image, .projects-container, .services-content', { origin: 'bottom' });
ScrollReveal().reveal('.header-content h1, .profile-photo, .skills-content', { origin: 'left' });
ScrollReveal().reveal('.header-content p, .about-image, .skills-content:nth-child(2), .contact-image', { origin: 'right' });

const serviceDetails = {
    web: {
        title: 'Web Development',
        icon: 'fa-code',
        image: 'images/Code-01.png',
        alt: 'Code displayed on a computer screen',
        description: 'I build fast, responsive websites and web applications with a clear visual hierarchy, dependable interactions, and code that is ready to grow with your business.',
        skills: ['Responsive interfaces', 'Frontend development', 'Backend integration', 'Performance tuning']
    },
    design: {
        title: 'Graphics Design',
        icon: 'fa-paint-brush',
        image: 'images/Code-04.png',
        alt: 'A visual project preview',
        description: 'I create visual systems that make brands easier to recognise and content easier to understand, from first concept through polished digital assets.',
        skills: ['Brand identity', 'Social media visuals', 'Marketing materials', 'Design systems']
    },
    marketing: {
        title: 'Digital Marketing',
        icon: 'fa-chart-area',
        image: 'images/Figure_1.png',
        alt: 'Analytics visualisation',
        description: 'I turn audience and content signals into practical marketing actions, helping you improve visibility, engagement, and measurable growth.',
        skills: ['Content strategy', 'Audience research', 'Campaign reporting', 'Conversion analysis']
    }
};

const serviceModal = document.querySelector('#service-modal');
const serviceModalTitle = serviceModal?.querySelector('#service-modal-title');
const serviceModalImage = serviceModal?.querySelector('.service-modal__image');
const serviceModalDescription = serviceModal?.querySelector('.service-modal__description');
const serviceModalSkills = serviceModal?.querySelector('.service-modal__skills');
const serviceModalIcon = serviceModal?.querySelector('.service-modal__eyebrow i');
let lastServiceTrigger;

function closeServiceModal() {
    if (!serviceModal) return;
    serviceModal.classList.remove('is-open');
    serviceModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    lastServiceTrigger?.focus();
}

document.querySelectorAll('.service-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
        const service = serviceDetails[trigger.dataset.service];
        if (!service || !serviceModal) return;
        lastServiceTrigger = trigger;
        serviceModalTitle.textContent = service.title;
        serviceModalDescription.textContent = service.description;
        serviceModalImage.src = service.image;
        serviceModalImage.alt = service.alt;
        serviceModalIcon.className = `fas ${service.icon}`;
        serviceModalSkills.innerHTML = service.skills.map((skill) => `<li><i class="fa-solid fa-check" aria-hidden="true"></i>${skill}</li>`).join('');
        serviceModal.classList.add('is-open');
        serviceModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        serviceModal.querySelector('.service-modal__close').focus();
    });
});

serviceModal?.querySelectorAll('[data-modal-close]').forEach((control) => {
    control.addEventListener('click', closeServiceModal);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && serviceModal?.classList.contains('is-open')) {
        closeServiceModal();
    }
});

const projectDetails = {
    portfolio: {
        title: 'Responsive Portfolio Website',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85',
        alt: 'Developer workspace with a laptop displaying code',
        story: 'I wanted this portfolio to feel calm and straightforward: the kind of place where someone can quickly understand what I do, then stay because the work feels considered. I treated every section as a small conversation rather than a wall of information.',
        brief: 'Create a personal site that introduces my work, services, and ways to get in touch without making the visitor hunt for anything.',
        approach: 'I built a responsive layout around a clear reading order, gave the main actions room to breathe, and added small interactions only where they help guide attention.',
        tools: ['HTML5', 'CSS3', 'JavaScript', 'Responsive design', 'Accessibility']
    },
    ecommerce: {
        title: 'E-commerce Web App',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85',
        alt: 'Person using a laptop for online shopping',
        story: 'For this store concept, I focused on the moments that decide whether shopping feels easy or frustrating: finding the right product, understanding the price, and moving through checkout with confidence. The goal was to make the experience feel familiar without feeling generic.',
        brief: 'Design a practical online shopping flow with product discovery, a shopping cart, and a secure-feeling checkout journey.',
        approach: 'I mapped the journey from browsing to purchase, kept product information scannable, and used clear feedback around cart changes so the interface never leaves the customer guessing.',
        tools: ['JavaScript', 'Product UX', 'Cart flows', 'Responsive UI', 'Checkout design']
    },
    tasks: {
        title: 'Task Management System',
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1400&q=85',
        alt: 'A notebook and task list on a work desk',
        story: 'This was built for people who have plenty to do and do not need another complicated system getting in their way. I kept the core experience focused on making a task visible, giving it a home, and making progress satisfying to track.',
        brief: 'Create a lightweight workspace for planning daily work, assigning priorities, and seeing what still needs attention.',
        approach: 'I reduced the interface to the decisions that matter most—what to do next, what can wait, and what is already done—then made each state easy to scan at a glance.',
        tools: ['JavaScript', 'State management', 'Interaction design', 'Priority planning', 'Progress tracking']
    },
    landing: {
        title: 'Business Landing Page',
        image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85',
        alt: 'Creative team collaborating in a meeting',
        story: 'A good landing page should feel like a helpful introduction, not a sales pitch shouted from across the room. Here, I used the page to make the business offer clear, build trust early, and give visitors an easy next step when they are ready.',
        brief: 'Build a conversion-focused page that explains a service quickly and encourages prospective customers to make contact.',
        approach: 'I organised the content around the customer’s questions, used proof points where they naturally matter, and kept calls to action consistent throughout the page.',
        tools: ['Content hierarchy', 'Conversion UX', 'HTML5', 'CSS3', 'Mobile-first design']
    },
    analytics: {
        title: 'Data Visualization Dashboard',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85',
        alt: 'Data dashboard displayed on a screen',
        story: 'The point of this dashboard was not to show every number available. It was to help someone spot what is changing, ask a better question, and make a decision without getting lost in a spreadsheet.',
        brief: 'Turn a large set of performance data into a dashboard that highlights trends, outliers, and useful next actions.',
        approach: 'I grouped related metrics, gave the most important trends visual priority, and used simple comparisons so the story in the data is easier to understand.',
        tools: ['Python', 'Data visualisation', 'Dashboard UX', 'Analytics', 'JavaScript']
    },
    blog: {
        title: 'Blog Content Platform',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=85',
        alt: 'Writer working at a laptop with notes',
        story: 'This platform was designed around the people who have to keep content moving: writers, editors, and readers. I wanted publishing to feel less like a technical hurdle and more like a reliable part of a team’s everyday rhythm.',
        brief: 'Create a content platform that makes drafting, reviewing, publishing, and discovering articles simple for everyone involved.',
        approach: 'I gave the writing experience a clean, quiet layout, made article management easy to scan, and treated readability as a product feature rather than an afterthought.',
        tools: ['CMS concepts', 'Content design', 'Editorial workflow', 'Responsive reading', 'JavaScript']
    }
};

const projectModal = document.querySelector('#project-modal');
let lastProjectTrigger;

function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('is-open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    lastProjectTrigger?.focus();
}

document.querySelectorAll('.project-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
        const project = projectDetails[trigger.dataset.project];
        if (!project || !projectModal) return;
        lastProjectTrigger = trigger;
        projectModal.querySelector('#project-modal-title').textContent = project.title;
        projectModal.querySelector('.project-modal__image').src = project.image;
        projectModal.querySelector('.project-modal__image').alt = project.alt;
        projectModal.querySelector('.project-modal__story').textContent = project.story;
        projectModal.querySelector('.project-modal__brief').textContent = project.brief;
        projectModal.querySelector('.project-modal__approach').textContent = project.approach;
        projectModal.querySelector('.project-modal__tools').innerHTML = project.tools.map((tool) => `<li>${tool}</li>`).join('');
        projectModal.classList.add('is-open');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        projectModal.querySelector('.project-modal__close').focus();
    });
});

projectModal?.querySelectorAll('[data-project-modal-close]').forEach((control) => {
    control.addEventListener('click', closeProjectModal);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && projectModal?.classList.contains('is-open')) {
        closeProjectModal();
    }
});
