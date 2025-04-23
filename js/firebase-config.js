// Configuração do Firebase (substitua com seus dados)
const firebaseConfig = {
    apiKey: "AIzaSyDb0eijnKInu9YfvHgBaTt9ap1otLL_v1k",
    authDomain: "trabalhofinal-43049.firebaseapp.com",
    projectId: "trabalhofinal-43049",
    storageBucket: "trabalhofinal-43049.firebasestorage.app",
    messagingSenderId: "97029804425",
    appId: "1:97029804425:web:03ef0226c7925887975158",
    measurementId: "G-QKDBP5JJW8"
};

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);
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
