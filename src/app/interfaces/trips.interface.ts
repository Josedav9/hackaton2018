export interface trip{
    id?: string,
    est_origin: string,
    est_destino?: string,
    fecha_ini: Date,
    fecha_fin?: Date,
    recorrido:{
        lat:number,
        lon:number
    }
}