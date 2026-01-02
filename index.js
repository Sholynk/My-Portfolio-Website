if (window.innerWidth <= 768) {
    const navBar = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.menu-icon');

    // Toggle nav visibility and menu icon state
    menuIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        navBar.classList.toggle('nav');
        menuIcon.classList.toggle('open');
    });

    // Hide nav when clicking outside
    window.addEventListener('click', (e) => {

        if (!navBar.contains(e.target) && !menuIcon.contains(e.target)) {
            navBar.classList.remove('nav');
            menuIcon.classList.remove('open');
        }
    });
}

// Scroll Looping Functionality
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('nav li a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('nav li a[href*=' + id + ']').classList.add('active');
            });
        }

    });
    // Sticky Navbar
    let nav = document.querySelector('nav');
    nav.classList.toggle('sticky', window.scrollY > 100);
    // Remove nav and menu icon state on scroll
    const navBar = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.menu-icon');

    navBar.classList.remove('nav');
    menuIcon.classList.remove('open');

    // // Scroll Up Button Show/Hide
    let scrollUpBtn = document.querySelector('.scroll-up-btn');
    scrollUpBtn.classList.toggle('show', window.scrollY > 500);
    // Remove smooth scroll on scroll up button click
    // scrollUpBtn.addEventListener('click', () => {
    //     document.documentElement.style.scrollBehavior = 'auto';
    // });
    // // Smooth scroll on menu items click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.documentElement.style.scrollBehavior = 'smooth';
        });
    });

    // OR
    // // Show/Hide scroll up button on scroll
    // if (pageYOffset >= 500) {
    //     document.querySelector('.scroll-up-btn').classList.add('show');
    // } else {
    //     document.querySelector('.scroll-up-btn').classList.remove('show');
    // }

};


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