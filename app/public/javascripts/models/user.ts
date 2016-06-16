export class User {

  constructor(
    public username: string,
    public password?: string
  ){}
  
}

module.exports = { User: User };
