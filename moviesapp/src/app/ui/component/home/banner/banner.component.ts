import { Component, ElementRef, AfterViewInit, OnDestroy, ViewChild, OnInit, HostListener} from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { DateEnum } from 'src/app/constacts/date-enum';
import { PlatformEnum } from 'src/app/constacts/platform-enum';
import { SpinnerType } from 'src/app/constacts/spinner-enum';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { MoviesService } from 'src/app/services/common/models/movies.service';

@Component({
  selector: 'banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent extends BaseComponent implements  OnInit, OnDestroy  {
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>;
  currentSlide: number = 0;
  slider: KeenSliderInstance ;
  movies: List_Movie[];
  isMobile: boolean = false;

  constructor(
    private movieService: MoviesService,
    spinner: NgxSpinnerService) {
      super(spinner);
    }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowSize();
  }

  ngOnInit() {
    this.getMovies();
    this.getBanner();
    this.checkWindowSize();
  }

  async getMovies() {
    this.componentSpinner(SpinnerType.JellyBox); 

    this.movieService.getAllMovies(PlatformEnum.Sinema, DateEnum.Vision)
      .then(movieData => {
        this.movies = movieData as List_Movie[];
      })
      .finally(() => {
        this.spinner.hide(); 
      });
  }
  
  private checkWindowSize(): void {
    this.isMobile = window.innerWidth < 610;
  }

  getBanner(){
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: 0,
        loop: true,
      }, [
        (slider) => {
          let timeout: any;
          let mouseOver = false;
  
          function nextTimeout() {
            clearTimeout(timeout);
  
            if (mouseOver) return;
  
            timeout = setTimeout(() => {
              slider.next();
            }, 4000);
          };
  
          slider.on("slideChanged", (slider) => {
            this.currentSlide = slider.track.details.rel;
          });
  
          nextTimeout();
  
          slider.on("animationEnded", nextTimeout);
          slider.on("updated", nextTimeout);
        },
      ]);
    }, 200);
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }

}

