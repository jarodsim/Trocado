interface UserProps {
  id: string;
  email: string;
  name: string;
  surname: string;
}

export default class User {
  id: string;
  email: string;
  name: string;
  surname: string;

  constructor(props: UserProps) {
    this.id = props.id;
    this.email = props.email;
    this.name = props.name;
    this.surname = props.surname;
  }
}
