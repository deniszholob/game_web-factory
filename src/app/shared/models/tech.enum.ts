import { Entity } from './entity.enum';
import { FactorioIcon } from './factorio-icon.enum';
import { FactorioWikiIcon } from './factorio-wiki-icon.enum';
import { EntityCount } from './recipe.enum';

export enum Tech {
  'StoneProspecting' = 'StoneProspecting',
  // 'IronProspecting' = 'IronProspecting',
  // 'CopperProspecting' = 'CopperProspecting',
  // 'CoalProspecting' = 'CoalProspecting',
  'MetalProspecting' = 'MetalProspecting',
  'BasicSmelting' = 'BasicSmelting',
  'SteamPower' = 'SteamPower',
  'Automation' = 'Automation', //Change  reqs, need electricity first
  'Drilling' = 'Drilling',
  'Steel' = 'Steel',
  'AdvancedSmelting' = 'AdvancedSmelting',
  'Automation2' = 'Automation2',
  'SolarPower' = 'SolarPower',
}

export const TECH_OPTIONS: Tech[] = Object.values(Tech);

export interface TechInfo {
  id: Tech;
  display: string;
  icon: FactorioIcon | FactorioWikiIcon;
  requiredEntities: EntityCount[];
  unlocksEntities: Entity[];
  requiredTech: Tech[];
  /** seconds */
  time: number;
  // autoTriggered?: boolean; // Unlocks a as soon as some event happens (e.g. user obtains 1 stone)
}

