import { validateEmail, validateDOB, validatePhone } from './formValidation.js'

export const UserFactory = {
    /**
     * Cria um novo usuário.
     * @param {string} nome - O nome do usuário.
     * @param {string} dataNascimento - A data de nascimento do usuário no formato DD/MM/AAAA.
     * @param {string} telefone - O telefone do usuário.
     * @param {string} email - O e-mail do usuário.
     * @returns {Object} O objeto do usuário criado.
     * @throws {Error} Se o nome ou e-mail estiverem ausentes ou se os dados forem inválidos.
     */
    createUser ( nome, dataNascimento, telefone, email ) {
        this._validateUserData( nome, dataNascimento, telefone, email )

        return { nome, dataNascimento, telefone, email }
    },

    /**
     * Valida os dados do usuário.
     * @private
     * @param {string} nome - O nome do usuário.
     * @param {string} dataNascimento - A data de nascimento do usuário.
     * @param {string} telefone - O telefone do usuário.
     * @param {string} email - O e-mail do usuário.
     * @throws {Error} Se os dados forem inválidos.
     */
    _validateUserData ( nome, dataNascimento, telefone, email ) {
        if ( !nome ) {
            throw new Error( "O nome é obrigatório." )
        }

        if ( !email || !validateEmail( email ) ) {
            throw new Error( "Email inválido." )
        }

        if ( !validateDOB( dataNascimento ) ) {
            throw new Error( "Data de nascimento inválida." )
        }

        if ( telefone && !validatePhone( telefone ) ) {
            throw new Error( "Telefone inválido." )
        }
    }
}
