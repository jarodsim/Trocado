interface UserProps {
  id?: string;
  email: string;
}

export default class User {
  id: string;
  email: string;

  constructor(props: UserProps) {
    this.id = props.id;
    this.email = props.email;
  }
}
