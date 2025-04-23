

// Alternar entre login e registro
document.getElementById('show-register').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

// Formulário de login
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const result = await loginUser(email, password);
    showMessage('login-message', result.message, result.success);



    if (result.success) {
        safeRedirect('dashboard.html');
    }
    passwordInput.value = "";
});

// Formulário de registro
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const recaptchaToken = grecaptcha.getResponse();

    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid || recaptchaToken.trim() === "") {
        showMessage('register-message', passwordCheck.message, false);
        passwordInput.value = "";
        return;
    }
    if (!recaptchaToken) {
        showMessage('register-message', 'Por favor, confirme que você não é um robô.', false);
        return;
    }

    const result = await registerUser(email, password);

    showMessage('register-message', result.message, result.success);

    passwordInput.value = "";
});


// Função auxiliar para mostrar mensagens
function showMessage(elementId, message, isSuccess) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.color = isSuccess ? 'green' : 'red';
    }
}
// Função auxiliar sobre os requisitos de senha 
function validatePassword(password) {


    if (password.length < 8) {
        return { valid: false, message: "A senha deve ter no mínimo 8 caracteres" };
    }
    if (!/[a-z]/.test(password)) {
        return { valid: false, message: "A senha deve conter pelo menos uma letra minúscula" };
    }
    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: "A senha deve conter pelo menos uma letra maiúscula" };
    }
    if (!/[0-9]/.test(password)) {
        return { valid: false, message: "A senha deve conter pelo menos um número" };
    }
    if (!/[\W_]/.test(password)) {
        return { valid: false, message: "A senha deve conter pelo menos um caractere especial (!@#$...)" };
    }
    return { valid: true, };
}

// Só permite caminhos internos relativos (sem "http://", "//" ou backslashes) para  evitar redirecionamento malicioso
 function safeRedirect(path) {
   
    const isSafe = /^[a-zA-Z0-9/_-]+\.html$/.test(path);
    if (isSafe) {
        window.location.href = path;
    } else {
        console.warn('Tentativa de redirecionamento inseguro bloqueada:', path);
    }
}

// Verifica autenticação ao carregar
checkAuth().then(user => {
    if (user && user.emailVerified) {
        window.location.href = 'dashboard.html';
    }
});