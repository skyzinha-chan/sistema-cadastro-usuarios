export function showMessage ( containerId, message ) {
    const container = document.getElementById( containerId )

    if ( !container ) {
        console.error( `Container com ID '${ containerId }' não encontrado.` )
        return
    }

    container.textContent = message
    container.style.display = 'block'

    setTimeout( () => hideMessage( containerId ), 3000 )
}

export function hideMessage ( containerId ) {
    const container = document.getElementById( containerId )
    if ( container ) {
        container.style.display = 'none'
    }
}

let emailAtualizar = null

export function setEmailAtualizar ( email ) {
    emailAtualizar = email
}

export function getEmailAtualizar () {
    return emailAtualizar
}
