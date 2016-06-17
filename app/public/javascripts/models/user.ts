export class User {

  constructor(
    public email: string,
    public password?: string
  ){}
  
}

module.exports = { User: User };
