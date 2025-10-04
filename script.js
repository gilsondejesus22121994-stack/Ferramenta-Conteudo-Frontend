// CONEXÃO DE SERVIDOR (BACKEND)
// **ATENÇÃO:** Esta URL conecta o site ao seu servidor Express no Replit.
// Se o Replit mudar, esta URL deve ser atualizada.
const SERVER_URL = 'https://50b8e536-27a9-43f8-9e9b-3b0ebe94495f-00-zspfth41d1v3.picard.replit.dev';

// --- ELEMENTOS DO DOM ---
const form = document.getElementById('gerador-form');
const resultadoDiv = document.getElementById('resultado');
const loadingDiv = document.getElementById('loading');

// Função para mostrar o resultado ou uma imagem
function exibirResultado(conteudo, isImage = false) {
    resultadoDiv.innerHTML = ''; // Limpa resultados anteriores
    if (isImage) {
        // Se for imagem, cria e exibe a tag <img>
        const img = document.createElement('img');
        img.src = conteudo; // O 'conteudo' é a URL da imagem
        img.alt = 'Imagem gerada pela IA';
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        resultadoDiv.appendChild(img);
    } else {
        // Se for texto, exibe em formato de parágrafo
        const p = document.createElement('p');
        p.textContent = conteudo;
        resultadoDiv.appendChild(p);
    }
}

// Função principal de submissão do formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    const tipoConteudo = document.getElementById('tipo-conteudo').value;
    const descricao = document.getElementById('descricao').value;

    if (!descricao) {
        alert('Por favor, descreva o conteúdo que você deseja.');
        return;
    }

    loadingDiv.style.display = 'block'; // Mostra o loading
    resultadoDiv.innerHTML = ''; // Limpa o resultado

    try {
        let endpoint = '/generate-text'; // Padrão: geração de texto
        if (tipoConteudo === 'capa_video') {
            endpoint = '/generate-image'; // Se for capa de vídeo, usa endpoint de imagem
        }

        const response = await fetch(SERVER_URL + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: descricao }),
        });

        const data = await response.json();

        if (response.ok) {
            if (endpoint === '/generate-image') {
                // Se o endpoint for imagem, exibe a URL da imagem
                exibirResultado(data.imageUrl, true);
            } else {
                // Se for texto, exibe o texto gerado
                exibirResultado(data.text);
            }
        } else {
            // Trata erros do servidor (como Rate Limiting, 429)
            exibirResultado('Erro: ' + (data.error || 'Ocorreu um erro desconhecido no servidor.'));
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
        exibirResultado('Erro: Não foi possível conectar ao servidor. Verifique se o Replit está rodando.');
    } finally {
        loadingDiv.style.display = 'none'; // Esconde o loading
    }
});
/ ** Importante: Mudar esta URL para o seu Replit **
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
