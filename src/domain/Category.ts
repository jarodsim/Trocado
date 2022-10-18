interface CategoryProps {
  id?: number;
  name: string;
}

export default class Category {
  id?: number;
  name: string;

  constructor(props: CategoryProps) {
    this.id = props.id;
    this.name = props.name;
  }
}
