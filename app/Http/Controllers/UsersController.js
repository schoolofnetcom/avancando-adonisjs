'use strict'

const Validator = use('Validator')
const Hash = use('Hash')

class UsersController {
    static get inject() {
        return [
            'App/Model/User'
        ]
    }

    constructor(User) {
        this.User = User
    }

    * index(request, response) {
        yield response.sendView('users_index')
    }

    * store(request, response) {
        const data = request.only('username', 'email', 'password')
        data.password = yield Hash.make(request.input('password'))

        const validation = yield Validator.validate(data, this.User.rules)

        if (validation.fails()) {
            response.json(validation.messages())
            return
        }

        yield this.User.create(data)

        response.redirect('/users')
    }


    * login(request, response) {
        yield response.sendView('users_login')
    }

    * auth(request, response) {
        const username = request.input('username')
        const password = request.input('password')

        const login = yield request.auth.attempt(username, password)

        if (login) {
            response.send('Successfully')
            return
        }

        response.unauthorized('Invalid credentials')
    }

    * logout(request, response) {
        const isLogged = yield request.auth.check()

        if (isLogged) {
            yield request.auth.logout()

            response.redirect('/users')
        }

        response.send('opss nothing here')
    }

    * user(request, response) {
        const isLogged = yield request.auth.check()

        if (isLogged) {
            const user = yield request.auth.getUser()

            if (user) {
                response.ok(user)
                return
            }
            response.unauthorized('Invalid credentials')
        }
    }
}

module.exports = UsersController
