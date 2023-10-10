export enum PlatformEnum {
    Seciniz = 0,
    Sinema = 1,
    Netflix = 2,
    Disney = 3,
}
//Düzenlendi
export const PlatformDescription: { [key in number]: string } = {
    [PlatformEnum.Seciniz]: "Lütfen bir platform seçiniz",
    [PlatformEnum.Sinema]: "Sinema",
    [PlatformEnum.Netflix]: "Netflix",
    [PlatformEnum.Disney]: "Disney+", 
}