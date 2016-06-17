export class User {

  constructor(
    public email?: string,
    public password?: string,
    private _id?: string
  ){}

  static fromJson(json){
    if (json.email == undefined)
      return null;
    
    let user = new User();
    return Object.assign(user, json);
  }
  
}

module.exports = { User: User };
