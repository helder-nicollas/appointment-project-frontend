import { MultiSelectionStrategy } from '../strategies/multi-selection-strategy';
import { ComboboxController } from './combobox-controller';

export class MultipleComboboxController extends ComboboxController {
  public constructor() {
    super(new MultiSelectionStrategy());
  }

  public override value(): string[] {
    const value = super.value();
    return Array.isArray(value) ? value : [];
  }
}
