export enum PlatformEnum {
    Seciniz = 0,
    Sinema = 1,
    //3 eklenecek
    Netflix = 2,
    Disney = 4
}

export const PlatformDescription: { [key in number]: string } = {
    [PlatformEnum.Seciniz]: "Lütfen bir platform seçiniz",
    [PlatformEnum.Sinema]: "Sinema",
    [PlatformEnum.Netflix]: "Netflix",
    [PlatformEnum.Disney]: "Disney+" 
}