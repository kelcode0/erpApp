export class User {
  static fromFirebase({ name, email, uid }: any) {
    return new User(uid, name, email);
  }

  constructor(public uid: string, public name: string, public email: string) {}
}
