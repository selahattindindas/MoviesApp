export enum CategoryEnum {
  Seciniz = 0,
  Aksiyon = 1,
  Macera = 2,
  BilimKurgu = 4,
  Romantik = 5,
}

export const CategoryDescription: { [key in CategoryEnum]: string } = {
  [CategoryEnum.Seciniz]: 'Lütfen bir kategori seçiniz',
  [CategoryEnum.Aksiyon]: 'Aksiyon',
  [CategoryEnum.BilimKurgu]: 'Bilim Kurgu',
  [CategoryEnum.Romantik]: 'Romantik',
  [CategoryEnum.Macera]: 'Macera',
};