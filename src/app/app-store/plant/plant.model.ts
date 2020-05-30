export class Plant {
  plantId: number = null;
  name: string = null;
  code: string = null;
  address: string = null;

  constructor(opt: {} = {}) {
    Object.keys(opt).map(key => {
      if (Object.keys(this).includes(key)) {
        this[key] = opt[key]
      }
    })
  }
}
