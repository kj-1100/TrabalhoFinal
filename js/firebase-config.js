// Inicializa o Firebase
const app = firebase.initializeApp(window._FIREBASE_CONFIG);
const auth = firebase.auth(app);

// Função para verificar autenticação
function checkAuth() {
    return new Promise((resolve) => {
        auth.onAuthStateChanged(user => {
            resolve(user);
        });
    });
}

// Exporta apenas o necessário
window.auth = auth;
window.checkAuth = checkAuth;
