import { Component } from '@angular/core';

@Component({
  selector: 'ui-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  togglePanel() {
    const container: HTMLElement | null = document.getElementById('container');

    if (container) 
      container.classList.toggle('right-panel-active');
    
  }
  EyesPassword() {
    const eyesYes: HTMLElement | null = document.getElementById('eyes-true');
    const eyesNo: HTMLElement | null = document.getElementById('eyes-false');
    const inputType: HTMLInputElement | null = document.getElementById(
      'type-value'
    ) as HTMLInputElement;
    if (eyesYes && eyesNo && inputType) {
      eyesYes.addEventListener('click', () => {
        eyesYes.style.display = 'none';
        eyesNo.style.display = 'block';
        inputType.type = 'text';
      });

      eyesNo.addEventListener('click', () => {
        eyesNo.style.display = 'none';
        eyesYes.style.display = 'block';
        inputType.type = 'password';
      });
    }
  }
}
