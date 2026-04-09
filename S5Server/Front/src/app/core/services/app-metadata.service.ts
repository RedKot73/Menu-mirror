import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { GraphqlDataService, GqlAppMetadata } from '../../../ServerService/graphql-data.service';

@Injectable({
  providedIn: 'root'
})
export class AppMetadataService {
  private graphqlDataService = inject(GraphqlDataService);
  public metadata$: Observable<GqlAppMetadata>;

  constructor() {
    this.metadata$ = this.graphqlDataService.getAppMetadata().pipe(
      shareReplay(1)
    );
  }
}
