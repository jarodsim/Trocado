import User from "./User";

interface CategoryProps {
  id: string
  name: string;
  user?: User;
}

export default class Category {
  id: string
  name: string;
  user?: User; 

  constructor(props: CategoryProps) {
    this.id = props.id;
    this.name = props.name;
    this.user = props.user;
  }
}
