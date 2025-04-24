# TrabalhoFinal
Trabalho Final sobre segurança 

para rodar e necessário ser em um localhost caso contrário o reCAPTCHA não funcionara

 O Google reCAPTCHA não funciona ao abrir o index.html diretamente via duplo clique (protocolo file://).
Para que ele funcione corretamente, é necessário rodar o projeto em um servidor local — mesmo que simples.

✅ Opção 1 — Rodar com Node.js (http-server)
Se você tem o Node.js instalado, rode o servidor local com:

npm install -g http-server
cd \pasta\TrabalhoFinal
http-server
Depois, abra o navegador em:
http://localhost:8080


✅ Opção 2 — Rodar com Python (sem necessidade de Node)
Se você tem o Python instalado (versão 3+), use:

cd \pasta\TrabalhoFinal
python -m http.server 8080
Depois, acesse no navegador:
http://localhost:8080

