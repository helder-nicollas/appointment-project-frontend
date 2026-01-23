/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter, Signal, TemplateRef } from '@angular/core';

export interface DropdownPanel {
  templateRef: TemplateRef<any>;
  open: Signal<boolean>;
  setOpen(value: boolean): void;
  closed: EventEmitter<void>;
}
