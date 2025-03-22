import { validarFormulario, formatarTelefone } from './formValidation.js'
import { StorageManager } from './storageManager.js'
import { UserFactory } from './userFactory.js'
import { exibirListaPessoas } from './displayFunctions.js'
import { showMessage, setEmailAtualizar, getEmailAtualizar } from './utils.js'

export function setupEventListeners () {
    const cadastroForm = document.getElementById( 'cadastroForm' )
    const btnConsultar = document.getElementById( 'btnConsultar' )
    const atualizarForm = document.getElementById( 'atualizarForm' )

    cadastroForm.addEventListener( 'submit', handleCadastroSubmit )
    btnConsultar.addEventListener( 'click', () => consultar( true ) )
    atualizarForm.addEventListener( 'submit', handleAtualizarSubmit )
}

function handleCadastroSubmit ( event ) {
    event.preventDefault()
    const cadastroForm = event.target

    if ( validarFormulario() ) {
        adicionarPessoa()
        cadastroForm.reset()
    }
}

function handleAtualizarSubmit ( event ) {
    event.preventDefault()

    const email = getEmailAtualizar()
    const novosDados = {
        nome: document.getElementById( 'atualizar_nome' ).value.trim(),
        dataNascimento: document.getElementById( 'atualizar_dataNascimento' ).value.trim(),
        telefone: document.getElementById( 'atualizar_telefone' ).value.trim(),
        email
    }

    formatarTelefone( { value: novosDados.telefone } )

    if ( !validarFormulario( true ) ) {
        return
    }

    atualizarPessoa( email, novosDados )
}

export function consultar ( excluir = false ) {
    const emailConsulta = document.getElementById( 'emailConsulta' ).value.toLowerCase().trim()
    const listaResultados = document.getElementById( 'listaResultados' )

    listaResultados.innerHTML = ''
    const users = StorageManager.getUsers()

    if ( users.length === 0 ) {
        showMessage( 'listaResultados', 'Nenhum e-mail cadastrado.' )
        return
    }

    if ( !emailConsulta ) {
        showMessage( 'listaResultados', 'Por favor, insira um e-mail para consulta.' )
        return
    }

    const pessoasFiltradas = users.filter( user => user.email.toLowerCase() === emailConsulta )

    if ( pessoasFiltradas.length === 0 ) {
        const mensagem = document.createElement( 'li' )
        mensagem.textContent = 'VERIFIQUE SE E-MAIL ESTÁ CORRETO'
        listaResultados.appendChild( mensagem )
    } else {
        exibirListaPessoas( listaResultados.id, pessoasFiltradas, excluir )
    }
}

export function adicionarPessoa () {
    const nome = document.getElementById( 'nome' ).value
    const dataNascimento = document.getElementById( 'dataNascimento' ).value
    const telefone = document.getElementById( 'telefone' ).value
    const email = document.getElementById( 'email' ).value

    clearErrors()

    if ( !validarFormulario() ) return

    try {
        const user = UserFactory.createUser( nome, dataNascimento, telefone, email )
        StorageManager.addUser( user )

        showMessage( 'mensagemSucesso', 'Pessoa cadastrada com sucesso!' )
        document.getElementById( 'cadastroForm' ).reset()
    } catch ( error ) {
        showMessage( 'mensagemErroCadastro', error.message )
    }

    console.log( "Dados do usuário adicionados:", { nome, dataNascimento, telefone, email } )
}

export function excluirPessoa ( email ) {
    if ( confirm( 'Tem certeza que deseja excluir esta pessoa?' ) ) {
        try {
            StorageManager.deleteUser( email )
            alert( 'Pessoa excluída com sucesso!' )

            const listaResultados = document.getElementById( 'listaResultados' )
            listaResultados.innerHTML = ''

            const mensagemVazia = document.createElement( 'li' )
            mensagemVazia.textContent = 'Nenhum usuário encontrado.'
            listaResultados.appendChild( mensagemVazia )
        } catch ( error ) {
            alert( 'Erro ao excluir a pessoa: ' + error.message )
        }
    }
}

export function atualizarPessoa ( email, novosDados ) {
    try {
        const users = StorageManager.getUsers()
        const userIndex = users.findIndex( user => user.email === email )

        if ( userIndex !== -1 ) {
            users[ userIndex ] = {
                ...users[ userIndex ],
                nome: novosDados.nome,
                dataNascimento: novosDados.dataNascimento,
                telefone: novosDados.telefone
            }

            StorageManager._saveUsersToStorage( users )

            showMessage( 'mensagemSucessoAtualizar', 'Dados atualizados com sucesso!' )

            setTimeout( () => mostrarSecao( 'consultar' ), 1000 )
        } else {
            showMessage( 'mensagemErroAtualizacao', 'Usuário não encontrado.' )
        }
    } catch ( error ) {
        console.error( "Erro ao atualizar usuário:", error )
        showMessage( 'mensagemErroAtualizacao', 'Ocorreu um erro ao atualizar os dados.' )
    }
}

export function prepararAtualizacao () {
    try {
        const email = document.getElementById( 'emailConsulta' ).value.trim()
        clearErrors()

        if ( !email ) {
            showMessage( 'mensagemErro', 'Por favor, insira um e-mail para consulta.' )
            return
        }

        const users = StorageManager.getUsers()
        const user = users.find( p => p.email === email )

        if ( user ) {
            document.getElementById( 'atualizar_nome' ).value = user.nome || ''
            document.getElementById( 'atualizar_dataNascimento' ).value = user.dataNascimento || ''
            document.getElementById( 'atualizar_telefone' ).value = user.telefone || ''

            setEmailAtualizar( user.email )
            mostrarSecao( 'atualizar' )
        } else {
            showMessage( 'mensagemErro', 'Usuário não encontrado.' )
        }
    } catch ( error ) {
        console.error( "Erro ao preparar atualização:", error )
        showMessage( 'mensagemErro', 'Ocorreu um erro ao preparar a atualização.' )
    }
}

window.consultar = consultar
window.prepararAtualizacao = prepararAtualizacao
window.setupEventListeners = setupEventListeners
window.adicionarPessoa = adicionarPessoa
