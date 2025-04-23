// Adicione no dashboard.js para verificar no console
auth.onAuthStateChanged((user) => {
    console.log("Status do usuário:", user);
});

// Verificação de autenticação
auth.onAuthStateChanged((user) => {
    if (!user || !user.emailVerified) {
        // Redireciona para login se não estiver autenticado
        window.location.href = 'index.html';
        return;
    }
    
    // Mostra informações do usuário
    document.getElementById('user-email').textContent = user.email;
    document.getElementById('user-status').textContent = 
        user.emailVerified ? 'E-mail verificado ✅' : 'E-mail não verificado ❌';
});

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
    auth.signOut()
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error("Erro ao sair:", error);
            alert("Ocorreu um erro ao tentar sair");
        });
});