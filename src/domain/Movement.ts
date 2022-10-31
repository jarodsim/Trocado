interface MovementProps {
  id?: number;
  value: number;
  description: string;
  type: string;
  datetime_created?: Date;
  datetime_updated?: Date;
}

export default class Movement {
  id?: number;
  value: number;
  description: string;
  type: string;
  datetime_created?: Date;
  datetime_updated?: Date;

  constructor(props: MovementProps) {
    this.id = props.id;
    this.value = props.value;
    this.description = props.description;
    this.type = props.type;
    this.datetime_created = props.datetime_created;
    this.datetime_updated = props.datetime_updated;
  }
}
