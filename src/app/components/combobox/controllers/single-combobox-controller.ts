import { SingleSelectionStrategy } from '../strategies/single-selection-strategy';
import { ComboboxController } from './combobox-controller';

export class SingleComboboxCotroller extends ComboboxController {
  public constructor() {
    super(new SingleSelectionStrategy());
  }

  public override value() {
    if (this.selection.value == null) return '';
    return this.selection.value();
  }
}
