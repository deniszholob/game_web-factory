import { TemplateRef } from '@angular/core';
import { EnumId, ObjectInfo } from 'src/app/utils';

export type TabId = EnumId;
export interface Tab<T extends TabId = string, Ctx = unknown>
  extends ObjectInfo<T> {
  /**
   * Undefined doesn't show badge
   * Null shows empty badge
   * Number shows badge with count
   */
  badge?: number | null;
  custom?: {
    template: TemplateRef<Ctx>;
    context: Ctx;
  };
}

export const TAB_ID_ALL: 'all' = 'all' as const;
