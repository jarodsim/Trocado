interface CategoryProps {
  id: string
  name: string;
}

export default class Category {
  id: string
  name: string;

  constructor(props: CategoryProps) {
    this.id = props.id;
    this.name = props.name;
  }
}
