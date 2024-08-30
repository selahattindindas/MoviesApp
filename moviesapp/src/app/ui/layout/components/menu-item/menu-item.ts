import { MenuItem } from "./menu-item.module";

export const MENU_ITEMS: MenuItem[] = [
  { route: '/filmler', icon: 'fa-film', label: 'Anasayfa' },
  { route: 'vizyondakiler', icon: 'fa-film', label: 'Vizyondakiler' },
  { route: 'platformdakiler', icon: 'fa-clapperboard', label: 'Platformdakiler' },
  { route: 'yaklasanlar', icon: 'fa-calendar', label: 'Yaklaşanlar' },
  { route: 'haberler', icon: 'fa-newspaper', label: 'Haberler' },
  { route: 'hakkımızda', icon: 'fa-circle-info', label: 'Hakkımızda' },
  { route: 'iletisim', icon: 'fa-phone-volume', label: 'İletişim' },
  { route: 'giris', icon: 'fa-house-user', label: 'Giriş Yap', isVisible: true, onClick: 'logout' },
  { route: '', icon: 'fa-house-user', label: 'Çıkış Yap', isVisible: false, onClick: 'logout' }
];
