import {
  Apollo,
  gql
} from "./chunk-RWBUJLBH.js";
import {
  Injectable,
  inject,
  map,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-IBDYQGEV.js";

// src/ServerService/graphql-data.service.ts
var GET_DATA_SETS = gql`
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
var GET_SERVER_TIME = gql`
  query GetServerTime {
    serverTime
  }
`;
var GET_COMPLETE_DATA_SET = gql`
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
        task{
            unitTaskItems{
                value
            }
        }
        areaCityFullName{
          value
        }
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
var GET_DATA_SET_FOR_RENDER = gql`
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
var GET_TEMPLATES = gql`
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
var GET_TEMPLATE = gql`
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
var GET_UNITS = gql`
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
var GraphqlDataService = class _GraphqlDataService {
  apollo = inject(Apollo);
  /**
   * Отримати поточний час сервера (UTC)
   */
  getServerTime() {
    return this.apollo.query({
      query: GET_SERVER_TIME,
      fetchPolicy: "network-only"
    }).pipe(map((result) => result.data.serverTime));
  }
  /**
   * Отримати список наборів даних
   */
  getDataSets(isPublished) {
    const where = isPublished !== void 0 ? { isPublished: { eq: isPublished } } : void 0;
    return this.apollo.query({
      query: GET_DATA_SETS,
      variables: {
        where,
        order: [{ validFrom: "DESC" }]
      }
    }).pipe(map((result) => result.data.templateDataSets));
  }
  /**
   * Отримати набір даних для рендерингу шаблону (з UnitTasks)
   * з фільтрацією відряджених бійців (assignedUnit, involvedUnit)
   * @param dataSetId Ідентифікатор набору даних
   * @param templateCategoryId Ідентифікатор категорії шаблону БР/БД....
   */
  getCompleteDataSet(dataSetId, templateCategoryId) {
    return this.apollo.query({
      query: GET_COMPLETE_DATA_SET,
      variables: { dataSetId, templateCategoryId }
    }).pipe(map((result) => result.data?.templateDataSetForDoc || null));
  }
  /**
   * Отримати набір даних для рендерингу шаблону (з UnitTasks)
   */
  getDataSetForRender(id) {
    return this.apollo.query({
      query: GET_DATA_SET_FOR_RENDER,
      variables: { id }
    }).pipe(map((result) => {
      const data = result.data.templateDataSet;
      if (Array.isArray(data)) {
        return data[0] ?? null;
      }
      return data;
    }));
  }
  /**
   * Отримати список шаблонів документів
   */
  getTemplates(isPublished) {
    const where = isPublished !== void 0 ? { isPublished: { eq: isPublished } } : void 0;
    return this.apollo.query({
      query: GET_TEMPLATES,
      variables: {
        where,
        order: [{ name: "ASC" }]
      }
    }).pipe(map((result) => result.data.documentTemplates));
  }
  /**
   * Отримати шаблон за ID (з контентом)
   */
  getTemplate(id) {
    return this.apollo.query({
      query: GET_TEMPLATE,
      variables: { id }
    }).pipe(map((result) => result.data.documentTemplate));
  }
  static \u0275fac = function GraphqlDataService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GraphqlDataService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _GraphqlDataService, factory: _GraphqlDataService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(GraphqlDataService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  GraphqlDataService
};
