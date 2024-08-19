import { Entity, ENTITY_INFO } from './entity.enum';

export enum Recipe {
  'ResourceScan' = 'ResourceScan',
  // =========================================
  'ExtractedCoal' = 'ExtractedCoal',
  'ExtractedCopper' = 'ExtractedCopper',
  'ExtractedIron' = 'ExtractedIron',
  'ExtractedStone' = 'ExtractedStone',
  // =========================================
  'IronPlate' = 'IronPlate',
  'RecycledIronPlate' = 'RecycledIronPlate',
  'CopperPlate' = 'CopperPlate',
  'StoneBrick' = 'StoneBrick',
  'SteelPlate' = 'SteelPlate',
  // =========================================
  'IronGear' = 'IronGear',
  'CopperWire' = 'CopperWire',
  'ElectronicCircuit' = 'ElectronicCircuit',
  // =========================================
  'FurnaceStone' = 'FurnaceStone',
  'FurnaceSteel' = 'FurnaceSteel',
  'DrillBurner' = 'DrillBurner',
  'DrillElectric' = 'DrillElectric',
  'Assembler1' = 'Assembler1',
  'Assembler2' = 'Assembler2',
  // =========================================
  'Radar' = 'Radar',
  'SteamPower' = 'SteamPower',
  'SolarPower' = 'SolarPower', //TODO: Temporary, electicity is should not be an entity
  'SolarPanel' = 'SolarPanel',
  'SteamEngine' = 'SteamEngine',
}

export const RECIPE_OPTIONS: Recipe[] = Object.values(Recipe);

export interface EntityCount {
  id: Entity;
  count: number;
}

export interface RecipeInfo {
  id: Recipe;
  display: string;
  consumes: EntityCount[];
  produces: EntityCount[];
  /** seconds */
  time: number;
  // technologyRequired?:Technology;
  /** Order from highest to lowest tier */
  producedIn: Set<Entity>;
  machineRequired?: boolean;
}

export function isComplexRecipe(recipe: Recipe): boolean {
  return RECIPE_INFO[recipe].produces.length > 1;
}

