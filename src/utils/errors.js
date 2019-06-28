class iError extends Error {
    constructor(msg = '服务器异常', code = 500) {
        super()

        this.code = code
        this.msg = msg
    }
}

class AuthFailed extends iError {
    constructor(msg) {
        super()

        this.code = 401
        this.msg = msg || '授权失败'
    }
}

class ParamsIllegal extends iError {
    constructor(msg) {
        super()

        this.code = 402
        this.msg = msg || '参数错误'
    }
}

class NotFound extends iError {
    constructor(msg) {
        super()

        this.code = 403
        this.msg = msg || '没有数据'
    }
}

class NotFound404 extends iError {
    constructor(msg) {
        super()

        this.code = 404
        this.msg = msg || '没有内容'
    }
}

class ServerError extends iError {
    constructor(msg) {
        super()

        this.code = 405
        this.msg = msg || '服务异常'
    }
}

class DBError extends iError {
    constructor(msg) {
        super()

        this.code = 406
        this.msg = msg || '数据库操作异常'
    }
}


class RequestError extends iError {
    constructor(msg) {
        super()

        this.code = 407
        this.msg = msg || '请求错误'
    }
}

class Unknown extends iError {
    constructor(msg) {
        super()

        this.code = 999
        this.msg = msg || '未知错误'
    }
}

module.exports = {
    iError,
    AuthFailed,
    ParamsIllegal,
    NotFound,
    Unknown,
    ServerError,
    NotFound404,
    DBError,
    RequestError
}