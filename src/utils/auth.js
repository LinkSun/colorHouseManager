import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

const PermissionKey = 'Admin-Permission-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getPermission() {
          let data = localStorage.getItem(PermissionKey)
  return data == null ? [] : data.split(',')
}

export function setPermission(permission) {
  return localStorage.setItem(PermissionKey, permission.toString())
}

export function removePermission() {
  return localStorage.removeItem(PermissionKey)
}
