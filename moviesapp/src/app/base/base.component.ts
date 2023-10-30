import { NgxSpinnerService } from "ngx-spinner";
import { SpinnerType } from "../enums/spinner-enum";

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) {
  }
  showSpinner(spinnerNameType: SpinnerType): void {
    this.spinner.show(undefined, {
      type: spinnerNameType
    });
  }

  componentSpinner(spinnerNameType: string): void {
    this.spinner.show(undefined, {
      type: spinnerNameType,
      bdColor: '#fff',
      color: '#000',
    });

    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

}