
import { Component, inject, OnInit } from "@angular/core";
import { SimpleDictService, SimpleDictDto } from "./simpleDict.service";
export type DictArea = SimpleDictDto;

@Component({
    selector: "page-dict-area",
    template: `
        <h2>Напрямок ЛБЗ</h2>
        <button (click)="reload()">Обновить</button>
        <ul>
            @for(area of items(); track area.id) {
                <li>
                    {{ area.value }} @if(area.comment) {<span>({{ area.comment }})</span>}
                </li>
            }
        </ul>
    `,
})
export class dictAreaPage {
    readonly api = '/api/dict-areas';
    dictService = inject(SimpleDictService);
    items = this.dictService.createItemsSignal(this.api);

    reload() {
        this.dictService.getAll(this.api).subscribe(items => this.items.set(items));
    }
}
