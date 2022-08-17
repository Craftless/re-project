import { Task } from "./Task";
import EventEmitter from "../util/EventEmitter";

export class ObtainNumberTask extends Task {
  eventName;
  isComplete;
  args;
  constructor(args: { eventName: string; numberToObtain: number }) {
    super();
    this.args = args;
    this.eventName = args.eventName;
    this.isComplete = false;
    const unsub = EventEmitter.addListener(args.eventName, (value: number) => {
      console.log("VALUE: ", args.numberToObtain);
      if (value >= args.numberToObtain) {
        this.isComplete = true;
        this.isDirty();
        // unsub.remove();
      }
    });
  }

  getIsComplete() {
    return this.isComplete;
  }
}
