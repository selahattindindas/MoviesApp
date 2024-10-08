export enum CategoryEnum {
  Seciniz = 0,
  Aksiyon = 1,
  Macera =2,
  BilimKurgu = 3,
  Romantik = 4,
}

export const CategoryDescription: { [key in CategoryEnum]: string } = 
{
  [CategoryEnum.Seciniz]: 'Tüm Kategoriler',
  [CategoryEnum.Aksiyon]: 'Aksiyon',
  [CategoryEnum.BilimKurgu]: 'Bilim Kurgu',
  [CategoryEnum.Romantik]: 'Romantik',  
  [CategoryEnum.Macera]: 'Macera',
};
export class ListCategoryEnum{
  
  async getCategoryEnumValues(select?: boolean): Promise<{ value: CategoryEnum; description: string; }[]> {

    const enumValues = Object.keys(CategoryEnum)

      .filter((key) => typeof CategoryEnum[key as keyof typeof CategoryEnum] === 'number')
      .map((key) =>
      ({
        value: CategoryEnum[key as keyof typeof CategoryEnum],
        description: CategoryDescription[CategoryEnum[key as keyof typeof CategoryEnum]],
      }));

    return select === false
      ? enumValues.filter((item) => item.value !== CategoryEnum.Seciniz)
      : enumValues;
  }
}