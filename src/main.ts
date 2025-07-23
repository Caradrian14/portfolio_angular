import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

  class App {
    private nav: JQuery<HTMLElement>;
    private navHeight: number;
    private translations: { [key: string]: any } = {};
    private currentLanguage: string = 'en';

    constructor() {
        this.nav = $('nav');
        this.navHeight = this.nav.outerHeight();
        this.setupEventListeners();
        this.loadTranslations(this.currentLanguage);
    }

    private setupEventListeners(): void {
        // Navbar toggler click event
        $('.navbar-toggler').on('click', () => {
            if (!$('#mainNav').hasClass('navbar-reduce')) {
                $('#mainNav').addClass('navbar-reduce');
            }
        });

        // Back to top button
        $(window).scroll(() => {
            if ($(this).scrollTop() > 100) {
                $('.back-to-top').fadeIn('slow');
            } else {
                $('.back-to-top').fadeOut('slow');
            }
        });

        $('.back-to-top').click(() => {
            $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        });

        // ScrollTop
        $('.scrolltop-mf').on("click", () => {
            $('html, body').animate({ scrollTop: 0 }, 1000);
        });

        // Scrolling nav
        $('a.js-scroll[href*="#"]:not([href="#"])').on("click", function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                const target = $(this.hash);
                const targetElement = target.length ? target : $(`[name=${this.hash.slice(1)}]`);
                if (targetElement.length) {
                    $('html, body').animate({ scrollTop: targetElement.offset().top - this.navHeight + 5 }, 1000, "easeInOutExpo");
                    return false;
                }
            }
        }.bind(this));

        // Hide responsive menu when a scroll trigger link is clicked
        $('.js-scroll').on("click", () => {
            $('.navbar-collapse').collapse('hide');
        });

        // Scrollspy
        $('body').scrollspy({ target: '#mainNav', offset: this.navHeight });

        // Navbar Menu Reduce
        $(window).on('scroll', () => {
            const pixels = 50;
            const top = 1200;
            if ($(window).scrollTop() > pixels) {
                $('.navbar-expand-md').addClass('navbar-reduce');
                $('.navbar-expand-md').removeClass('navbar-trans');
            } else {
                $('.navbar-expand-md').addClass('navbar-trans');
                $('.navbar-expand-md').removeClass('navbar-reduce');
            }
            if ($(window).scrollTop() > top) {
                $('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
            } else {
                $('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
            }
        });

        // Skills popup buttons
        $('.show-skills-btn-languaje').on('click', () => {
            $('#skills-popup-languaje').show();
            $('body').addClass('no-scroll');
        });

        $('.show-skills-ide').on('click', () => {
            $('#skills-popup-ide').show();
            $('body').addClass('no-scroll');
        });

        $('.show-skills-btn-frameworks').on('click', () => {
            $('#skills-popup-frameworks').show();
            $('body').addClass('no-scroll');
        });

        $('.show-skills-btn-other').on('click', () => {
            $('#skills-popup-other').show();
            $('body').addClass('no-scroll');
        });

        // Close popup buttons
        $('.close-btn-languaje, .popup').on('click', (event) => {
            if (event.target === this || $(event.target).hasClass('close-btn')) {
                $('#skills-popup-languaje').hide();
                $('body').removeClass('no-scroll');
            }
        });

        $('.close-btn-ide, .popup').on('click', (event) => {
            if (event.target === this || $(event.target).hasClass('close-btn')) {
                $('#skills-popup-ide').hide();
                $('body').removeClass('no-scroll');
            }
        });

        $('.close-btn-frameworks, .popup').on('click', (event) => {
            if (event.target === this || $(event.target).hasClass('close-btn')) {
                $('#skills-popup-frameworks').hide();
                $('body').removeClass('no-scroll');
            }
        });

        $('.close-btn-other, .popup').on('click', (event) => {
            if (event.target === this || $(event.target).hasClass('close-btn')) {
                $('#skills-popup-other').hide();
                $('body').removeClass('no-scroll');
            }
        });

        // Language toggle
        $('#language-toggle').click(() => {
            this.currentLanguage = this.currentLanguage === 'en' ? 'es' : 'en';
            if (!this.translations[this.currentLanguage]) {
                this.loadTranslations(this.currentLanguage);
            } else {
                this.updateContent();
            }
        });
    }

    private loadTranslations(language: string): void {
        $.getJSON(`translation/${language}.json`, (data) => {
            this.translations[language] = data;
            this.updateContent();
        });
    }

    private updateContent(): void {
        for (const key in this.translations[this.currentLanguage]) {
            if (this.translations[this.currentLanguage].hasOwnProperty(key)) {
                $(`${key}`).text(this.translations[this.currentLanguage][key]);
            }
        }
        $('#language-toggle').text(this.currentLanguage === 'en' ? 'Cambiar a Castellano' : 'Change to English');
    }
}

// Initialize the app when the DOM is fully loaded
$(document).ready(() => {
    new App();
});
