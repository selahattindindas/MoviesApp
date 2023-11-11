export enum PlatformEnum {
    Seciniz = 0,
    Sinema = 1,
    Netflix = 2,
    Disney= 3,
}
//Düzenlendi
export const PlatformDescription: { [key in number]: string } = {
    [PlatformEnum.Seciniz]: "Tüm Platformlar",
    [PlatformEnum.Sinema]: "Sinema",
    [PlatformEnum.Netflix]: "Netflix",
    [PlatformEnum.Disney]: "Disney+", 
}

export class ListPlatformEnum{

    async getPlatformEnumValues(select?: boolean): Promise<{ value: PlatformEnum; description: string; }[]> {
        const enumValues = Object.keys(PlatformEnum)
          .filter((key) => typeof PlatformEnum[key as keyof typeof PlatformEnum] === 'number')
          .map((key) => ({
            value: PlatformEnum[key as keyof typeof PlatformEnum],
            description: PlatformDescription[PlatformEnum[key as keyof typeof PlatformEnum]],
          }));
    
        return select === false
          ? enumValues.filter((item) => item.value !== PlatformEnum.Seciniz)
          : enumValues;
      }
      
}