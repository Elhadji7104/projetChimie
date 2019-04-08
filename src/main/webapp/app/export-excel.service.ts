import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ExportExcelService {
    array: any;

    constructor() {}

    get() {
        return this.array;
    }

    set(array: any) {
        this.array = array;
    }
}
