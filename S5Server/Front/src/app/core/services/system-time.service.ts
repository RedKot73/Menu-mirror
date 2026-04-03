import { Injectable, inject } from '@angular/core';
import { Observable, timer, of } from 'rxjs';
import { map, shareReplay, switchMap, catchError, take } from 'rxjs/operators';
import { GraphqlDataService } from '../../../ServerService/graphql-data.service';

@Injectable({
  providedIn: 'root'
})
export class SystemTimeService {
  private graphqlDataService = inject(GraphqlDataService);
  public utcTime$: Observable<Date>;

  constructor() {
    this.utcTime$ = this.graphqlDataService.getServerTime().pipe(
      take(1),
      catchError(() => of(new Date().toISOString())), // fallback to local time on error
      switchMap((serverTimeStr) => {
        const serverTime = new Date(serverTimeStr);
        const serverTimeMs = serverTime.getTime();
        const startTime = Date.now();
        
        return timer(0, 1000).pipe(
          map(() => {
            const elapsed = Date.now() - startTime;
            return new Date(serverTimeMs + elapsed);
          })
        );
      }),
      shareReplay(1)
    );
  }
}
