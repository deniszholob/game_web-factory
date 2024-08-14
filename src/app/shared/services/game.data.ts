import { Entity } from 'src/app/shared';

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
  // { id: Entity.IronGear, count: 5 },
  // { id: Entity.IronPlate, count: 10 },
  // { id: Entity.FurnaceStone, count: 10 },
  // { id: Entity.DrillBurner, count: 10 },
  // { id: Entity.Assembler1, count: 10 },
  // { id: Entity.Assembler2, count: 10 },
];
