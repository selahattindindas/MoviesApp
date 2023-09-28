export enum PlatformEnum {
    Seciniz = 0,
    Sinema = 11,
    Netflix = 12,
    Disney = 13
}

export const PlatformDescription: { [key in number]: string } = {
    [PlatformEnum.Seciniz]: "Lütfen bir platform seçiniz",
    [PlatformEnum.Sinema]: "Sinema",
    [PlatformEnum.Netflix]: "Netflix",
    [PlatformEnum.Disney]: "Disney+" 
}

// export const PlatformDescription: { [key: number]: string } = {