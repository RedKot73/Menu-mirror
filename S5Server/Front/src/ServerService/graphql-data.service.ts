import { Injectable, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';

// ═══════════════════════════════════════════════════════════
// GraphQL Queries
// ═══════════════════════════════════════════════════════════

/** Всі набори даних (список) */
const GET_DATA_SETS = gql`
  query GetDataSets($where: TemplateDataSetFilterInput, $order: [TemplateDataSetSortInput!]) {
    templateDataSets(where: $where, order: $order) {
      id
      name
      docNumber
      docDate
      isPublished
      publishedAtUtc
      createdAtUtc
      validFrom
    }
  }
`;

const GET_COMPLETE_DATA_SET = gql`
  query GetCompleteDataSet($dataSetId: UUID!, $templateCategoryId: UUID!) {
    templateDataSetForDoc(dataSetId: $dataSetId, templateCategoryId: $templateCategoryId) {
      id
      name
      docNumber
      docDate
      isParentDocUsed
      parentDocNumber
      parentDocDate
      isPublished
      unitTasks {
        id
        isPublished
        unitShortName
        parentShortName
        assignedShortName
        unitTypeName
        isInvolved
        persistentLocationValue
        taskValue
        area {
          value
        }
        means {
          quantity
          droneModel {
            value
          }
        }
        soldiersTask {
          firstName
          midleName
          lastName
          rankShortValue
        }
      }
    }
  }
`;

/** Набір даних з UnitTasks для рендерингу */
const GET_DATA_SET_FOR_RENDER = gql`
  query GetDataSetForRender($dataSetId: UUID!, $templateCategoryId: UUID!) {
    templateDataSet(id: $dataSetId, templateCategoryId: $templateCategoryId) {
      id
      name
      docNumber
      docDate
      isParentDocUsed
      parentDocNumber
      parentDocDate
      isPublished
      unitTasks {
        id
        isPublished
        unitShortName
        parentShortName
        assignedShortName
        unitTypeName
        isInvolved
        persistentLocationValue
        taskValue
        area {
          value
        }
        means {
          quantity
          droneModel {
            value
          }
        }
        soldiersTask {
          firstName
          midleName
          lastName
          rankShortValue
        }
      }
    }
  }
`;

/** Шаблони документів */
const GET_TEMPLATES = gql`
  query GetTemplates($where: DocumentTemplateFilterInput, $order: [DocumentTemplateSortInput!]) {
    documentTemplates(where: $where, order: $order) {
      id
      name
      description
      templateCategory {
        shortValue
      }
      isPublished
      createdAtUtc
      validFrom
    }
  }
`;

/** Шаблон за ID (з контентом) */
const GET_TEMPLATE = gql`
  query GetTemplate($id: UUID!) {
    documentTemplate(id: $id) {
      id
      name
      description
      content
      templateCategory {
        shortValue
      }
      isPublished
      publishedAtUtc
      createdAtUtc
      validFrom
    }
  }
`;

/** Підрозділи */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GET_UNITS = gql`
  query GetUnits($where: UnitFilterInput, $order: [UnitSortInput!]) {
    units(where: $where, order: $order) {
      id
      shortName
      parent {
        id
        shortName
      }
      assignedUnit {
        id
        shortName
      }
      unitType {
        shortValue
      }
      isInvolved
      persistentLocation {
        value
      }
    }
  }
`;

// ═══════════════════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════════════════

export interface GqlTemplateDataSet {
  id: string;
  name: string;
  docNumber: string;
  docDate: string;
  isParentDocUsed: boolean;
  parentDocNumber: string | null;
  parentDocDate: string | null;
  isPublished: boolean;
  publishedAtUtc: string | null;
  createdAtUtc: string;
  validFrom: string;
  unitTasks?: GqlUnitTask[];
}

export interface GqlUnitTask {
  id: string;
  unitShortName: string;
  parentShortName: string;
  assignedShortName: string | null;
  unitTypeName: string | null;
  isInvolved: boolean;
  persistentLocationValue: string | null;
  taskValue: string;
  area: { value: string } | null;
  isPublished: boolean;
}

export interface GqlDocumentTemplate {
  id: string;
  name: string;
  description: string | null;
  content?: string;
  templateCategory: { shortValue: string } | null;
  isPublished: boolean;
  publishedAtUtc?: string | null;
  createdAtUtc: string;
  validFrom: string;
}

// ═══════════════════════════════════════════════════════════
// Service
// ═══════════════════════════════════════════════════════════

@Injectable({ providedIn: 'root' })
export class GraphqlDataService {
  private apollo = inject(Apollo);

  /**
   * Отримати список наборів даних
   */
  getDataSets(isPublished?: boolean): Observable<GqlTemplateDataSet[]> {
    const where = isPublished !== undefined ? { isPublished: { eq: isPublished } } : undefined;
    return this.apollo
      .query<{ templateDataSets: GqlTemplateDataSet[] }>({
        query: GET_DATA_SETS,
        variables: {
          where,
          order: [{ validFrom: 'DESC' }],
        },
      })
      .pipe(map((result) => result.data!.templateDataSets));
  }

  /**
   * Отримати набір даних для рендерингу шаблону (з UnitTasks)
   * з фільтрацією відряджених бійців (assignedUnit, involvedUnit)
   */
getCompleteDataSet(dataSetId: string, templateCategoryId: string): Observable<GqlTemplateDataSet | null> {
  return this.apollo
    .query<{ templateDataSetForDoc: GqlTemplateDataSet | null }>({
      query: GET_COMPLETE_DATA_SET,
      variables: { dataSetId: dataSetId, templateCategoryId: templateCategoryId },
    })
    .pipe(
      map((result) => 
        result.data?.templateDataSetForDoc || null
    )
    );
}

  /**
   * Отримати набір даних для рендерингу шаблону (з UnitTasks)
   */
  getDataSetForRender(id: string): Observable<GqlTemplateDataSet | null> {
    return this.apollo
      .query<{ templateDataSet: GqlTemplateDataSet | null }>({
        query: GET_DATA_SET_FOR_RENDER,
        variables: { id },
      })
      .pipe(
        map((result) => {
          const data = result.data!.templateDataSet;
          if (Array.isArray(data)) {
            return data[0] ?? null;
          }
          return data;
        }),
      );
  }

  /**
   * Отримати список шаблонів документів
   */
  getTemplates(isPublished?: boolean): Observable<GqlDocumentTemplate[]> {
    const where = isPublished !== undefined ? { isPublished: { eq: isPublished } } : undefined;
    return this.apollo
      .query<{ documentTemplates: GqlDocumentTemplate[] }>({
        query: GET_TEMPLATES,
        variables: {
          where,
          order: [{ name: 'ASC' }],
        },
      })
      .pipe(map((result) => result.data!.documentTemplates));
  }

  /**
   * Отримати шаблон за ID (з контентом)
   */
  getTemplate(id: string): Observable<GqlDocumentTemplate | null> {
    return this.apollo
      .query<{ documentTemplate: GqlDocumentTemplate | null }>({
        query: GET_TEMPLATE,
        variables: { id },
      })
      .pipe(map((result) => result.data!.documentTemplate));
  }
}
