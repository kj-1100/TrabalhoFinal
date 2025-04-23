// Função de registro
async function registerUser(email, password) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        console.log("Tentando enviar email...");
        await userCredential.user.sendEmailVerification();
        console.log("Email enviado (teoricamente).");
        return { success: true, message: "Verifique seu e-mail para ativar a conta" };
    } catch (error) {
        return { success: false, message: getAuthErrorMessage(error) };
    }
}

// Função de login
async function loginUser(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        if (!userCredential.user.emailVerified) {
            await auth.signOut();
            return { success: false, message: "Verifique seu e-mail antes de fazer login" };
        }
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, message: getAuthErrorMessage(error) };
    }
}

// Função de logout
async function logoutUser() {
    try {
        await auth.signOut();
        return { success: true };
    } catch (error) {
        return { success: false, message: getAuthErrorMessage(error) };
    }
}

// Função de recuperação de senha
async function resetPassword(email) {
    try {
        await auth.sendPasswordResetEmail(email);
        return { success: true, message: "E-mail de recuperação enviado" };
    } catch (error) {
        return { success: false, message: getAuthErrorMessage(error) };
    }
}

// Tratamento de erros
function getAuthErrorMessage(error) {
    const errorMap = {
        "auth/invalid-email": "E-mail inválido",
        "auth/user-disabled": "Conta desativada",
        "auth/user-not-found": "Usuário não encontrado",
        "auth/wrong-password": "Senha incorreta",
        "auth/email-already-in-use": "E-mail já cadastrado",
        "auth/weak-password": "Senha muito fraca (mínimo 8 caracteres)",
        "auth/too-many-requests": "Muitas tentativas. Tente mais tarde."
    };
    return errorMap[error.code] || "Erro desconhecido. Tente novamente.";
}

// Exporta as funções para uso global
window.registerUser = registerUser;
window.loginUser = loginUser;
window.logoutUser = logoutUser;
window.resetPassword = resetPassword;