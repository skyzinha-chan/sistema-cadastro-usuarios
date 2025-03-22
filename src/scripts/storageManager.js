export const StorageManager = {

    _getUsersFromStorage () {
        try {
            return JSON.parse( localStorage.getItem( 'users' ) ) || []
        } catch ( error ) {
            console.error( "Erro ao obter usuários do localStorage:", error )
            return []
        }
    },

    _saveUsersToStorage ( users ) {
        try {
            localStorage.setItem( 'users', JSON.stringify( users ) )
        } catch ( error ) {
            console.error( "Erro ao salvar usuários no localStorage:", error )
        }
    },

    addUser ( user ) {
        const users = this._getUsersFromStorage()

        if ( users.some( existingUser => existingUser.email === user.email ) ) {
            console.warn( "Usuário já existe:", user.email )
            throw new Error( `Usuário já existe: ${ user.email }` )
        }

        users.push( user )
        this._saveUsersToStorage( users )
    },

    getUsers () {
        return this._getUsersFromStorage()
    },

    deleteUser ( email ) {
        const users = this._getUsersFromStorage()
        const updatedUsers = users.filter( user => user.email !== email )
        this._saveUsersToStorage( updatedUsers )
    }
}
