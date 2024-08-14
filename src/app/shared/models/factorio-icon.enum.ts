export enum FactorioIcon {
  'DepositCoal' = 'DepositCoal',
  'DepositCopper' = 'DepositCopper',
  'DepositIron' = 'DepositIron',
  'DepositStone' = 'DepositStone',
  'DepositUranium' = 'DepositUranium',
  'DepositWater' = 'DepositWater',
  'DepositOil' = 'DepositOil',
  'DepositWood' = 'DepositWood',

  'RawCoal' = 'RawCoal',
  'RawCopper' = 'RawCopper',
  'RawIron' = 'RawIron',
  'RawStone' = 'RawStone',
  'RawUranium' = 'RawUranium',
  'RawWater' = 'RawWater',
  'RawOil' = 'RawOil',
  'RawWood' = 'RawWood',

  'Electricity' = 'Electricity',
}

export const FACTORIO_ICON_OPTIONS: FactorioIcon[] =
  Object.values(FactorioIcon);

export interface FactorioIconInfo {
  id: FactorioIcon;
  display: string;
  url: string;
}

export const FACTORIO_ICON_INFO: Record<FactorioIcon, FactorioIconInfo> = {
  [FactorioIcon.DepositCoal]: {
    id: FactorioIcon.DepositCoal,
    display: 'Coal Deposit',
    url: 'assets/graphics/deposit-coal.png',
  },
  [FactorioIcon.DepositCopper]: {
    id: FactorioIcon.DepositCopper,
    display: 'Copper Deposit',
    url: 'assets/graphics/deposit-copper.png',
  },
  [FactorioIcon.DepositIron]: {
    id: FactorioIcon.DepositIron,
    display: 'Iron Deposit',
    url: 'assets/graphics/deposit-iron.png',
  },
  [FactorioIcon.DepositStone]: {
    id: FactorioIcon.DepositStone,
    display: 'Stone Deposit',
    url: 'assets/graphics/deposit-stone.png',
  },
  [FactorioIcon.DepositUranium]: {
    id: FactorioIcon.DepositUranium,
    display: 'Uranium Deposit',
    url: 'assets/graphics/deposit-uranium.png',
  },
  [FactorioIcon.DepositWater]: {
    id: FactorioIcon.DepositWater,
    display: 'Water Well',
    url: 'assets/graphics/deposit-water.png',
  },
  [FactorioIcon.DepositOil]: {
    id: FactorioIcon.DepositOil,
    display: 'Oil Well',
    url: 'assets/graphics/deposit-oil.png',
  },
  [FactorioIcon.DepositWood]: {
    id: FactorioIcon.DepositWood,
    display: 'Forest',
    url: 'assets/graphics/deposit-wood.png',
  },

  [FactorioIcon.RawCoal]: {
    id: FactorioIcon.RawCoal,
    display: 'Raw Coal',
    url: 'assets/graphics/raw-coal.png',
  },
  [FactorioIcon.RawCopper]: {
    id: FactorioIcon.RawCopper,
    display: 'Raw Copper',
    url: 'assets/graphics/raw-copper.png',
  },
  [FactorioIcon.RawIron]: {
    id: FactorioIcon.RawIron,
    display: 'Raw Iron',
    url: 'assets/graphics/raw-iron.png',
  },
  [FactorioIcon.RawStone]: {
    id: FactorioIcon.RawStone,
    display: 'Raw Stone',
    url: 'assets/graphics/raw-stone.png',
  },
  [FactorioIcon.RawUranium]: {
    id: FactorioIcon.RawUranium,
    display: 'Raw Uranium',
    url: 'assets/graphics/raw-uranium.png',
  },
  [FactorioIcon.RawWater]: {
    id: FactorioIcon.RawWater,
    display: 'Raw Water',
    url: 'assets/graphics/raw-water.png',
  },
  [FactorioIcon.RawOil]: {
    id: FactorioIcon.RawOil,
    display: 'Raw Oil',
    url: 'assets/graphics/raw-oil.png',
  },
  [FactorioIcon.RawWood]: {
    id: FactorioIcon.RawWood,
    display: 'Raw Wood',
    url: 'assets/graphics/raw-wood.png',
  },
  [FactorioIcon.Electricity]: {
    id: FactorioIcon.Electricity,
    display: 'Electricity',
    url: 'assets/graphics/electricity.png',
  },
} as const;

export const FACTORIO_ICON_INFO_OPTIONS: FactorioIconInfo[] =
  FACTORIO_ICON_OPTIONS.map(
    (o: FactorioIcon): FactorioIconInfo => FACTORIO_ICON_INFO[o],
  );

export function isFactorioIcon(value: string): value is FactorioIcon {
  return FACTORIO_ICON_OPTIONS.includes(value as FactorioIcon);
}
