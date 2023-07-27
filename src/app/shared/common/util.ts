import { Injectable } from "@angular/core";

@Injectable()
export class Util {

    removeAccents(text: string): string {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
}