import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Params, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { toTitleCase } from 'src/app/utils';

const BASE_TITLE = 'template_nx_project_name';
const SEPARATOR = ' - ';

@Injectable({ providedIn: 'root' })
export class AppTitleService extends TitleStrategy {
  constructor(private tile: Title) {
    super();
  }

  public override updateTitle(snapshot: RouterStateSnapshot): void {
    const queryParams: Params = snapshot.root.queryParams;
    const urlSegments: string[] = getUrlSegments(snapshot.url);
    const t: string | undefined = getAppTitle(urlSegments, queryParams);
    if (t) this.tile.setTitle(t);
  }
}

function getUrlSegments(url: string): string[] {
  return url
    .split('/') // split by url separator
    .map((v: string): string => v.replace(/\?.*/, '')) // remove any query strings (search?page=0&q=bob) to keep pure paths
    .filter((v: string): boolean => !!v);
}

function getAppTitle(
  urlSegments: string[],
  queryParams?: Params,
): string | undefined {
  // Only change title if not the root url, otherwise will grab from the index.html
  let pageTitle: string = toTitleCase(urlSegments.pop() ?? '');
  if (!pageTitle.length) return;
  const queryString: string | undefined = queryParams?.['q'];
  pageTitle = queryString ? `${pageTitle}: "${queryString}"` : pageTitle;
  return [BASE_TITLE, pageTitle].join(SEPARATOR);
}
