import { EventEmitter } from "@angular/core";
import { Window } from "../components/models/Window.model";

export default class Emitters {
    static windowUpdateEmitter = new EventEmitter<Window>();
    static windowPositionUpdateEmitter = new EventEmitter<{id: string, x: number, y: number}>();
}