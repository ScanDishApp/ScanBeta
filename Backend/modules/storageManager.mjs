import pg from "pg";
import { HttpCodes } from "./httpCodes.mjs";

class DBManager {

    #credentials = {};

    constructor(connectionString) {
        connectionString = process.env.DB_CONNECTIONSTRING_PROD
        this.#credentials = {
            connectionString: connectionString,
            ssl: (process.env.DB_SSL === "true") ? true : false
        };

    }

    async updateUser(user) {

        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            const sql = 'UPDATE "public"."Users" set "name" = $1, "email" = $2, "pswHash" = $3, "img" = $4 where "id" = $5;'
            const params = [user.name, user.email, user.pswHash, user.img, user.id]
            const output = await client.query(sql, params);

        } catch (error) {
            console.error('Error in update user:', error.stack);

        } finally {
            client.end();
        }
        return user;
    }

    async deleteUser(user) {

        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            const sql = 'DELETE FROM "public"."Users" WHERE "id" = $1;'
            const params = [user.id];
            const output = await client.query(sql, params);
            return true;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
            client.end();
        }
    }

    async createUser(user) {

        const client = new pg.Client(this.#credentials);

        try {
            const sql = 'INSERT INTO "public"."Users"("name", "email", "pswHash", "img") VALUES($1::TEXT, $2::TEXT, $3::TEXT, $4::TEXT) RETURNING id;';
            const parms = [user.name, user.email, user.pswHash, user.img];
            await client.connect();
            const output = await client.query(sql, parms);

            if (output.rows.length == 1) {
                user.id = output.rows[0].id;
            }

        } catch (error) {
            console.error(error);
            throw error;
            return false;
        } finally {
            client.end();
        }

        return user;

    }

    async getUser(id) {

        const client = new pg.Client(this.#credentials);
        let user = null;

        try {
            await client.connect();
            const sql = 'SELECT * FROM "public"."Users" WHERE "id" = $1'
            const params = [id]
            const output = await client.query(sql, params);

            console.log(output);
            user = output.rows[0];

        } catch (error) {
            console.error('Error in getting user :', error.stack);
        } finally {
            client.end();
        }

        return user;
    }

    async loginUser(email) {
        const client = new pg.Client(this.#credentials);
        let user = null;

        try {

            await client.connect();
            const sql = 'SELECT * FROM "public"."Users" WHERE "email" = $1';
            const params = [email]
            const output = await client.query(sql, params);
            user = output.rows[0];

        } catch (error) {
            console.error('Error logging in:', error.stack);
        } finally {
            client.end();
        }
        return user;
    }


    async createBook(book) {

        const client = new pg.Client(this.#credentials);

        try {
            const sql = 'INSERT INTO "public"."cookbooks"("userId", "contents") VALUES($1::TEXT, $2::TEXT) RETURNING id;';
            const parms = [book.userId, book.contents];
            await client.connect();
            const output = await client.query(sql, parms);

            if (output.rows.length == 1) {
                book.id = output.rows[0].id;
            }

        } catch (error) {
            console.error(error);
            throw error;
            return false;
        } finally {
            client.end();
        }
        return book;

    }

    async getBook(id) {

        const client = new pg.Client(this.#credentials);
        let book = null;

        try {
            await client.connect();
            const sql = 'SELECT * FROM "public"."cookbooks" WHERE "id" = $1';
            const params = [id];
            const output = await client.query(sql, params);

            console.log(output);
            book = output.rows[0];

        } catch (error) {
            console.error('Error logging in:', error.stack);
        } finally {
            client.end();
        }
        return book;
    }

    async listBook(userId) {

        const client = new pg.Client(this.#credentials);
        let book = [];

        try {
            await client.connect();
            const sql = 'SELECT * FROM "public"."cookbooks" WHERE "userId" LIKE $1';
            const params = [`%${userId}%`];
            const output = await client.query(sql, params);

            for (let i = 0; i < output.rows.length; i++) {
                book.push(output.rows[i])
                console.log(book);

            }
        } catch (error) {
            console.error('Error logging in:', error.stack);
        } finally {
            client.end();
        }
        return book;

    }

    async listSharedBook(userId) {

        const client = new pg.Client(this.#credentials);
        let book = [];

        try {
            await client.connect();
            const sql = 'SELECT * FROM "public"."cookbooks" WHERE "userId" LIKE $1';
            const params = [`%${userId},%`];
            const output = await client.query(sql, params);

            for (let i = 0; i < output.rows.length; i++) {
                book.push(output.rows[i])
                console.log(book);

            }
        } catch (error) {
            console.error('Error logging in:', error.stack);
        } finally {
            client.end();
        }
        return book;

    }

    async updateBook(book) {
        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            const sql = 'UPDATE "public"."cookbooks" set "contents" = $1 WHERE "id" = $2;'
            const params = [book.contents, book.id];
            const output = await client.query(sql, params);



        } catch (error) {
            console.error('Error in update shoppinglist:', error.stack);
        } finally {
            client.end();
        }

        return book;

    }

    async deleteBook(id) {

        const client = new pg.Client(this.#credentials);
        try {

            await client.connect();

            console.log('Connected to the database');
            const sql = 'DELETE FROM "public"."cookbooks" WHERE "id" = $1;'
            const params = [id];
            const output = await client.query(sql, params);
            console.log('Query executed successfully');
            return true;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
            return false;
        } finally {
            client.end();
            console.log('Disconnected from the database');

        }

    }
    async listFriends(userId) {

        const client = new pg.Client(this.#credentials);
        let friend = [];

        try {
            await client.connect();
            const sql = 'SELECT * FROM "public"."friends" WHERE "friendId" = $1 AND "status" = $2';
            const status = "friend";
            const params = [userId, status];
            const output = await client.query(sql, params);

            for (let i = 0; i < output.rows.length; i++) {
                friend.push(output.rows[i])

            }

        } catch (error) {
            console.error('Error logging in:', error.stack);
        } finally {
            client.end();
        }
        return friend;

    }
    async listFriendRequest(userId) {

        const client = new pg.Client(this.#credentials);
        let friend = [];

        try {
            await client.connect();
            const sql = 'SELECT * FROM "public"."friends" WHERE "friendId" = $1 AND "status" = $2';
            const status = "pending";
            const params = [userId, status];
            const output = await client.query(sql, params);

            for (let i = 0; i < output.rows.length; i++) {
                friend.push(output.rows[i])

            }

        } catch (error) {
            console.error('Error logging in:', error.stack);
        } finally {
            client.end();
        }
        return friend;

    }
    async removeFriend(request) {

        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            const sql = 'UPDATE "public"."friends" SET "status" = $1 WHERE "id" = $2;'
            console.log("hello" + request.status + request.id);
            const params = [request.status, request.id];
            console.log("before");
            const output = await client.query(sql, params);
            console.log("after");

        } catch (error) {
            console.error('Error in update user:', error.stack);

        } finally {
            client.end();
        }
        return request;

    }
    async ansRequest(request) {

        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            const sql = 'UPDATE "public"."friends" SET "status" = $1 WHERE "id" = $2;'
            console.log("hello" + request.status + request.id);
            const params = [request.status, request.id];
            console.log("before");
            const output = await client.query(sql, params);
            console.log("after");

        } catch (error) {
            console.error('Error in update user:', error.stack);

        } finally {
            client.end();
        }
        return request;

    }

    async sendRequest(request) {
        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            const sql = 'INSERT INTO "public"."friends"("userId", "friendId", "status", "name") VALUES($1::TEXT, $2::TEXT, $3::TEXT, $4::TEXT) RETURNING status;';
            const parms = [request.userId, request.friendId, request.status, request.name];

            const output = await client.query(sql, parms);

            if (output.rows.length == 1) {
                request.status = output.rows[0].status;
            }

        } catch (error) {
            console.error(error);
            throw error;
            return false;
        } finally {
            client.end();
        }

        return request;
    }
    async favoritePage(like) {
        const client = new pg.Client(this.#credentials);

        try {

            const sql = 'INSERT INTO "public"."favorites"("userId", "contents") VALUES($1::TEXT, $2::TEXT) RETURNING id;';
            const parms = [like.userId, like.contents];
            await client.connect();
            const output = await client.query(sql, parms);

            if (output.rows.length == 1) {
                like = output.rows[0];
            }

        } catch (error) {
            console.error(error);
            throw error;
            return false;
        } finally {
            client.end();
        }

        return like;
    }

    async deleteFavorite(id) {

        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            const sql = 'DELETE FROM "public"."favorites" WHERE "id" = $1;'
            const params = [id];
            const output = await client.query(sql, params);
            return true;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
            client.end();
        }
    }

    async getFavorite(userId) {

        const client = new pg.Client(this.#credentials);
        let like = null;

        try {
            await client.connect();
            const sql = 'SELECT * FROM "public"."favorites" WHERE "userId" = $1'
            const params = [userId]
            const output = await client.query(sql, params);

            console.log(output);
            like = output.rows[0];

        } catch (error) {
            console.error('Error in getting user :', error.stack);
        } finally {
            client.end();
        }

        return like;
    }



}

export default new DBManager(process.env.DB_CONNECTIONSTRING_PROD);