document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('text-input');
    const wordCount = document.getElementById('word-count');
    const charCount = document.getElementById('char-count');
    const charNoSpaceCount = document.getElementById('char-nospace-count');
    const lineCount = document.getElementById('line-count');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    function updateCounts() {
        const text = textarea.value;

        // Słowa: dowolny ciąg znaków oddzielony białymi znakami
        const words = text.trim().length > 0
            ? text.trim().split(/\s+/).filter(w => w.length > 0)
            : [];
        // Znaki ze spacjami
        const chars = text.length;
        // Znaki bez spacji
        const charsNoSpace = text.replace(/\s/g, '').length;
        // Linie
        const lines = text.length > 0 ? text.split(/\r\n|\r|\n/).length : 0;

        wordCount.textContent = words.length;
        charCount.textContent = chars;
        charNoSpaceCount.textContent = charsNoSpace;
        lineCount.textContent = lines;
    }

    // Motyw: jasny/ciemny
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            themeIcon.textContent = '☀️';
        } else {
            document.body.classList.remove('dark-theme');
            themeIcon.textContent = '🌙';
        }
    }

    // Sprawdź preferencje z localStorage lub systemowe
    function getPreferredTheme() {
        const stored = localStorage.getItem('nt-theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Przełącznik motywu
    themeToggle.addEventListener('click', () => {
        const current = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
        localStorage.setItem('nt-theme', next);
    });

    // Ustaw motyw przy starcie
    setTheme(getPreferredTheme());

    textarea.addEventListener('input', updateCounts);
    updateCounts();
});