import { Task } from "./Task";
import EventEmitter from "../util/EventEmitter";

export class TestTask extends Task {
  eventName;
  args;
  constructor(args: { eventName: string }) {
    super();
    this.args = args;
    this.eventName = args.eventName;
    this.isComplete = false;
    EventEmitter.once(args.eventName, () => {
      this.isComplete = true;
      this.isDirty();
    });
  }

  getIsComplete() {
    return this.isComplete;
  }
}