export const RECIPE_INFO: Record<Recipe, RecipeInfo> = {
  [Recipe.ResourceScan]: {
    id: Recipe.ResourceScan,
    display: 'Resource Scan',
    consumes: [{ id: Entity.Electricity, count: 300 }],
    produces: [
      { id: Entity.DepositCoal, count: 1 },
      { id: Entity.DepositCopper, count: 1 },
      { id: Entity.DepositIron, count: 1 },
      { id: Entity.DepositStone, count: 1 },
    ],
    time: 30,
    producedIn: new Set([Entity.Radar].sort(machineTierSort)), // TODO: Exploration?
    machineRequired: true,
  },
  // =========================================
  [Recipe.ExtractedCoal]: {
    id: Recipe.ExtractedCoal,
    display: 'Extracted Coal',
    consumes: [{ id: Entity.DepositCoal, count: 1 }],
    produces: [{ id: Entity.RawCoal, count: 1 }],
    time: 1,
    producedIn: new Set(
      [Entity.DrillBurner, Entity.DrillElectric].sort(machineTierSort),
    ),
  },
  [Recipe.ExtractedCopper]: {
    id: Recipe.ExtractedCopper,
    display: 'Extracted Copper',
    consumes: [{ id: Entity.DepositCopper, count: 1 }],
    produces: [{ id: Entity.RawCopper, count: 1 }],
    time: 1,
    producedIn: new Set(
      [Entity.DrillBurner, Entity.DrillElectric].sort(machineTierSort),
    ),
  },
  [Recipe.ExtractedIron]: {
    id: Recipe.ExtractedIron,
    display: 'Extracted Iron',
    consumes: [{ id: Entity.DepositIron, count: 1 }],
    produces: [{ id: Entity.RawIron, count: 1 }],
    time: 1,
    producedIn: new Set(
      [Entity.DrillBurner, Entity.DrillElectric].sort(machineTierSort),
    ),
  },
  [Recipe.ExtractedStone]: {
    id: Recipe.ExtractedStone,
    display: 'Extracted Stone',
    consumes: [{ id: Entity.DepositStone, count: 1 }],
    produces: [{ id: Entity.RawStone, count: 1 }],
    time: 1,
    producedIn: new Set(
      [Entity.DrillBurner, Entity.DrillElectric].sort(machineTierSort),
    ),
  },
  // =========================================
  [Recipe.CopperPlate]: {
    id: Recipe.CopperPlate,
    display: 'Copper Plate',
    consumes: [{ id: Entity.RawCopper, count: 1 }],
    produces: [{ id: Entity.CopperPlate, count: 1 }],
    time: 3.2,
    producedIn: new Set(
      [Entity.FurnaceStone, Entity.FurnaceSteel].sort(machineTierSort),
    ),
    machineRequired: true,
  },
  [Recipe.IronPlate]: {
    id: Recipe.IronPlate,
    display: 'Iron Plate',
    consumes: [{ id: Entity.RawIron, count: 1 }],
    produces: [{ id: Entity.IronPlate, count: 1 }],
    time: 3.2,
    producedIn: new Set(
      [Entity.FurnaceStone, Entity.FurnaceSteel].sort(machineTierSort),
    ),
    machineRequired: true,
  },
  [Recipe.RecycledIronPlate]: {
    id: Recipe.RecycledIronPlate,
    display: 'Recycled Iron Plate',
    consumes: [{ id: Entity.IronGear, count: 1 }],
    produces: [{ id: Entity.IronPlate, count: 1 }],
    time: 3.2,
    producedIn: new Set(
      [Entity.Assembler1, Entity.Assembler2].sort(machineTierSort),
    ),
    machineRequired: true,
  },
  [Recipe.StoneBrick]: {
    id: Recipe.StoneBrick,
    display: 'Stone Brick',
    consumes: [{ id: Entity.RawStone, count: 2 }],
    produces: [{ id: Entity.StoneBrick, count: 1 }],
    time: 3.2,
    producedIn: new Set(
      [Entity.FurnaceStone, Entity.FurnaceSteel].sort(machineTierSort),
    ),
    machineRequired: true,
  },
  [Recipe.SteelPlate]: {
    id: Recipe.SteelPlate,
    display: 'Steel Plate',
    consumes: [{ id: Entity.IronPlate, count: 5 }],
    produces: [{ id: Entity.SteelPlate, count: 1 }],
    time: 16,
    producedIn: new Set(
      [Entity.FurnaceStone, Entity.FurnaceSteel].sort(machineTierSort),
    ),
    machineRequired: true,
  },
  // =========================================
  [Recipe.IronGear]: {
    id: Recipe.IronGear,
    display: 'Iron Gear',
    consumes: [{ id: Entity.IronPlate, count: 2 }],
    produces: [{ id: Entity.IronGear, count: 1 }],
    time: 0.5,
    producedIn: new Set(
      [Entity.Assembler1, Entity.Assembler2].sort(machineTierSort),
    ),
  },
  [Recipe.CopperWire]: {
    id: Recipe.CopperWire,
    display: 'Copper Wire',
    consumes: [{ id: Entity.CopperPlate, count: 1 }],
    produces: [{ id: Entity.CopperWire, count: 2 }],
    time: 0.5,
    producedIn: new Set(
      [Entity.Assembler1, Entity.Assembler2].sort(machineTierSort),
    ),
  },
  [Recipe.ElectronicCircuit]: {
    id: Recipe.ElectronicCircuit,
    display: 'Electronic Circuit',
    consumes: [
      { id: Entity.CopperWire, count: 3 },
      { id: Entity.IronPlate, count: 1 },
    ],
    produces: [{ id: Entity.ElectronicCircuit, count: 1 }],
    time: 0.5,
    producedIn: new Set(
      [Entity.Assembler1, Entity.Assembler2].sort(machineTierSort),
    ),
  },
  // =========================================
  [Recipe.FurnaceStone]: {
    id: Recipe.FurnaceStone,
    display: 'Stone Furnace',
    consumes: [{ id: Entity.RawStone, count: 5 }],
    produces: [{ id: Entity.FurnaceStone, count: 1 }],
    time: 0.5,
    producedIn: new Set(
      [Entity.Assembler1, Entity.Assembler2].sort(machineTierSort),
    ),
  },
  [Recipe.FurnaceSteel]: {
    id: Recipe.FurnaceSteel,
    display: 'Steel Furnace',
    consumes: [
      { id: Entity.SteelPlate, count: 6 },
      { id: Entity.StoneBrick, count: 10 },
    ],
    produces: [{ id: Entity.FurnaceSteel, count: 1 }],
    time: 3,
    producedIn: new Set(
      [Entity.Assembler1, Entity.Assembler2].sort(machineTierSort),
    ),
  },
  [Recipe.DrillBurner]: {
    id: Recipe.DrillBurner,
    display: 'Burner Drill',
    consumes: [
      { id: Entity.IronGear, count: 3 },
      { id: Entity.IronPlate, count: 3 },
      { id: Entity.FurnaceStone, count: 1 },
    ],
    produces: [{ id: Entity.DrillBurner, count: 1 }],
    time: 2,
    producedIn: new Set(
      [Entity.Assembler1, Entity.Assembler2].sort(machineTierSort),
    ),
  },
  [Recipe.DrillElectric]: {
    id: Recipe.DrillElectric,
    display: 'Electric Drill',
    consumes: [
      { id: Entity.ElectronicCircuit, count: 3 },
      { id: Entity.IronGear, count: 5 },
      { id: Entity.IronPlate, count: 10 },
    ],
    produces: [{ id: Entity.DrillElectric, count: 1 }],
    time: 2,
    producedIn: new Set(
      [Entity.Assembler1, Entity.Assembler2].sort(machineTierSort),
    ),
  },
  [Recipe.Assembler1]: {
    id: Recipe.Assembler1,
    display: 'Assembling Machine 1',
    consumes: [
      { id: Entity.ElectronicCircuit, count: 3 },
      { id: Entity.IronGear, count: 5 },
      { id: Entity.IronPlate, count: 9 },
    ],
    produces: [{ id: Entity.Assembler1, count: 1 }],
    time: 0.5,
    producedIn: new Set(
      [Entity.Assembler1, Entity.Assembler2].sort(machineTierSort),
    ),
  },
  [Recipe.Assembler2]: {
    id: Recipe.Assembler2,
    display: 'Assembling Machine 2',
    consumes: [
      { id: Entity.Assembler1, count: 1 },
      { id: Entity.ElectronicCircuit, count: 3 },
      { id: Entity.IronGear, count: 5 },
      { id: Entity.SteelPlate, count: 2 },
    ],
    produces: [{ id: Entity.Assembler2, count: 1 }],
    time: 0.5,
    producedIn: new Set(
      [Entity.Assembler1, Entity.Assembler2].sort(machineTierSort),
    ),
  },
  // =========================================
  [Recipe.Radar]: {
    id: Recipe.Radar,
    display: 'Radar',
    consumes: [
      { id: Entity.ElectronicCircuit, count: 5 },
      { id: Entity.IronGear, count: 5 },
      { id: Entity.IronPlate, count: 10 },
    ],
    produces: [{ id: Entity.Radar, count: 1 }],
    time: 33,
    producedIn: new Set(
      [Entity.Assembler1, Entity.Assembler2].sort(machineTierSort),
    ),
  },
  [Recipe.SteamEngine]: {
    id: Recipe.SteamEngine,
    display: 'Steam Engine',
    consumes: [
      { id: Entity.IronPlate, count: 10 },
      { id: Entity.IronGear, count: 8 },
      // { id: Entity.Pipe, count: 5 },
    ],
    produces: [{ id: Entity.SteamEngine, count: 1 }],
    time: 0.5,
    producedIn: new Set(
      [Entity.Assembler1, Entity.Assembler2].sort(machineTierSort),
    ),
  },
  [Recipe.SteamPower]: {
    id: Recipe.SteamPower,
    display: 'Steam Power',
    consumes: [
      // {id: Entity.RawCoal, count: 60000}
    ],
    produces: [{ id: Entity.Electricity, count: 900000 }],
    time: 60,
    producedIn: new Set([Entity.SteamEngine].sort(machineTierSort)),
    machineRequired: true,
  },
  [Recipe.SolarPower]: {
    id: Recipe.SolarPower,
    display: 'Solar Power',
    consumes: [],
    produces: [{ id: Entity.Electricity, count: 60000 }],
    time: 60,
    producedIn: new Set([Entity.SolarPanel].sort(machineTierSort)),
    machineRequired: true,
  },
  [Recipe.SolarPanel]: {
    id: Recipe.SolarPanel,
    display: 'Solar Panel',
    consumes: [
      { id: Entity.CopperPlate, count: 5 },
      { id: Entity.ElectronicCircuit, count: 15 },
      { id: Entity.SteelPlate, count: 5 },
    ],
    produces: [{ id: Entity.SolarPanel, count: 1 }],
    time: 10,
    producedIn: new Set(
      [Entity.Assembler1, Entity.Assembler2].sort(machineTierSort),
    ),
  },
} as const;

export const RECIPE_INFO_OPTIONS: RecipeInfo[] = RECIPE_OPTIONS.map(
  (o: Recipe): RecipeInfo => RECIPE_INFO[o],
);

function machineTierSort(a: Entity, b: Entity): number {
  return (
    (ENTITY_INFO[b].factoryData?.craftSpeed ?? 0) -
    (ENTITY_INFO[a].factoryData?.craftSpeed ?? 0)
  );
}
