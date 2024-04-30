import DBManager from "./storageManager.mjs";

class Friends {

  constructor(userId, friendId, status, id, name) {
    this.userId = userId;
    this.friendId = friendId;
    this.status = status;
    this.id = id;
    this.name = name;

  }

  async save() {

    console.log(this.status + this.id);
    if ((this.id == null) && (this.status) == "pending") {
      return await DBManager.sendRequest(this);
    } else if ((this.status == "friend") && (this.id != null) || (this.status == "declined") && (this.id != null)) {
      return await DBManager.ansRequest(this);
    } else {
      return await DBManager.removeFriend(this);
    }
  }

  async list() {
    let dbFriend = await DBManager.listFriends(this.userId);


    if (dbFriend) {
      this.userId = dbFriend.userId;
      this.friendId = dbFriend.friendId;
      this.status = dbFriend.status;
      this.name = dbFriend.name;

      return {
        success: true,
        dbFriend: dbFriend
      }
    } else {

      return {
        success: false,
        message: "request not found"
      };
    }
  }

  async listRequest() {
    let dbFriend = await DBManager.listFriendRequest(this.userId);

    if (dbFriend) {
      this.userId = dbFriend.userId;
      this.friendId = dbFriend.friendId;
      this.status = dbFriend.status;
      this.name = dbFriend.name;

      return {
        success: true,
        dbFriend: dbFriend
      }
    } else {

      return {
        success: false,
        message: "request not found"
      };
    }
  }

}

export default Friends;