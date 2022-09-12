interface UserProps {
  id?: number
  email: string
}

export default class User {
  id?: number
  email: string

  constructor(props: UserProps) {
    this.id = props.id
    this.email = props.email
  }
}
