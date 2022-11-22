interface CategoryProps {
  id?: number;
  title: string;
  total_amount: number;
  type: string;
  description: string;
  datetime_start: Date;
  datetime_end: Date;
}

export default class Category {
  id?: number;
  title: string;
  total_amount: number;
  type: string;
  description: string;
  datetime_start: Date;
  datetime_end: Date;

  constructor(props: CategoryProps) {
    this.id = props.id;
    this.title = props.title;
    this.datetime_end = props.datetime_end;
    this.datetime_start = props.datetime_start;
    this.description = props.description;
    this.total_amount = props.total_amount;
    this.type = props.type;
  }
}
