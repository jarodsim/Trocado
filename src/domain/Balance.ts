interface BalanceProps {
  id?: number;
  total: number;
}

export default class Balance {
  id?: number;
  total: number;

  constructor(props: BalanceProps) {
    this.id = props.id;
    this.total = props.total;
  }
}
