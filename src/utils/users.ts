import { 
    API_URL_REGISTER, 
    API_URL_RESET_STEP_1, 
    API_URL_RESET_STEP_2,
    API_URL_LOGIN,
    API_URL_LOGOUT,
    API_URL_UPDATE_TOKEN,
    API_URL_AUTH_USER
} from "./api";

export const registerUser = async ( name: string, email: string, password: string ) => {
    const settings: RequestInit = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
            "email": email, 
            "password": password, 
            "name": name 
        } )
    };

    try {
        const res = await fetch( API_URL_REGISTER, settings );

        if ( res.ok ) {
            return await res.json();
        } return Promise.reject(`Ошибка при регистрации ${res.status}`);
    } catch (error) {
        return Promise.reject(`Ошибка при регистрации ${error}`);
    }
}

export const forgotPassword = async ( email: string ) => {
    const settings: RequestInit = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( { "email": email } )
    };

    try {
        const res = await fetch( API_URL_RESET_STEP_1, settings );

        if ( res.ok ) {
            return await res.json();
        } return Promise.reject(`Ошибка (step 1) ${res.status}`);
    } catch (error) {
        return Promise.reject(`Ошибка (step 1) ${error}`);
    }
}

export const resetPassword = async ( password: string, token: string ) => {
    const settings: RequestInit = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
            "password": password,
            "token": token
        } )
    };

    try {
        const res = await fetch( API_URL_RESET_STEP_2, settings );

        if ( res.ok ) {
            return await res.json();
        } return Promise.reject(`Ошибка ${res.status}`);
    } catch (error) {
        return Promise.reject(`Ошибка ${error}`);
    }
}

export const loginUser = async ( email: string, password: string ) => {
    const settings: RequestInit = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
            'email': email,
            'password': password
        } )
    };

    try {
        const res = await fetch( API_URL_LOGIN, settings );

        if ( res.ok ) {
            return await res.json();
        } return Promise.reject(`Ошибка авторизации ${res.status}`);
    } catch (error) {
        return Promise.reject(`Ошибка авторизации ${error}`);
    }
}

export const logoutUser = async ( token: string ) => {
    const settings: RequestInit = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( { 'token': token } )
    };

    try {
        const res = await fetch( API_URL_LOGOUT, settings );

        if ( res.ok ) {
            return await res.json();
        } return Promise.reject(`Ошибка выхода ${res.status}`);
    } catch (error) {
        return Promise.reject(`Ошибка выхода ${error}`);
    }
}

export const updateToken = async ( token: string ) => {
    const settings: RequestInit = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( { "token": token } )
    };

    try {
        const res = await fetch( API_URL_UPDATE_TOKEN, settings );

        if ( res.ok ) {
            return await res.json();
        } return Promise.reject(`1 Ошибка обновления токена ${res.status}`);
    } catch (error) {
        return Promise.reject(`2 Ошибка обновления токена ${error}`);
    }
}

export const updateUser = async ( token: string, data: any ) => {
    const settings: RequestInit = {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify( data )
    };

    try {
        const res = await fetch( API_URL_AUTH_USER, settings );

        //обработка ошибок запроса перенесена в action
        return await res.json();
    } catch (error) {
        return Promise.reject(`2 Ошибка обновления ${error}`);
    }
}

export const getUserData = async ( token: string ) => {
    const settings: RequestInit = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };

    try {
        const res = await fetch( API_URL_AUTH_USER, settings );

        //обработка ошибок заспроса перенесена в action
        return await res.json();
    } catch (error) {
        return Promise.reject(`2 Ошибка получения информации ${error}`);
    }
}