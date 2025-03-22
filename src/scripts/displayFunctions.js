import { excluirPessoa } from './eventHandlers.js'

function criarItemPessoa ( user ) {
    const item = document.createElement( 'li' )
    item.className = 'pessoa-item'
    item.setAttribute( 'aria-expanded', 'false' )
    item.innerHTML = `
        Nome: ${ user.nome }
        <div class="info-pessoa" style="display: none;">
            <p>Email: ${ user.email }</p>
            <p>Data de Nascimento: ${ user.dataNascimento }</p>
            <p>Telefone: ${ user.telefone }</p>
        </div>
    `
    item.addEventListener( 'click', () => toggleInfo( item ) )
    return item
}

export function exibirPessoas ( container, users ) {
    const listaResultados = document.getElementById( container )

    if ( !listaResultados ) {
        console.error( `Container com ID '${ container }' não encontrado.` )
        return
    }

    listaResultados.innerHTML = '' // Limpa o container

    if ( users.length === 0 ) {
        listaResultados.textContent = 'Nenhum e-mail cadastrado.'
    } else {
        const fragment = document.createDocumentFragment()

        users.forEach( ( user ) => {
            const item = criarItemPessoa( user ) // Chama a função para criar o item
            fragment.appendChild( item )
        } )

        listaResultados.appendChild( fragment )
    }

    document.getElementById( 'listaResultados' ).style.display = users.length > 0 ? 'block' : 'none'
}

function toggleInfo ( item ) {
    const infoDiv = item.querySelector( '.info-pessoa' )
    const isExpanded = item.getAttribute( 'aria-expanded' ) === 'true'

    // Alterna a exibição da div de informações
    infoDiv.style.display = isExpanded ? 'none' : 'block'
    item.setAttribute( 'aria-expanded', !isExpanded )
}

export function exibirListaPessoas ( container, users, mostrarBotaoExcluir = false ) {
    exibirPessoas( container, users )

    if ( mostrarBotaoExcluir ) {
        const listaResultados = document.getElementById( container )
        const items = listaResultados.querySelectorAll( '.pessoa-item' )

        items.forEach( ( item, index ) => {
            const btnExcluir = criarBotaoExcluir( users[ index ].email )
            item.appendChild( btnExcluir )
        } )
    }
}

function criarBotaoExcluir ( email ) {
    const btnExcluir = document.createElement( 'button' )
    btnExcluir.textContent = 'Excluir'
    btnExcluir.classList.add( 'btn-excluir' )
    btnExcluir.onclick = () => excluirPessoa( email )
    return btnExcluir
}

export function exibirBotaoExcluir ( container, users ) {
    exibirListaPessoas( container, users, true )
}

window.toggleInfo = toggleInfo