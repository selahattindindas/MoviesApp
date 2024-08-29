import { NgxSpinnerService } from "ngx-spinner";
import { SpinnerType } from "../constacts/spinner-enum";

export class BaseComponent {

  protected spinner: NgxSpinnerService;

  constructor(spinner: NgxSpinnerService) {
    this.spinner = spinner;
  }

  componentSpinner(spinnerNameType: SpinnerType, timeout: number = 750): void {
    this.spinner.show(undefined, {
      type: spinnerNameType,
      color: '#fff',
    }); 

    setTimeout(() => {
      this.spinner.hide();
    }, timeout);
  }
}
