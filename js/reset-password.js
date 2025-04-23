// Função para recuperação de senha
document.getElementById('reset-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('reset-email').value;
    const messageElement = document.getElementById('reset-message');
    
    try {
        await auth.sendPasswordResetEmail(email);
        showMessage('E-mail de recuperação enviado com sucesso!', true);
        
        // Limpa o formulário após 2 segundos
        setTimeout(() => {
            document.getElementById('reset-form').reset();
            window.location.href = 'index.html';
        }, 2000);
        
    } catch (error) {
        const errorMessage = getErrorMessage(error);
        showMessage(errorMessage, false);
        console.error("Erro ao recuperar senha:", error);
    }
});

// Mostra mensagens na tela
function showMessage(message, isSuccess) {
    const element = document.getElementById('reset-message');
    element.textContent = message;
    element.style.color = isSuccess ? 'green' : 'red';
    element.style.display = 'block';
}

// Tratamento detalhado de erros
function getErrorMessage(error) {
    const errorMap = {
        'auth/invalid-email': 'E-mail inválido',
        'auth/user-not-found': 'Nenhum usuário encontrado com este e-mail',
        'auth/missing-email': 'Por favor, insira um e-mail',
        'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
        'auth/network-request-failed': 'Erro de conexão. Verifique sua internet.'
    };
    return errorMap[error.code] || 'Ocorreu um erro. Tente novamente.';
}