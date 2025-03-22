import { initialize, mostrarSecao } from './domManipulation.js'
import { formatarTelefone } from './formValidation.js'
import { prepararAtualizacao } from './eventHandlers.js'

window.onload = () => {
    try {
        initialize() // Inicializa configurações de listeners e demais inicializações

        configurarTelefoneInput( 'telefone' )
        configurarBotaoAtualizar( 'btnAtualizar' )

        mostrarSecao( 'cadastrar' ) // Exibe a seção inicial
    } catch ( error ) {
        console.error( 'Erro ao inicializar o aplicativo:', error )
    }
}

function configurarTelefoneInput ( inputId ) {
    const telefoneInput = document.getElementById( inputId )

    if ( telefoneInput ) {
        telefoneInput.addEventListener( 'input', () => {
            if ( telefoneInput.value ) {
                formatarTelefone( telefoneInput )
            }
        } )
    } else {
        console.warn( `Campo de telefone com ID '${ inputId }' não encontrado.` )
    }
}

function configurarBotaoAtualizar ( buttonId ) {
    const btnAtualizar = document.getElementById( buttonId )

    if ( btnAtualizar ) {
        btnAtualizar.addEventListener( 'click', prepararAtualizacao )
    } else {
        console.warn( `Botão de atualizar com ID '${ buttonId }' não encontrado.` )
    }
}
