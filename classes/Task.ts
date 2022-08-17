
export class Task {
  args: any;
  isComplete;
  constructor(args: { condition: boolean } = { condition: false }) {
    this.isComplete = args.condition;
    this.isDirty();
  }
  isDirty = () => {};
  getIsComplete() {
    return this.isComplete;
  }
}
