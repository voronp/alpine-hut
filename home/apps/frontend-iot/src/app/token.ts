export function saveToken(val:string):void {
  window.localStorage.setItem('id_token', val)
}

export function readToken():string {
  return window.localStorage.getItem('id_token')
}
