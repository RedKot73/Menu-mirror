import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { catchError } from 'rxjs/operators';
import { SoldierDto } from '../../../ServerService/soldier.service';
import { S5App_ErrorHandler } from '../../shared/models/ErrorHandler';

export enum ImportSoldierStatus {
  Inserted = 0,
  Updated = 1,
  Deleted = 2,
}

export interface ImportedSoldierResult {
  soldier: SoldierDto;
  status: ImportSoldierStatus;
}

export enum ImportProgressStatus {
  Start = 0,
  Done = 1,
  Failed = 2,
  UnitStart = 3,
  UnitDone = 4,
  UnitNotFound = 5,
  RecordDone = 6,
}

export interface ImportUnit {
  name: string;
  status: ImportProgressStatus;
  importedSoldiers: ImportedSoldierResult[];
}

export enum ImportJobStatus {
  NotActive = 'NotActive',
  Running = 'Running',
  Succeeded = 'Succeeded',
  Failed = 'Failed',
}

export interface ImportJobResponse {
  status: ImportJobStatus;
  startedAtUtc: string;
  finishedAtUtc?: string;
  error?: string;
  result?: ImportUnit[];
}

export interface ImportProgress {
  sheet?: string;
  status: ImportProgressStatus;
  processed: number;
  total: number;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImportUnitService {
  readonly api = '/api/Unit';
  private http = inject(HttpClient);

  importSoldiers(id: string, file: File): Observable<ImportJobResponse> {
    const form = new FormData();
    form.append('soldiers', file);
    return this.http.post<ImportJobResponse>(`${this.api}/${id}/importSoldiers`, form).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося імпортувати особовий склад',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  getLastUnits(): Observable<string[]> {
    return this.http.get<string[]>(`${this.api}/get-last-units`).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати останні підрозділи',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  getUnits(units: string[]): Observable<ImportUnit[]> {
    // POST запит з масивом у body
    return this.http.post<ImportUnit[]>(`${this.api}/get-units`, units).pipe(
      catchError((error: HttpErrorResponse) => {
        const message = S5App_ErrorHandler.handleHttpError(
          error,
          'Не вдалося отримати перелік підрозділів',
        );
        return throwError(() => new Error(message));
      }),
    );
  }

  /**
   * Підписка на Server-Sent Events для моніторингу прогресу імпорту
   * @returns Observable з подіями прогресу
   */
  subscribeToImportProgress(): Observable<ImportProgress> {
    return new Observable<ImportProgress>((observer) => {
      const abortController = new AbortController();
      const token = localStorage.getItem('auth_token');

      fetchEventSource(`${this.api}/imports/stream`, {
        method: 'GET',
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : {},
        signal: abortController.signal,
        onmessage(event) {
          try {
            const progress: ImportProgress = JSON.parse(event.data);
            observer.next(progress);
          } catch (error) {
            console.error('Помилка парсингу SSE події:', error);
          }
        },
        onerror(error) {
          console.error('SSE connection error:', error);
          observer.error(error);
          throw error;
        },
        onclose() {
          observer.complete();
        }
      }).catch(err => {
        console.error('fetchEventSource error:', err);
      });

      // Cleanup при відписці
      return () => {
        abortController.abort();
      };
    });
  }
}
