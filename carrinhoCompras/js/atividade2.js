// Função para adicionar um produto ao carrinho
function adicionarProduto(id, nome, valor, quantidade) {
    // Obter os produtos do localStorage ou criar um novo array vazio
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    let produtoExistente = carrinho.find(item => item.id === id);

    if (produtoExistente) {
        // Atualizar a quantidade se o produto já estiver no carrinho
        produtoExistente.quantidade += quantidade;
    } else {
        // Adicionar um novo produto ao array se não estiver no carrinho
        carrinho.push({ id, nome, valor, quantidade });
    }

    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    exibirCarrinho();
}

// Função para remover um produto do carrinho
function removerProduto(id) {
    // Obter os produtos do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));

    // Filtrar os produtos, removendo o produto com o id especificado
    carrinho = carrinho.filter(produto => produto.id !== id);

    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    exibirCarrinho();
}

// Função para exibir os produtos do carrinho
function exibirCarrinho() {
    // Obter os produtos do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));

    // Verificar se o carrinho está vazio
    if (carrinho && carrinho.length > 0) {
        // Exibir os produtos em um elemento HTML (ajuste conforme sua estrutura HTML)
        const listaProdutos = document.getElementById('lista-produtos');
        listaProdutos.innerHTML = '';

        carrinho.forEach(produto => {
            const li = document.createElement('li');
            li.className = 'list-group-item product-list-item'; //Usando boostrap 
            li.innerHTML = `
                <div class="product-info"><div>
                        <p class="product-name">${produto.nome}</p>
                        <p class="product-price">Valor: R$ ${produto.valor.toFixed(2)}</p>
                        <p class="product-quantity">Quantidade: ${produto.quantidade}</p>
                </div></div>
                <button class="remove-btn" onclick="removerProduto(${produto.id})">X</button>
                
            `;

            listaProdutos.appendChild(li);
        });
    } else {
        // Exibir a mensagem de carrinho vazio
        const listaProdutos = document.getElementById('lista-produtos');
        listaProdutos.innerHTML = '<li class="list-group-item text-center">O carrinho está vazio! :(</li>';
    }
    atualizarTotal()
}

function calcularTotal() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    let total = 0
    carrinho.forEach(produto => {
        total += produto.valor * produto.quantidade
    });
    localStorage.setItem('total', JSON.stringify(total));
}

function exibirTotal() {
    const listaCarrinho = document.getElementById('lista-produtos');
    const total = JSON.parse(localStorage.getItem('total')) || 0;
    listaCarrinho.innerHTML += `
        <div class="total-container">
            <h4>Total: R$${total.toFixed(2)}</h4>
        </div>
    `;
}


function atualizarTotal(){
    calcularTotal()
    exibirTotal()
}


// Inicialização da aplicação: verificar se há produtos no carrinho e exibi-los
window.addEventListener("load",exibirCarrinho());
