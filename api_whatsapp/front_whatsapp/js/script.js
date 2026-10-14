//Função do Registro do Usuário

async function realizarRegistro() {
    // 1. Capturar os valores direto do DOM
    const apelido = document.getElementById('regApelido').value;
    const senha = document.getElementById('regSenha').value;
    const telefone = document.getElementById('regTelefone').value;
    
    // 2. Empacotar os dados no formato exigido pela API (form-data)
    const formData = new FormData();
    formData.append('apelido', apelido);
    formData.append('senha', senha);
    formData.append('telefone', telefone);

    try {
        // 3. Disparar a requisição POST para o endpoint
        const resposta = await fetch('http://localhost:3000/registrar', {
            method: 'POST',
            body: formData
        });
        
        // Transforma a resposta do servidor em um objeto JavaScript
        const dados = await resposta.json();

        // Verifica se o servidor retornou 201 Created
        if (resposta.ok) {
            alert('Sucesso: ' + dados.mensagem);
        } else {
            // Caso ocorra o erro 409 Conflict (Utilizador Já Existe)
            alert('Atenção: ' + dados.mensagem);
        }
    } catch (erro) {
        console.error('Erro de comunicação:', erro);
        alert('Falha ao conectar com o servidor da API.');
    }
}

//Função do Chat

async function enviarMensagem() {
    // 1. Resgatar destinatário e texto da tela
    const telefoneDestino = document.getElementById('destinatario').value;
    const mensagem = document.getElementById('textoMensagem').value;
    
    // Nota de aula: Estes dados de autenticação normalmente ficam
    // salvos no localStorage ou sessionStorage após o login na rota /auth.
    // Estamos fixando (hardcoding) apenas para fins de teste isolado.
    const meuTelefone = '5518999999999';
    const minhaSenhaHash = '5f4dcc3b5aa765d61d8327deb882cf99';
    
    // 2. Montar o payload no formato JSON documentado
    const dadosMensagem = {
        telefone: telefoneDestino,
        mensagem: mensagem
    };
    
    try {
        // 3. Configurar Fetch com Query Params na URL e JSON no Body
        const url = `http://localhost:3000/chat?telefone=${meuTelefone}&senha_hash=${minhaSenhaHash}`;

        const resposta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Obriga que o header seja JSON
            },
            body: JSON.stringify(dadosMensagem) // Converte objeto JS em string JSON
        });
        
        const dadosRetorno = await resposta.json();
        
        // 200 OK significa que a mensagem foi enviada
        if (resposta.ok) {
            alert('Status: ' + dadosRetorno.mensagem);
            document.getElementById('textoMensagem').value = ''; // Limpa o campo
        } else {
            // Trata o erro 401 Unauthorized (Credenciais inválidas)
            alert('Falha: ' + dadosRetorno.mensagem);
        }
    } catch (erro) {
        console.error('Erro na requisição:', erro);
    }
}