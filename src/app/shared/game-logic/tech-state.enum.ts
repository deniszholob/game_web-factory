export enum TechState {
  'Researched' = 'Researched',
  'Available' = 'Available',
  'Locked' = 'Locked',
}

export const TECH_STATE_OPTIONS: TechState[] = Object.values(TechState);

export interface TechStateInfo {
  id: TechState;
  display: string;
  description: string;
}

export const TECH_STATE_INFO: Record<TechState, TechStateInfo> = {
  [TechState.Researched]: {
    id: TechState.Researched,
    display: 'Researched',
    description:
      'This technology is researched and unlocked new items and recipes.',
  },
  [TechState.Available]: {
    id: TechState.Available,
    display: 'Available',
    description: 'This technology is available to be researched.',
  },
  [TechState.Locked]: {
    id: TechState.Locked,
    display: 'Locked',
    description:
      'This technology cannot be researched until prerequisite technologies are researched.',
  },
} as const;

export const TECH_STATE_INFO_OPTIONS: TechStateInfo[] = TECH_STATE_OPTIONS.map(
  (o: TechState): TechStateInfo => TECH_STATE_INFO[o],
);

export function isTechState(value: string): value is TechState {
  return TECH_STATE_OPTIONS.includes(value as TechState);
}

const TECH_STATE_ORDER: TechState[] = [
  TechState.Locked,
  // TechState.Available,
  TechState.Researched,
];

export function techStateSorter(a: TechState, b: TechState): number {
  return TECH_STATE_ORDER.indexOf(a) - TECH_STATE_ORDER.indexOf(b);
}
