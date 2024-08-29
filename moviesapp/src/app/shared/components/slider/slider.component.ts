import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider";
import { List_Movie } from 'src/app/contracts/movie/list-movie';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit{
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>
  @Input() movies: List_Movie[] = [];
  slider: KeenSliderInstance;

  ngOnInit(): void {
    this.getSlider();
  }

  getSlider(): void {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: 0,
        loop: true,
        drag: false,
        breakpoints: {
          "(min-width: 350px)": {
            slides: { perView: 1, spacing: 5 },
          },
          "(min-width: 600px)": {
            slides: { perView: 2, spacing: 10 },
          },
          "(min-width: 1150px)": {
            slides: { perView: 3, spacing: 15 },
          },
        },
      });
    }, 200);
  }
}
