document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Função para aplicar o tema e atualizar o ícone
    function setTheme(mode) {
        document.documentElement.setAttribute('data-theme', mode);
        localStorage.setItem('theme', mode);
        if (themeIcon) {
            themeIcon.textContent = mode === 'dark' ? 'light_mode' : 'dark_mode';
        }
    }

    // Detecta preferência salva ou do sistema
    const savedTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    setTheme(savedTheme); // Aplica o tema assim que a página carrega

    // Alterna o tema ao clicar no botão
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
});
