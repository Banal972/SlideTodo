export type pwdInShowState = { [key: string]: boolean }

export interface LoginFormValue {
  email: string
  password: string
}

export interface SignFormValue extends LoginFormValue {
  name: string
  pwdConfirm: string
}
