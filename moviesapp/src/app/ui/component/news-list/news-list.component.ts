import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { SpinnerType } from 'src/app/constacts/spinner-enum';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent extends BaseComponent implements OnInit {

  newsList = [
    {
      imageUrl: 'assets/img/news.jpg',
      title: '"Deadpool & Wolverine" Altıncı Haftasında da Gişenin Lideri!',
      description: 'Marvel Sinematik Evreni\'nin yakın tarihteki en başarılı filmi olan "Deadpool & Wolverine" vizyondaki altıncı hafta sonunda da Box Office Türkiye listesinin bir numarasındaki yerini korudu. 30 Ağustos - 1 Eylül hafta sonunda 35 bin 850 seyirci tarafından izlenen film toplamda 1 milyon 283 bin 159 seyirciye ulaştı.'
    },
    {
      imageUrl: 'assets/img/news1.jpg',
      title: '"City of God: The Fight Rages On" 2. Sezon Onayını Aldı',
      description: 'Paulo Lins’in 1997 tarihli aynı adlı romanından uyarlanan ve 2000’li yılların başında büyük yankı uyandıran ‘City of God’ filminin devamı niteliğindeki ‘City of God: Savaş Devam Ediyor’ dizisi, ikinci sezon onayını aldı. Ülkemizde BluTV’de yayınlanan ve izleyicilerden olumlu tepkiler alan HBO orijinal yapımı dizi, yeni sezon hazırlıklarına başladı.'
    }
  ];

  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.componentSpinner(SpinnerType.JellyBox);
  }
}
