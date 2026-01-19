/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { DropdownPanel } from './types/dropdown-panel';

@Component({
  selector: 'ui-dropdown',
  imports: [],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class Dropdown implements DropdownPanel {
  @ViewChild(TemplateRef)
  public templateRef!: TemplateRef<any>;
  @Output()
  public closed = new EventEmitter();
}
