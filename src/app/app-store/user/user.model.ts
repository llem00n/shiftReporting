export class User {
  userId: number = null;
  firstName: string = null;
  secondName: string = null;
  isActive: boolean = null;
  password: string = null;
  email: string = null;
  login: string = null;

  constructor(opt: {} = {}) {
    Object.keys(opt).map(key => {
      if (Object.keys(this).includes(key)) {
        this[key] = opt[key]
      }
    })
  }
}
