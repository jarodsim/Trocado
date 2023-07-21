import Category from "./Category";
import User from "./User";

interface MovementProps {
  id: string;
  value: number;
  description: string;
  type: string;
  datetime_created?: Date;
  datetime_updated?: Date;
  user?: User;
  category?: Category;
}

export default class Movement {
  id: string;
  value: number;
  description: string;
  type: string;
  datetime_created?: Date;
  datetime_updated?: Date;
  user?: User;
  category?: Category;

  constructor(props: MovementProps) {
    this.id = props.id;
    this.value = props.value;
    this.description = props.description;
    this.type = props.type;
    this.datetime_created = props.datetime_created;
    this.datetime_updated = props.datetime_updated;
    this.user = props.user;
    this.category = props.category;
  }
}
