import { Component, AfterViewInit } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { List_Movie } from 'src/app/contracts/movie/list-movie';
import { MoviesService } from 'src/app/services/common/models/movies.service';
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5xy from '@amcharts/amcharts5/xy';

@Component({
  selector: 'app-adminhome',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements AfterViewInit {
  movies: List_Movie[];
  chart: am5.Chart;
  constructor(private movieservice: MoviesService) { }

  ngAfterViewInit() {
    this.categoryCharts();
    this.platformCharts();
    this.dateCharts();
  }

  categoryCharts() {
    const root = am5.Root.new("categoryCharts");
    root.setThemes([am5themes_Animated.new(root)]);
    root._logo.dispose();

    this.movieservice.getAllMovies().then((movies: List_Movie[]) => {
      const groupedMovies = movies.reduce((acc, movie) => {
        const category = movie.categoryName;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(movie);
        return acc;
      }, {});

      const data = Object.keys(groupedMovies).map((category) => ({
        category: category,
        value: groupedMovies[category].length,
      }));

      let chart = root.container.children.push(am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50)
      }));

      const series = chart.series.push(am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        alignLabels: false
      }));
      series.labels.template.setAll({
        textType: "circular",
        centerX: 0,
        centerY: 0
      });
      let legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      }));
      legend.data.setAll(series.dataItems);
      series.data.setAll(data);
      series.appear(1000);
      chart.appear(1000, 100);
    });
  }

  platformCharts() {
    const root = am5.Root.new("platformCharts");
    root.setThemes([am5themes_Animated.new(root)]);
    root._logo.dispose();

    this.movieservice.getAllMovies().then((movies: List_Movie[]) => {
      const groupedMovies = movies.reduce((acc, movie) => {
        const platform = movie.platformName;
        if (!acc[platform]) {
          acc[platform] = [];
        }
        acc[platform].push(movie);
        return acc;
      }, {});

      const data = Object.keys(groupedMovies).map(platform => ({
        platform: platform,
        value: groupedMovies[platform].length,
      }));

      let chart = root.container.children.push(am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50)
      }));

      const series = chart.series.push(am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "platform",
        alignLabels: false

      }));

      series.labels.template.setAll({
        textType: "circular",
        centerX: 0,
        centerY: 0
      });
      let legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      }));
      legend.data.setAll(series.dataItems);
      series.data.setAll(data);
      series.appear(1000);
      chart.appear(1000, 100);
    });
  }

  dateCharts() {
    let root = am5.Root.new("dateCharts");


    let myTheme = am5.Theme.new(root);

    myTheme.rule("Grid", ["base"]).setAll({
      strokeOpacity: 0.1
    });

    root.setThemes([
      am5themes_Animated.new(root),
      myTheme
    ]);
    root._logo.dispose();
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none"
      })
    );

    let yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 30 });
    yRenderer.grid.template.set("location", 1);

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "category",
        renderer: yRenderer
      })
    );

    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {
          visible: true,
          strokeOpacity: 0.1
        })
      })
    );

    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "count",
        sequencedInterpolation: true,
        categoryYField: "category"
      })
    );

    this.movieservice.getAllMovies().then((movies: List_Movie[]) => {
      const currentDate = new Date();

      const oneWeekLater = new Date();
      oneWeekLater.setDate(currentDate.getDate() + 7);

      const visionMovies = movies.filter((movie) => {
        const [day, month, year] = movie.releaseDate.split('.').map(Number);
        const movieDate = new Date(year, month - 1, day);
        return movieDate >= currentDate && movieDate <= oneWeekLater;
      });

      const noMovies = movies.filter((movie) => {
        const [day, month, year] = movie.releaseDate.split('.').map(Number);
        const movieDate = new Date(year, month - 1, day);
        return movieDate < currentDate;
      });

      const commingMovies = movies.filter((movie) => {
        const [day, month, year] = movie.releaseDate.split('.').map(Number);
        const movieDate = new Date(year, month - 1, day);
        return movieDate > currentDate && movieDate >= oneWeekLater;
      });
      const chartData = [
        { category: "Vizyondaki Filmler", count: visionMovies.length, value: 1 },
        { category: "Vizyondan Kalkan Filmler", count: noMovies.length, value: 1 },
        { category: "Yaklaşan Filmler", count: commingMovies.length, value: 1 },
      ];
      let columnTemplate = series.columns.template;

      columnTemplate.setAll({
        draggable: true,
        cursorOverStyle: "pointer",
        tooltipText: "{category}: {count}",
        cornerRadiusBR: 10,
        cornerRadiusTR: 10,
        strokeOpacity: 0
      });
      columnTemplate.adapters.add("fill", (fill, target) => {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      columnTemplate.adapters.add("stroke", (stroke, target) => {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });
      yAxis.data.setAll(chartData);
      series.data.setAll(chartData);
    })
    series.appear(1000);
    chart.appear(1000, 100);
  }
}
