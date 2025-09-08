import { Component, Injectable, inject, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { signal } from "@angular/core";
import { SimpleDictDto } from "./service";

/*
export interface DictArea {
    id: string;
    value: string;
    comment?: string;
}
*/
export type DictArea = SimpleDictDto; // Используем DTO из service.ts

@Injectable({ providedIn: "root" })
export class DictAreasService {
    private http = inject(HttpClient);
    private readonly apiUrl = "/api/dict-areas";

    // Пример сигнала для хранения данных
    readonly areas = signal<DictArea[]>([]);

    getAll() {
        this.http.get<DictArea[]>(this.apiUrl).subscribe(this.areas.set);
    }

    get(id: string) {
        return this.http.get<DictArea>(`${this.apiUrl}/${id}`);
    }

    create(area: Omit<DictArea, "id">) {
        return this.http.post<DictArea>(this.apiUrl, area);
    }

    update(id: string, area: Omit<DictArea, "id">) {
        return this.http.put(`${this.apiUrl}/${id}`, area);
    }

    delete(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    lookup(term: string, limit = 10) {
        return this.http.get<{ id: string; name: string }[]>(
            `${this.apiUrl}/lookup`,
            { params: { term, limit } }
        );
    }
}

@Component({
    selector: "page-dict-area",
    template: `<h2>Напрямок ЛБЗ</h2>
    <button (click)="reload()">Обновить</button>
    <ul>
        @for(area of dictAreas.areas(); track area.id)
        {
            <li>
            {{ area.value }} @if(area.comment) {<span>({{ area.comment }})</span>}
            </li>
        }
    </ul>
`,
})
export class dictAreaPage implements OnInit {
    dictAreas = inject(DictAreasService);
    ngOnInit() {
        this.dictAreas.getAll();
    }

    reload() {
        this.dictAreas.getAll();
    }
}
