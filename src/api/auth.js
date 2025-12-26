import service from '@/plugins/http.js'

export function login(param) {
    return service.post("/oauth/token/login", param)
}

/**获取用户信息 */
export function info() {
    return service.get("/oauth/user-info/full")
}
