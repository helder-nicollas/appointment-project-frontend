/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, inject, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { DropdownPanel } from './types/dropdown-panel';
import { mergeWith, Subscription } from 'rxjs';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[dropdownTriggerFor]',
  host: {
    '(click)': 'toggleDropdown()',
  },
})
export class DropdownTriggerForDirective implements OnDestroy {
  private viewContainerRef = inject(ViewContainerRef);
  private overlay = inject(Overlay);
  private elementRef = inject(ElementRef<HTMLElement>);
  private dropdownClosingActionsSub = Subscription.EMPTY;
  private isDropdownOpen = false;
  private overlayRef!: OverlayRef;

  @Input('dropdownTriggerFor')
  public dropdownPanel!: DropdownPanel;

  public toggleDropdown() {
    if (this.isDropdownOpen) return this.destroyDropdown();

    return this.openDropdown();
  }

  public openDropdown(): void {
    this.isDropdownOpen = true;
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.close(),
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withPositions([
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
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
  }

  ngOnDestroy(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
