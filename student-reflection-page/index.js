const setLanguage = (lang) => {
    document.querySelectorAll('[data-key]').forEach(elem => {
        const key = elem.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            elem.textContent = translations[lang][key];
        }
    });
    document.documentElement.lang = lang;
    document.title = translations[lang].title;
    localStorage.setItem('lang', lang);
    document.querySelectorAll('#language-switcher button').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
};

switcher.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        setLanguage(e.target.getAttribute('data-lang'));
    }
});

setLanguage(currentLang);