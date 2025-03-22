import { setupEventListeners } from './eventHandlers.js'
import { limparFormulario } from './formValidation.js'

export function initialize () {
    try {
        setupEventListeners()
    } catch ( error ) {
        console.error( 'Erro ao configurar os event listeners:', error )
    }
}

export function mostrarSecao ( secaoId ) {
    const secoes = document.querySelectorAll( '.secao' )
    secoes.forEach( ( secao ) => {
        secao.classList.remove( 'active' )
        secao.style.display = 'none'
    } )

    const secaoAtiva = document.getElementById( secaoId.trim() )
    if ( secaoAtiva ) {
        secaoAtiva.style.display = 'block'
        secaoAtiva.classList.add( 'active' )
        limparFormulario( secaoId )

        if ( secaoId === 'consultar' ) {
            limparConsulta()
        }
    } else {
        console.error( `Elemento com ID '${ secaoId }' não encontrado.` )
    }
}

function limparConsulta () {
    const emailConsulta = document.getElementById( 'emailConsulta' )
    const listaResultados = document.getElementById( 'listaResultados' )

    if ( emailConsulta ) emailConsulta.value = ''
    if ( listaResultados ) listaResultados.innerHTML = ''
}

window.mostrarSecao = mostrarSecao
