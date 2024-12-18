const config = {
    baseUrl: 'https://nomoreparties.co/v1/frontend-st-cohort-201',
  headers: {
    authorization: '1c2977d0-14bd-4476-823f-d308fd40eca4',
    'Content-Type': 'application/json',
  },
}


function checkResponse(res) { 
    if (res.ok) { 
        return res.json(); 
    } 
    return Promise.reject(`Ошибка: ${res.status}`); 
} 

export function getUserInfo() { 
    return fetch(`${config.baseUrl}/users/me`, { 
        headers: { 
            Authorization: config.headers.authorization, 
        } 
    }).then(res => checkResponse(res)); 
} 

export function getInitialCards() { 
    return fetch(`${config.baseUrl}/cards`, { 
        headers: { 
            Authorization: config.headers.authorization, 
        } 
    }).then(res => checkResponse(res)); 
} 

export function updateUserInfo(name, about) { 
    return fetch(`${config.baseUrl}/users/me`, { 
        method: 'PATCH', 
        headers: config.headers, 
        body: JSON.stringify({ 
            name, 
            about, 
        }) 
    }).then(res => checkResponse(res)); 
} 

export function updateAvatar(avatar) { 
    return fetch(`${config.baseUrl}/users/me/avatar`, { 
        method: 'PATCH', 
        headers: config.headers, 
        body: JSON.stringify({ 
            avatar, 
        }) 
    }).then(res => checkResponse(res)); 
} 

export function createCard(name, link) { 
    return fetch(`${config.baseUrl}/cards`, { 
        method: 'POST', 
        headers: config.headers, 
        body: JSON.stringify({ 
            name, 
            link, 
        }) 
    }).then(res => checkResponse(res)); 
} 

export function deleteCard(cardId) { 
    return fetch(`${config.baseUrl}/cards/${cardId}`, { 
        method: 'DELETE', 
        headers: { 
            Authorization: config.headers.authorization, 
        } 
    }).then(res => checkResponse(res)); 
} 

export function likeCard(cardId) { 
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, { 
        method: 'PUT', 
        headers: { 
            Authorization: config.headers.authorization, 
        } 
    }).then(res => checkResponse(res)); 
} 

export function dislikeCard(cardId) { 
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, { 
        method: 'DELETE', 
        headers: { 
            Authorization: config.headers.authorization, 
        } 
    }).then(res => checkResponse(res)); 
} 
