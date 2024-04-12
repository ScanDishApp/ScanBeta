import DBManager from "./storageManager.mjs";

class Friends {

  constructor(userId, friendId, status) {
    this.userId = userId;
    this.friendId = friendId;
    this.status = status;
 
  }

  async save() {

    console.log(this.status);
    if (this.status == null) {
      return await DBManager.sendRequest(this);
    } else if (this.status == "pending"){
      return await DBManager.ansRequest(this);
    }else {
      return await DBManager.removeFriend(this);
    }
  }

  async list() {
    let dbFriend = await DBManager.listFriends(this.friendId);

    if (dbFriend.friendId != null) {
      this.userId = dbFriend.userId;
      this.friendId = dbFriend.friendId;
      this.status = dbFriend.status;
  
      return {
        success: true,
        friend: {
          userId: this.userId,
          friendId: this.friendId,
          status: this.status,
        }
      }
    } else {

      return null;
    }
  }

  
}

export default Friends;