import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private overlay: Overlay) {}



   createDialog<T>(dialogParameters: Partial<DialogParameters<T>>): OverlayRef {
    const defaultOptions = new DialogOptions();
    const options = { ...defaultOptions, ...dialogParameters.options };

    const config = new OverlayConfig({
      width: options.width,
      height: options.height,
    });

    const dialogRef = this.overlay.create(config);

    const componentPortal = new ComponentPortal(dialogParameters.componentType);
    const componentRef = componentPortal.attach(dialogRef);
    

    return dialogRef;
  }
}

export class DialogParameters<T> {
  componentType: ComponentType<T>;
  data: any;
  options?: Partial<DialogOptions> = new DialogOptions();
}

export class DialogOptions {
  width?: string = "250px";
  height?: string;
}
