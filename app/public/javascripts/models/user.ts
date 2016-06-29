export class User {

  constructor(
    public email?: string,
    public password?: string,
    private _id?: string
  ){}

  public get id(): string{
    return this._id;
  }

  public set id(id){
    this._id = id;
  }

  static fromJson(json){
    if (json.email == undefined)
      return null;
    
    let user = new User();
    return Object.assign(user, json);
  }
  
}

module.exports = { User: User };
