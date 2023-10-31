import { NgxSpinnerService } from "ngx-spinner";
import { SpinnerType } from "../enums/spinner-enum";

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) {
  }

  componentSpinner(spinnerNameType: SpinnerType): void {
    this.spinner.show(undefined, {
      type: spinnerNameType,
      color: '#fff',
    });

    setTimeout(() => {
      this.spinner.hide();
    }, 750);
  }

}