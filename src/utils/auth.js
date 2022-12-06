
export const isAuth = () => {
    const token = localStorage.getItem("token")
    return !(token === null || token === '')
}
export const isTimeLeft = () => {
    const token = localStorage.getItem("token")
    const refresh_token = localStorage.getItem('refresh_token')
    return !(token === null || token === '' || refresh_token === '' || refresh_token === null)
}
export const isTokenRefresh = () => {
    const nowDate = Date.now()
    return (nowDate >= localStorage.getItem('refresh_token_expired'))
}






