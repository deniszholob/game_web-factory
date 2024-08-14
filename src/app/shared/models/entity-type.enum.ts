export enum EntityType {
  'RawResource' = 'RawResource',
  'RawMaterial' = 'RawMaterial',
  'IntermediateProduct' = 'IntermediateProduct',
  'ExtractionMachine' = 'ExtractionMachine',
  'SmeltingMachine' = 'SmeltingMachine',
  'ProductionMachine' = 'ProductionMachine',

  // 'Factory' = 'Factory',
  // 'Fluid' = 'Fluid',
}

export const ENTITY_TYPE_OPTIONS: EntityType[] = Object.values(EntityType);

export interface EntityTypeInfo {
  id: EntityType;
  display: string;
}

export const ENTITY_TYPE_INFO: Record<EntityType, EntityTypeInfo> = {
  [EntityType.RawResource]: {
    id: EntityType.RawResource,
    display: 'Raw Resource',
  },
  [EntityType.RawMaterial]: {
    id: EntityType.RawMaterial,
    display: 'Raw Material',
  },
  [EntityType.IntermediateProduct]: {
    id: EntityType.IntermediateProduct,
    display: 'Intermediate Product',
  },
  [EntityType.ExtractionMachine]: {
    id: EntityType.ExtractionMachine,
    display: 'Extraction Machine',
  },
  [EntityType.SmeltingMachine]: {
    id: EntityType.SmeltingMachine,
    display: 'Smelting Machine',
  },
  [EntityType.ProductionMachine]: {
    id: EntityType.ProductionMachine,
    display: 'Production Machine',
  },
  // [EntityType.Factory]: {
  //   id: EntityType.Factory,
  //   display: 'Factory',
  // },
  // [EntityType.Fluid]: {
  //   id: EntityType.Fluid,
  //   display: 'Fluid',
  // },
} as const;

export const ENTITY_TYPE_INFO_OPTIONS: EntityTypeInfo[] =
  ENTITY_TYPE_OPTIONS.map(
    (o: EntityType): EntityTypeInfo => ENTITY_TYPE_INFO[o],
  );
