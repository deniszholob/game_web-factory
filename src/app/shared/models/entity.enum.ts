import { ENTITY_TYPE_OPTIONS, EntityType } from './entity-type.enum';
import { FactorioIcon } from './factorio-icon.enum';
import { FactorioWikiIcon } from './factorio-wiki-icon.enum';

export enum Entity {
  'DepositStone' = 'DepositStone',
  'DepositIron' = 'DepositIron',
  'DepositCopper' = 'DepositCopper',
  'DepositCoal' = 'DepositCoal',
  'DepositUranium' = 'DepositUranium',
  'DepositWater' = 'DepositWater',
  'DepositOil' = 'DepositOil',
  'DepositWood' = 'DepositWood',
  // =========================================
  'RawStone' = 'RawStone',
  'RawIron' = 'RawIron',
  'RawCopper' = 'RawCopper',
  'RawCoal' = 'RawCoal',
  // 'RawWater' = 'RawWater',
  // 'RawWood' = 'RawWood',
  // 'RawUranium' = 'RawUranium',
  // =========================================
  'StoneBrick' = 'StoneBrick',
  'IronPlate' = 'IronPlate',
  'CopperPlate' = 'CopperPlate',
  'SteelPlate' = 'SteelPlate',
  // =========================================
  'IronGear' = 'IronGear',
  'CopperWire' = 'CopperWire',
  'ElectronicCircuit' = 'ElectronicCircuit',
  // =========================================
  'FurnaceStone' = 'FurnaceStone',
  'FurnaceSteel' = 'FurnaceSteel',
  // 'FurnaceElectric' = 'FurnaceElectric',
  'DrillBurner' = 'DrillBurner',
  'DrillElectric' = 'DrillElectric',
  'Assembler1' = 'Assembler1',
  'Assembler2' = 'Assembler2',
  // =========================================
  'Radar' = 'Radar',
  'Electricity' = 'Electricity',
  'SolarPanel' = 'SolarPanel',
  'SteamEngine' = 'SteamEngine',
}

export interface CraftingInfo {
  /** Multiplier for craft time */
  craftSpeed: number;
  /** Determines to take fuel vs electricity */
  energySources: Entity[];
  /** W (J/s) */
  energyConsumption: number;
  /** W (J/s) */
  // drainConsumption?: number;
  // space: number;
  // modules: number;
}

export const MANUAL_CRAFTING_INFO: CraftingInfo = {
  craftSpeed: 1,
  energySources: [Entity.RawCoal],
  energyConsumption: 0,
};

export interface EntityInfo {
  id: Entity;
  display: string;
  type: EntityType;
  icon: FactorioWikiIcon | FactorioIcon;
  factoryData?: CraftingInfo;
  energy?: number; // Joules for coal, fuel, etc.
  // technologyRequired?: Technology;
}

