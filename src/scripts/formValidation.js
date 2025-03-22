import { getEmailAtualizar } from './utils.js'

// Constantes e Mensagens de Erro
const errorMessages = {
    required: 'Todos os campos são obrigatórios!',
    invalidEmail: 'Por favor, insira um endereço de e-mail válido.',
    invalidDOB: 'Por favor, insira uma data de nascimento válida.',
    invalidPhone: 'Por favor, insira um número de telefone válido.',
}

// Funções de Validação
export function validateEmail ( email ) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return re.test( email )
}

export function validateDOB ( dob ) {
    // Verifica se a data está no formato YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/
    if ( !regex.test( dob ) ) {
        return false
    }

    // Se o formato estiver correto, converte a data
    const date = new Date( dob )

    // Verifica se a data é válida
    if ( isNaN( date.getTime() ) ) {
        return false
    }

    const today = new Date()
    return date <= today && date.getFullYear() > 1900
}

export function validatePhone ( telefone ) {
    const phonePattern = /^\(\d{2}\) \d{4,5}-\d{4}$/
    return phonePattern.test( telefone )
}

// Função de Exibição de Erros
export function showError ( elementId, message ) {
    const errorElement = document.getElementById( elementId )
    errorElement.textContent = message
    errorElement.style.display = 'block'
}

// Função de Limpeza de Erros
export function clearErrors () {
    const errorElements = document.querySelectorAll( '.error-message' )
    errorElements.forEach( ( error ) => {
        error.style.display = 'none'
    } )

    const inputs = document.querySelectorAll( 'input' )
    inputs.forEach( ( input ) => {
        input.classList.remove( 'error' )
    } )
}

// Função de Formatação
export function formatarTelefone ( input ) {
    if ( !input.value ) return
    let valor = input.value.replace( /\D/g, '' ) // Remove todos os caracteres não numéricos

    if ( valor.length > 11 ) {
        valor = valor.substring( 0, 11 )
    }

    if ( valor.length <= 2 ) {
        valor = valor
    } else if ( valor.length <= 5 ) {
        valor = valor.replace( /(\d{2})(\d)/, '($1) $2' )
    } else if ( valor.length <= 9 ) {
        valor = valor.replace( /(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3' )
    } else {
        valor = valor.replace( /(\d{2})(\d{5})(\d{4})/, '($1) $2-$3' )
    }

    input.value = valor // Atualiza o valor do input
}

// Função de Validação do Formulário
export function validarFormulario ( isUpdate = false ) {
    clearErrors() // Limpa mensagens de erro anteriores

    const { nome, dataNascimento, telefone, email } = capturarValores( isUpdate )

    // Verifica se os campos obrigatórios estão preenchidos
    if ( !nome || !dataNascimento || !telefone || !email ) {
        showError( isUpdate ? 'atualizar_nomeError' : 'nomeError', errorMessages.required )
        return false
    }

    // Valida o e-mail
    if ( !validateEmail( email ) ) {
        showError( isUpdate ? 'atualizar_emailError' : 'emailError', errorMessages.invalidEmail )
        return false
    }

    // Valida a data de nascimento
    if ( !validateDOB( dataNascimento ) ) {
        showError( isUpdate ? 'atualizar_dataNascimentoError' : 'dataNascimentoError', errorMessages.invalidDOB )
        return false
    }

    // Valida o telefone
    if ( !validatePhone( telefone ) ) {
        showError( isUpdate ? 'atualizar_telefoneError' : 'telefoneError', errorMessages.invalidPhone )
        return false
    }

    return true // Retorna true se todas as validações passarem
}

// Função para capturar os valores dos campos
function capturarValores ( isUpdate ) {
    if ( isUpdate ) {
        return {
            nome: document.getElementById( 'atualizar_nome' ).value.trim(),
            dataNascimento: document.getElementById( 'atualizar_dataNascimento' ).value.trim(),
            telefone: document.getElementById( 'atualizar_telefone' ).value.trim(),
            email: getEmailAtualizar() // O e-mail permanece o mesmo
        }
    } else {
        return {
            nome: document.getElementById( 'nome' ).value.trim(),
            dataNascimento: document.getElementById( 'dataNascimento' ).value.trim(),
            telefone: document.getElementById( 'telefone' ).value.trim(),
            email: document.getElementById( 'email' ).value.trim()
        }
    }
}

// Função para limpar campos e mensagens de erro
function limparCampos ( ids ) {
    ids.forEach( id => {
        const input = document.getElementById( id )
        if ( input ) {
            input.value = '' // Limpa o valor do campo
        }
    } )
}

// Função de Limpeza do Formulário
export function limparFormulario ( secao ) {
    if ( secao === 'cadastrar' ) {
        // Limpa os campos de entrada da seção de cadastro
        limparCampos( [ 'nome', 'dataNascimento', 'telefone', 'email' ] )

        // Limpa mensagens de erro
        const mensagemSucesso = document.getElementById( 'mensagemSucesso' )
        if ( mensagemSucesso ) {
            mensagemSucesso.innerHTML = ''
            mensagemSucesso.style.display = 'none'
        }

        const mensagemErro = document.getElementById( 'mensagemErroCadastro' )
        if ( mensagemErro ) {
            mensagemErro.innerHTML = ''
            mensagemErro.style.display = 'none'
        }
    } else if ( secao === 'atualizar' ) {
        // Limpa os campos de entrada da seção de atualização
        limparCampos( [ 'atualizar_nome', 'atualizar_dataNascimento', 'atualizar_telefone' ] )

        // Limpa mensagens de erro
        const mensagemErroAtualizacao = document.getElementById( 'mensagemErroAtualizacao' )
        if ( mensagemErroAtualizacao ) {
            mensagemErroAtualizacao.innerHTML = ''
            mensagemErroAtualizacao.style.display = 'none'
        }
    }
}

// Atribuindo funções ao objeto window
window.formatarTelefone = formatarTelefone
window.validarFormulario = validarFormulario
window.clearErrors = clearErrors
window.limparFormulario = limparFormulario
