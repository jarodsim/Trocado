interface BalanceProps {
  id: string
  total: number;
}

export default class Balance {
  id: string
  total: number;

  constructor(props: BalanceProps) {
    this.id = props.id;
    this.total = props.total;
  }
}
