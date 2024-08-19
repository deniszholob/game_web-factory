import { FactorioIcon } from './factorio-icon.enum';
import { FactorioWikiIcon } from './factorio-wiki-icon.enum';

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

// export enum EntitySubTypeFactory {
// 'ExtractionMachine' = 'ExtractionMachine',
// 'ProductionMachine' = 'ProductionMachine',
// 'SmeltingMachine' = 'SmeltingMachine',
// }

export const ENTITY_TYPE_OPTIONS: EntityType[] = Object.values(EntityType);

export interface EntityTypeInfo {
  id: EntityType;
  display: string;
  icon: FactorioWikiIcon | FactorioIcon;
}

export const ENTITY_TYPE_INFO: Record<EntityType, EntityTypeInfo> = {
  [EntityType.RawResource]: {
    id: EntityType.RawResource,
    display: 'Raw Resource',
    icon: FactorioIcon.TypeDeposit,
  },
  [EntityType.RawMaterial]: {
    id: EntityType.RawMaterial,
    display: 'Raw Material',
    icon: FactorioIcon.TypeRaw,
  },
  [EntityType.IntermediateProduct]: {
    id: EntityType.IntermediateProduct,
    display: 'Intermediate Product',
    icon: FactorioIcon.TypeIntermediate,
  },
  [EntityType.ExtractionMachine]: {
    id: EntityType.ExtractionMachine,
    display: 'Extraction Factory',
    icon: FactorioIcon.TypeExtraction,
  },
  [EntityType.SmeltingMachine]: {
    id: EntityType.SmeltingMachine,
    display: 'Smelting Factory',
    icon: FactorioIcon.TypeSmelting,
  },
  [EntityType.ProductionMachine]: {
    id: EntityType.ProductionMachine,
    display: 'Production Factory',
    icon: FactorioIcon.TypeProduction,
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
