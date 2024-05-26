export async function fetchData(url, method, data) {
    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    };

    const options = {
        method,
        headers,
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    return response;
}

// user 
export async function getUser(url, id) {
    const paramUrl = `${url}?id=${id}`;
    return await fetchData(paramUrl, "GET");
}

export async function createUser(url, data) {
    return await fetchData(url, "POST", data);
}

export async function updateUser(url, data) {
    return await fetchData(url, "PUT", data);
}

export async function deleteUser(url) {
    return await fetchData(url, "DELETE");
}

export async function loginUser(url, user) {
    return await fetchData(url, "POST", user);
}

//book
export async function createBook(url, user) {
    return await fetchData(url, "POST", user);
}

export async function deleteBook(url) {
    return await fetchData(url, "DELETE");
}

export async function getBook(url) {
    return await fetchData(url, "GET");
}

export async function listBook(url) {
    return await fetchData(url, "GET");
}

//friends  
export async function sendRequest(url, user) {
    return await fetchData(url, "POST", user);
}

export async function addFriend(url, data) {
    return await fetchData(url, "PUT", data);
}

export async function getFriend(url, userId) {
    const paramUrl = `${url}?userId=${userId}`;
    return await fetchData(paramUrl, "GET");
}

export async function declineFriend(url, data) {
    return await fetchData(url, "PUT", data);
}

export async function getRequest(url, data) {
    const paramUrl = `${url}?userId=${data}`;
    return await fetchData(paramUrl, "GET");
}

//page
export async function createPage(url, user) {
    return await fetchData(url, "POST", user);
}

export async function getPages(url) {
    return await fetchData(url, "GET");
}
export async function deletePage(url) {
    return await fetchData(url, "DELETE");
}

export async function updatePage(url, data) {
    return await fetchData(url, "PUT", data);
}

//favorites 
export async function getFavorite(url) {
    return await fetchData(url, "GET");
}
export async function createFavorite(url, data) {
    return await fetchData(url, "POST", data);
}

export async function deleteFavorite(url) {
    return await fetchData(url, "DELETE");
}