export const ENTITY_INFO: Record<Entity, EntityInfo> = {
  [Entity.DepositCoal]: {
    id: Entity.DepositCoal,
    display: 'Coal Deposit',
    type: EntityType.RawResource,
    icon: FactorioIcon.DepositCoal,
  },
  [Entity.DepositCopper]: {
    id: Entity.DepositCopper,
    display: 'Copper Deposit',
    type: EntityType.RawResource,
    icon: FactorioIcon.DepositCopper,
  },
  [Entity.DepositIron]: {
    id: Entity.DepositIron,
    display: 'Iron Deposit',
    type: EntityType.RawResource,
    icon: FactorioIcon.DepositIron,
  },
  [Entity.DepositStone]: {
    id: Entity.DepositStone,
    display: 'Stone Deposit',
    type: EntityType.RawResource,
    icon: FactorioIcon.DepositStone,
  },
  [Entity.DepositUranium]: {
    id: Entity.DepositUranium,
    display: 'Uranium Deposit',
    type: EntityType.RawResource,
    icon: FactorioIcon.DepositUranium,
  },
  [Entity.DepositWater]: {
    id: Entity.DepositWater,
    display: 'Water Deposit',
    type: EntityType.RawResource,
    icon: FactorioIcon.DepositWater,
  },
  [Entity.DepositOil]: {
    id: Entity.DepositOil,
    display: 'Oil Deposit',
    type: EntityType.RawResource,
    icon: FactorioIcon.DepositOil,
  },
  [Entity.DepositWood]: {
    id: Entity.DepositWood,
    display: 'Wood Deposit',
    type: EntityType.RawResource,
    icon: FactorioIcon.DepositWood,
  },
  // =========================================
  [Entity.RawCoal]: {
    id: Entity.RawCoal,
    display: 'Raw Coal',
    type: EntityType.RawMaterial,
    icon: FactorioIcon.RawCoal,
    energy: 4000000,
  },
  [Entity.RawCopper]: {
    id: Entity.RawCopper,
    display: 'Raw Copper',
    type: EntityType.RawMaterial,
    icon: FactorioIcon.RawCopper,
  },
  [Entity.RawIron]: {
    id: Entity.RawIron,
    display: 'Raw Iron',
    type: EntityType.RawMaterial,
    icon: FactorioIcon.RawIron,
  },
  [Entity.RawStone]: {
    id: Entity.RawStone,
    display: 'Raw Stone',
    type: EntityType.RawMaterial,
    icon: FactorioIcon.RawStone,
  },
  // =========================================
  [Entity.IronPlate]: {
    id: Entity.IronPlate,
    display: 'Iron Plate',
    type: EntityType.IntermediateProduct,
    icon: FactorioWikiIcon.Ironplate,
  },
  [Entity.CopperPlate]: {
    id: Entity.CopperPlate,
    display: 'Copper Plate',
    type: EntityType.IntermediateProduct,
    icon: FactorioWikiIcon.Copperplate,
  },
  [Entity.StoneBrick]: {
    id: Entity.StoneBrick,
    display: 'Stone Brick',
    type: EntityType.IntermediateProduct,
    icon: FactorioWikiIcon.Stonebrick,
  },
  // =========================================
  [Entity.IronGear]: {
    id: Entity.IronGear,
    display: 'Iron Gear',
    type: EntityType.IntermediateProduct,
    icon: FactorioWikiIcon.Irongearwheel,
  },
  [Entity.SteelPlate]: {
    id: Entity.SteelPlate,
    display: 'Steel Plate',
    type: EntityType.IntermediateProduct,
    icon: FactorioWikiIcon.Steelplate,
  },
  [Entity.CopperWire]: {
    id: Entity.CopperWire,
    display: 'Copper Wire',
    type: EntityType.IntermediateProduct,
    icon: FactorioWikiIcon.Coppercable,
  },
  [Entity.ElectronicCircuit]: {
    id: Entity.ElectronicCircuit,
    display: 'Electronic Circuit',
    type: EntityType.IntermediateProduct,
    icon: FactorioWikiIcon.Electroniccircuit,
  },
  // ================== FACTORIES =======================
  [Entity.FurnaceStone]: {
    id: Entity.FurnaceStone,
    display: 'Stone Furnace',
    type: EntityType.SmeltingMachine,
    icon: FactorioWikiIcon.Stonefurnace,
    factoryData: {
      craftSpeed: 1,
      energySources: [Entity.RawCoal],
      energyConsumption: 90000,
    },
  },
  [Entity.FurnaceSteel]: {
    id: Entity.FurnaceSteel,
    display: 'Steel Furnace',
    type: EntityType.SmeltingMachine,
    icon: FactorioWikiIcon.Steelfurnace,
    factoryData: {
      craftSpeed: 2,
      energySources: [Entity.RawCoal],
      energyConsumption: 90000,
    },
  },
  [Entity.DrillBurner]: {
    id: Entity.DrillBurner,
    display: 'Burner Drill',
    type: EntityType.ExtractionMachine,
    icon: FactorioWikiIcon.Burnerminingdrill,
    factoryData: {
      craftSpeed: 0.25,
      energySources: [Entity.RawCoal],
      energyConsumption: 150000,
    },
  },
  [Entity.DrillElectric]: {
    id: Entity.DrillElectric,
    display: 'Electric Drill',
    type: EntityType.ExtractionMachine,
    icon: FactorioWikiIcon.Electricminingdrill,
    factoryData: {
      craftSpeed: 0.5,
      energySources: [Entity.Electricity],
      energyConsumption: 90000,
    },
  },
  [Entity.Assembler1]: {
    id: Entity.Assembler1,
    display: 'Assembler T1',
    type: EntityType.ProductionMachine,
    icon: FactorioWikiIcon.Assemblingmachine1,
    factoryData: {
      craftSpeed: 0.5,
      energySources: [Entity.Electricity],
      energyConsumption: 75000,
      // drainConsumption: 2.5,
    },
  },
  [Entity.Assembler2]: {
    id: Entity.Assembler2,
    display: 'Assembler T2',
    type: EntityType.ProductionMachine,
    icon: FactorioWikiIcon.Assemblingmachine2,
    factoryData: {
      craftSpeed: 0.75,
      energySources: [Entity.Electricity],
      energyConsumption: 150000,
      // drainConsumption: 5,
    },
  },
  // =========================================
  [Entity.Radar]: {
    id: Entity.Radar,
    display: 'Radar',
    type: EntityType.ProductionMachine,
    icon: FactorioWikiIcon.Radar,
    factoryData: {
      craftSpeed: 1,
      energyConsumption: 300000,
      energySources: [],
    },
  },
  [Entity.Electricity]: {
    id: Entity.Electricity,
    display: 'Electricity',
    type: EntityType.RawMaterial,
    icon: FactorioIcon.Electricity,
    energy: 1,
  },
  [Entity.SolarPanel]: {
    id: Entity.SolarPanel,
    display: 'Solar Panel',
    type: EntityType.ProductionMachine,
    icon: FactorioWikiIcon.Solarpanel,
    factoryData: {
      craftSpeed: 1,
      energyConsumption: 0,
      energySources: [],
    },
  },
  // [Entity.Steam]
  // [Entity.Boiler]: {
  //   id: Entity.Boiler,
  //   display: 'Boiler',
  //   type: EntityType.ProductionMachine,
  //   icon: FactorioWikiIcon.Boiler,
  //   factoryData: {
  //     craftSpeed: 1,
  //     energyConsumption: 0,
  //     energySources: [],
  //   },
  // },
  [Entity.SteamEngine]: {
    id: Entity.SteamEngine,
    display: 'Steam Engine',
    type: EntityType.ProductionMachine,
    icon: FactorioWikiIcon.Steamengine,
    factoryData: {
      craftSpeed: 1,
      energyConsumption: 900000,
      energySources: [Entity.RawCoal],
    },
  },
} as const;

