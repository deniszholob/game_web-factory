import { Entity, Tech } from 'src/app/shared';

export interface InitialResource {
  id: Entity;
  count: number;
}

export const INITIAL_RESOURCES: InitialResource[] = [
  { id: Entity.DepositCoal, count: 100000 },
  { id: Entity.DepositCopper, count: 100000 },
  { id: Entity.DepositIron, count: 100000 },
  { id: Entity.DepositStone, count: 100000 },
  // ==================================
  // { id: Entity.RawStone, count: 5 },
  // { id: Entity.RawIron, count: 5 },
  // { id: Entity.RawCopper, count: 5 },
  // { id: Entity.RawCoal, count: 1 },
  // { id: Entity.Electricity, count: 5 },
  // ==================================
  // { id: Entity.IronGear, count: 5 },
  // { id: Entity.IronPlate, count: 10 },
  // { id: Entity.FurnaceStone, count: 1 },
  // { id: Entity.DrillBurner, count: 1 },
  // { id: Entity.Assembler1, count: 10 },
  // { id: Entity.Assembler2, count: 10 },
  // { id: Entity.SolarPanel, count: 1 },
  // { id: Entity.DrillElectric, count: 1 },
];

export const INITIAL_TECH: Tech[] = [
  // Tech.StoneProspecting,
  // Tech.BasicSmelting,
  // ==================================
  // ...TECH_OPTIONS,
];
