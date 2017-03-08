'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
    static get rules() {
        return {
            username: 'required|unique:users',
            password: 'required'
        }
    }
    apiTokens() {
        return this.hasMany('App/Model/Token')
    }
}

module.exports = User
