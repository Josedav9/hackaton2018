export interface station{
    id?: string,
    lat: number,
    lon: number,
    nombre: string,
    bicicletas?: string[],
    tipo: string,
    espacios: number
}