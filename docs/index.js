// student-reflection-page/index.js - FINAL VERSION

document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('language-switcher');
    let currentLanguage = 'en';

    const setLanguage = (lang) => {
        // --- This part handles regular text content ---
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // --- NEW PART: This handles placeholder text ---
        document.querySelectorAll('[data-placeholder-key]').forEach(element => {
            const key = element.getAttribute('data-placeholder-key');
            if (translations[lang] && translations[lang][key]) {
                // Instead of textContent, we change the 'placeholder' attribute
                element.placeholder = translations[lang][key];
            }
        });

        // --- The rest is the same ---
        document.documentElement.lang = lang;
        document.title = translations[lang].title;

        document.querySelectorAll('#language-switcher button').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    };

    languageSwitcher.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const lang = event.target.getAttribute('data-lang');
            if (lang) {
                setLanguage(lang);
            }
        }
    });

    setLanguage(currentLanguage);
});