/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, inject, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { DropdownPanel } from '../components/dropdown/types/dropdown-panel';
import { mergeWith, Subscription } from 'rxjs';
import { TemplatePortal } from '@angular/cdk/portal';

type WidthStrategy = 'match-trigger' | 'custom';

@Directive({
  selector: '[dropdownTriggerFor]',
  host: {
    '(click)': 'toggleDropdown()',
  },
})
export class DropdownTriggerForDirective implements OnDestroy {
  private viewContainerRef = inject(ViewContainerRef);
  private overlay = inject(Overlay);
  private elementRef = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);
  private dropdownClosingActionsSub = Subscription.EMPTY;
  private isDropdownOpen = false;
  private overlayRef!: OverlayRef;
  @Input()
  public widthStrategy: WidthStrategy = 'match-trigger';

  @Input('dropdownTriggerFor')
  public dropdownPanel!: DropdownPanel;

  public toggleDropdown() {
    if (this.isDropdownOpen) return this.destroyDropdown();

    this.openDropdown();
  }

  public openDropdown(): void {
    this.isDropdownOpen = true;
    this.overlayRef = this.overlay.create({
      width: this.getResponsiveWidth(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.close(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withFlexibleDimensions(true)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: 8,
          },
        ]),
    });

    const templatePortal = new TemplatePortal(
      this.dropdownPanel.templateRef,
      this.viewContainerRef,
    );
    this.overlayRef.attach(templatePortal);

    this.dropdownClosingActionsSub = this.dropdownClosingActions().subscribe(() =>
      this.destroyDropdown(),
    );
    this.dropdownPanel.setOpen(true);
  }

  private getResponsiveWidth() {
    if (this.widthStrategy == 'match-trigger') {
      const triggerRect = this.elementRef.nativeElement.getBoundingClientRect();

      const viewportWidth = window.innerWidth;
      const margin = 16;

      return Math.min(triggerRect.width, viewportWidth - margin * 2);
    }

    return undefined;
  }

  private dropdownClosingActions() {
    const backdropClick$ = this.overlayRef.backdropClick();
    const detachment$ = this.overlayRef.detachments();
    const dropdownClose = this.dropdownPanel.closed;

    return backdropClick$.pipe(mergeWith(detachment$, dropdownClose));
  }

  private destroyDropdown(): void {
    if (!this.overlayRef || !this.isDropdownOpen) {
      return;
    }

    this.dropdownClosingActionsSub.unsubscribe();
    this.isDropdownOpen = false;
    this.overlayRef.detach();
    this.overlayRef.dispose();
    this.dropdownPanel.setOpen(false);
  }

  public ngOnDestroy() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
