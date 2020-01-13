export class Producto{
  constructor(private _nombre:string, private _precio:number, private _cdisponible: number){}

  get nombre(): string {
    return this._nombre;
  }

  get precio(): number {
    return this._precio;
  }

  get cdisponible(): number {
    return this._cdisponible;
  }



  set cdisponible(value: number) {
    this._cdisponible = value;
  }
}
