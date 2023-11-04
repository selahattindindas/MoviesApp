import { Component, AfterViewInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am5 from '@amcharts/amcharts5';
import * as am5charts from "@amcharts/amcharts5/charts";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { MoviesService } from 'src/app/services/common/models/movies.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements AfterViewInit {
  movies: List_Movie[];
  chart: am5charts.PieChart;

  constructor(private movieservice: MoviesService) {}

  ngAfterViewInit() {
    
    this.movieservice.getAllMovies().then((movies: List_Movie[]) => {
      const groupedMovies = movies.reduce((acc, movie) => {
        const category = movie.categoryName;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(movie);
        return acc;
      }, {});
  
      const chart = am4core.create('categoryDiv', am5charts.PieChart);
  
      if (Object.keys(groupedMovies).length === 0) {
        chart.data = [{
          category: 'Film Bulunamadı',
          value: 1 
        }];
      } else {
        chart.data = Object.keys(groupedMovies).map((category) => ({
          category: category,
          value: groupedMovies[category].length
        }));
      }
  
      const series = chart.series.push(new am5charts.PieSeries());
      series.dataFields.value = "value";
      series.dataFields.category = "category";
  
      chart.innerRadius = am4core.percent(40);
      chart.cursor = new am5charts.XYCursor();

      this.chart = chart;
    });
  }
  
}
