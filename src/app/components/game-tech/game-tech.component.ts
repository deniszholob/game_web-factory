import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  Tech,
  TECH_INFO,
  TECH_INFO_OPTIONS,
  TECH_OPTIONS,
  TechInfo,
} from 'src/app/shared';
import { GameService } from 'src/app/shared/game-logic/game.service';
import { techStateSorter } from 'src/app/shared/game-logic/tech-state.enum';

import {
  FactorioIconComponent,
  IconSizes,
} from '../factorio-icon/factorio-icon.component';
import { TechnologyCardComponent } from '../technology-card/technology-card.component';

@Component({
  selector: 'app-game-tech',
  templateUrl: './game-tech.component.html',
  styles: [':host{display:contents}'],
  standalone: true,
  imports: [CommonModule, FactorioIconComponent, TechnologyCardComponent],
})
export class GameTechComponent implements OnDestroy {
  protected Tech = Tech;
  protected IconSizes = IconSizes;
  private readonly destroy$ = new Subject<void>();

  protected TECH_OPTIONS = TECH_OPTIONS;
  protected TECH_INFO = TECH_INFO;
  protected TECH_INFO_OPTIONS = TECH_INFO_OPTIONS;

  protected sortedTech = this.sortTech();
  protected techTiers: TechInfo[][] = [];

  constructor(protected gameService: GameService) {
    gameService.techResearchDone$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.sortedTech = this.sortTech();
      });

    // this.groupTechByTiers();
  }
  public ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this.destroy$.next();
    this.destroy$.complete();
  }

  private sortTech() {
    return [...TECH_INFO_OPTIONS].sort((a, b) =>
      techStateSorter(
        this.gameService.gameState.techInfo[a.id].state,
        this.gameService.gameState.techInfo[b.id].state,
      ),
    );
  }

  private groupTechByTiers() {
    const techMap = new Map<Tech, TechInfo>(
      this.TECH_INFO_OPTIONS.map((tech) => [tech.id, tech]),
    );
    const unprocessed = new Set<Tech>(this.TECH_OPTIONS);
    let tier = 0;

    while (unprocessed.size > 0) {
      const tierTechs: TechInfo[] = [];

      for (const tech of unprocessed) {
        const techInfo = techMap.get(tech)!;
        const hasUnmetRequirements = techInfo.requiredTech.some((req) =>
          unprocessed.has(req),
        );

        if (!hasUnmetRequirements) {
          tierTechs.push(techInfo);
        }
      }

      if (tierTechs.length === 0) break; // Prevent infinite loop if there's a circular dependency

      this.techTiers.push(tierTechs);
      tierTechs.forEach((tech) => unprocessed.delete(tech.id));
      tier++;
    }
  }

  protected getLineStyle(
    tierIndex: number,
    tech: Tech,
    requiredTech: Tech,
  ): { top: string; left: string; height: string; width: string } {
    const requiredTechTierIndex = this.techTiers.findIndex((tier) =>
      tier.some((t) => t.id === requiredTech),
    );
    const requiredTechInfo = this.TECH_INFO[requiredTech];
    const requiredTechPosition = this.techTiers[
      requiredTechTierIndex
    ]?.findIndex((t) => t.id === requiredTech);
    const techPosition = this.techTiers[tierIndex]?.findIndex(
      (t) => t.id === tech,
    );

    const verticalOffset = (tierIndex - requiredTechTierIndex) * 150; // Increase to add more height
    const horizontalOffset =
      ((requiredTechPosition ?? 0) - (techPosition ?? 0)) * 100; // Adjust this value based on your layout

    return {
      top: `${-verticalOffset}px`,
      left: `${50 + horizontalOffset / 2}%`, // Center the line
      height: `${verticalOffset}px`,
      width: `${Math.abs(horizontalOffset)}px`,
    };
  }

  // protected getLineStyle(
  //   tierIndex: number,
  //   requiredTech: Tech,
  // ): { top: string; left: string; height: string } {
  //   const requiredTechTierIndex = this.techTiers.findIndex((tier) =>
  //     tier.some((t) => t.id === requiredTech),
  //   );
  //   const verticalOffset = (tierIndex - requiredTechTierIndex) * 100; // Adjust this value based on your layout

  //   return {
  //     top: `${-verticalOffset}px`,
  //     left: '50%', // Adjust to position the line properly
  //     height: `${verticalOffset}px`,
  //   };
  // }
}
