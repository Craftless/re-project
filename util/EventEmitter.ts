import { EventEmitter as FBEventEmitterType } from "fbemitter";

const FBEventEmitter = require("fbemitter").EventEmitter;

const EventEmitter: FBEventEmitterType = new FBEventEmitter();
export default EventEmitter;