export const ENTITY_OPTIONS: Entity[] = Object.values(Entity).sort(
  sortEntitiesByEntityType,
);

function sortEntitiesByEntityType(a: Entity, b: Entity): number {
  const typeA = ENTITY_INFO[a].type;
  const typeB = ENTITY_INFO[b].type;

  return (
    ENTITY_TYPE_OPTIONS.indexOf(typeA) - ENTITY_TYPE_OPTIONS.indexOf(typeB)
  );
}

export function groupEntitiesByType(
  entities: Entity[],
): Record<EntityType, Entity[]> {
  return entities.reduce<Record<EntityType, Entity[]>>(
    (
      acc: Record<EntityType, Entity[]>,
      entity: Entity,
    ): Record<EntityType, Entity[]> => {
      if (acc[ENTITY_INFO[entity].type]) {
        acc[ENTITY_INFO[entity].type].push(entity);
      } else {
        acc[ENTITY_INFO[entity].type] = [entity];
      }

      return acc;
    },
    {} as Record<EntityType, Entity[]>,
  );
}

export const ENTITY_INFO_OPTIONS: EntityInfo[] = ENTITY_OPTIONS.map(
  (o: Entity): EntityInfo => ENTITY_INFO[o],
);

export function isEntity(value: string): value is Entity {
  return ENTITY_OPTIONS.includes(value as Entity);
}