export const TECH_INFO: Record<Tech, TechInfo> = {
  [Tech.StoneProspecting]: {
    id: Tech.StoneProspecting,
    display: 'Stone Prospecting',
    // icon: FactorioWikiIcon.Toolbeltresearch,
    icon: FactorioIcon.DepositStone,
    requiredEntities: [],
    unlocksEntities: [Entity.DepositStone, Entity.RawStone],
    requiredTech: [],
    time: 1,
  },
  [Tech.MetalProspecting]: {
    id: Tech.MetalProspecting,
    display: 'Metal Prospecting',
    icon: FactorioWikiIcon.Ironore,
    // icon: FactorioIcon.DepositIron,
    requiredEntities: [{ id: Entity.RawStone, count: 1 }],
    unlocksEntities: [
      Entity.DepositIron,
      Entity.RawIron,
      Entity.DepositCopper,
      Entity.RawCopper,
    ],
    requiredTech: [Tech.StoneProspecting],
    time: 1,
  },
  // [Tech.IronProspecting]: {
  //   id: Tech.IronProspecting,
  //   display: 'Iron Prospecting',
  //   // icon: FactorioWikiIcon.Ironore,
  //   icon: FactorioIcon.DepositIron,
  //   requiredEntities: [{ id: Entity.RawStone, count: 1 }],
  //   unlocksEntities: [
  //     Entity.DepositIron,
  //     Entity.RawIron,
  //     // Entity.DepositCopper,
  //     // Entity.RawCopper,
  //   ],
  //   requiredTech: [Tech.StoneProspecting],
  //   time: 1,
  // },
  // [Tech.CopperProspecting]: {
  //   id: Tech.CopperProspecting,
  //   display: 'Copper Prospecting',
  //   icon: FactorioIcon.DepositCopper,
  //   requiredEntities: [{ id: Entity.RawStone, count: 1 }],
  //   unlocksEntities: [Entity.DepositCopper, Entity.RawCopper],
  //   requiredTech: [Tech.StoneProspecting],
  //   time: 1,
  // },
  // [Tech.CoalProspecting]: {
  //   id: Tech.CoalProspecting,
  //   display: 'Coal Prospecting',
  //   icon: FactorioIcon.DepositCoal,
  //   requiredEntities: [{ id: Entity.RawStone, count: 1 }],
  //   unlocksEntities: [Entity.DepositCoal, Entity.RawCoal],
  //   requiredTech: [Tech.StoneProspecting],
  //   time: 1,
  // },
  [Tech.BasicSmelting]: {
    id: Tech.BasicSmelting,
    display: 'Basic Smelting',
    icon: FactorioWikiIcon.Stonefurnace,
    requiredEntities: [{ id: Entity.RawIron, count: 1 }],
    unlocksEntities: [
      Entity.DepositCoal,
      Entity.RawCoal,
      Entity.FurnaceStone,
      Entity.IronPlate,
      Entity.CopperPlate,
    ],
    requiredTech: [Tech.MetalProspecting],
    time: 1,
  },
  [Tech.Drilling]: {
    id: Tech.Drilling,
    display: 'Drilling',
    icon: FactorioWikiIcon.Burnerminingdrill,
    requiredEntities: [{ id: Entity.IronPlate, count: 1 }],
    unlocksEntities: [Entity.DrillBurner, Entity.IronGear],
    requiredTech: [Tech.BasicSmelting, Tech.MetalProspecting],
    time: 5,
  },
  [Tech.SteamPower]: {
    id: Tech.SteamPower,
    display: 'Steam Power',
    icon: FactorioWikiIcon.Steamengine,
    requiredEntities: [{ id: Entity.RawCoal, count: 1 }],
    unlocksEntities: [
      Entity.SteamEngine,
      Entity.Electricity,
      Entity.DrillElectric,
      Entity.Radar,
    ],
    requiredTech: [Tech.BasicSmelting, Tech.Drilling],
    time: 5,
  },
  [Tech.SolarPower]: {
    id: Tech.SolarPower,
    display: 'Solar Power',
    icon: FactorioIcon.Electricity,
    requiredEntities: [{ id: Entity.SteelPlate, count: 1 }],
    unlocksEntities: [
      Entity.SolarPanel,
      Entity.Electricity,
      Entity.DrillElectric,
      Entity.Radar,
    ],
    requiredTech: [Tech.Steel],
    time: 5,
  },
  [Tech.Automation]: {
    id: Tech.Automation,
    display: 'Automation',
    icon: FactorioWikiIcon.Automationresearch,
    requiredEntities: [
      { id: Entity.IronPlate, count: 1 },
      { id: Entity.CopperPlate, count: 1 },
    ],
    unlocksEntities: [
      Entity.Assembler1,
      Entity.IronGear,
      Entity.CopperWire,
      Entity.ElectronicCircuit,
    ],
    requiredTech: [Tech.SteamPower],
    time: 5,
  },
  [Tech.Steel]: {
    id: Tech.Steel,
    display: 'Steel',
    icon: FactorioWikiIcon.Steelprocessingresearch,
    requiredEntities: [{ id: Entity.IronPlate, count: 1 }],
    unlocksEntities: [Entity.SteelPlate],
    requiredTech: [Tech.BasicSmelting, Tech.MetalProspecting],
    time: 5,
  },
  [Tech.AdvancedSmelting]: {
    id: Tech.AdvancedSmelting,
    display: 'Advanced Smelting',
    icon: FactorioWikiIcon.Steelfurnace,
    requiredEntities: [{ id: Entity.SteelPlate, count: 1 }],
    unlocksEntities: [Entity.FurnaceSteel, Entity.StoneBrick],
    requiredTech: [Tech.BasicSmelting, Tech.Steel],
    time: 5,
  },
  [Tech.Automation2]: {
    id: Tech.Automation2,
    display: 'Automation 2',
    icon: FactorioWikiIcon.Automation2research,
    requiredEntities: [{ id: Entity.SteelPlate, count: 1 }],
    unlocksEntities: [Entity.Assembler2],
    requiredTech: [Tech.Steel, Tech.Automation],
    time: 30,
  },
} as const;

export const TECH_INFO_OPTIONS: TechInfo[] = TECH_OPTIONS.map(
  (o: Tech): TechInfo => TECH_INFO[o],
);

export function isTech(value: string): value is Tech {
  return TECH_OPTIONS.includes(value as Tech);
}
