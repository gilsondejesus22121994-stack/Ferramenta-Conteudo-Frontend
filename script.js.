// ** Importante: Mudar esta URL para o seu Replit **
const REPLIT_SERVER_URL = "https://SEU-NOME-DO-REPLIT.replit.app"; 
// Você deve substituir 'SEU-NOME-DO-REPLIT.replit.app' pela URL do seu projeto Express no Replit

// --- Funções Principais ---

async function gerarConteudo() {
    const tipo = document.getElementById('tipo-conteudo').value;
    const prompt = document.getElementById('prompt-texto').value;
    const statusElement = document.getElementById('status-texto');
    const outputElement = document.getElementById('output-texto');

    if (!prompt) {
        alert("Por favor, digite o tema principal.");
        return;
    }

    statusElement.textContent = "Aguardando resposta do servidor... Conectando à IA...";
    outputElement.value = ""; 

    try {
        // Envia a requisição de texto para o seu servidor Replit
        const response = await fetch(`${REPLIT_SERVER_URL}/api/gerar-texto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tipo, prompt })
        });

        const data = await response.json();

        if (response.ok) {
            outputElement.value = data.textoGerado;
            statusElement.textContent = "Conteúdo gerado com sucesso! (Limitação de uso verificada)";
        } else {
            // Este bloco tratará o Rate Limiting e erros de API
            statusElement.textContent = `Erro do Servidor: ${data.erro || 'Ocorreu um erro desconhecido.'}`;
            alert(`Erro: ${data.erro || 'Não foi possível gerar o conteúdo. Verifique o console.'}`);
        }

    } catch (error) {
        console.error('Erro de conexão:', error);
        statusElement.textContent = "ERRO: Não foi possível conectar ao servidor Replit. Verifique se o seu projeto Express está rodando.";
    }
}


async function gerarImagem() {
    const prompt = document.getElementById('prompt-imagem').value;
    const statusElement = document.getElementById('status-imagem');
    const outputElement = document.getElementById('output-imagem');

    if (!prompt) {
        alert("Por favor, descreva o estilo da capa.");
        return;
    }

    statusElement.textContent = "Aguardando resposta do servidor... Gerando imagem com IA...";
    outputElement.style.display = 'none';

    try {
        // Envia a requisição de imagem para o seu servidor Replit
        const response = await fetch(`${REPLIT_SERVER_URL}/api/gerar-imagem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();

        if (response.ok) {
            outputElement.src = data.urlDaImagem; // A URL da imagem gerada
            outputElement.style.display = 'block';
            statusElement.textContent = "Capa de vídeo gerada com sucesso! (Limitação de uso verificada)";
        } else {
            statusElement.textContent = `Erro do Servidor: ${data.erro || 'Ocorreu um erro desconhecido.'}`;
            alert(`Erro: ${data.erro || 'Não foi possível gerar a imagem.'}`);
        }

    } catch (error) {
        console.error('Erro de conexão:', error);
        statusElement.textContent = "ERRO: Não foi possível conectar ao servidor Replit. Verifique se o seu projeto Express está rodando.";
    }
}
