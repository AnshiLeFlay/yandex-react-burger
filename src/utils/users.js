import { 
    API_URL_REGISTER, 
    API_URL_RESET_STEP_1, 
    API_URL_RESET_STEP_2,
    API_URL_LOGIN,
    API_URL_LOGOUT,
    API_URL_UPDATE_TOKEN,
    API_URL_AUTH_USER
} from "./api";

export const registerUser = async ( name, email, password ) => {
    const settings = {
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

export const forgotPassword = async ( email ) => {
    const settings = {
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

export const resetPassword = async ( password, token ) => {
    const settings = {
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

export const loginUser = async ( email, password ) => {
    const settings = {
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

export const logoutUser = async ( token ) => {
    const settings = {
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

export const updateToken = async ( token ) => {
    console.log('token from updateToken');
    console.log( token );

    const settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( { "token": token } )
    };

    console.log( settings );

    try {
        const res = await fetch( API_URL_UPDATE_TOKEN, settings );
        console.log( res );
        if ( res.ok ) {
            return await res.json();
        } return Promise.reject(`1 Ошибка обновления токена ${res.status}`);
    } catch (error) {
        return Promise.reject(`2 Ошибка обновления токена ${error}`);
    }
}

/*
export const fullUpdate = async ( token ) => {
    updateToken( token ).then( res => {
        console.log( res );
        updateUser( res.accessToken );
    } ).then( () => {

    } );
}
*/

export const updateUser = async ( token, data ) => {
    console.log('token from updateUser');
    console.log( token );
    //console.log(`Bearer ${token}`);
    console.log(data);

    const settings = {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify( data )
    };

    console.log( settings );

    try {
        const res = await fetch( API_URL_AUTH_USER, settings );

        if ( res.ok ) {
            return await res.json();
        } return Promise.reject(`1 Ошибка обновления ${res.status}`);
    } catch (error) {
        return Promise.reject(`2 Ошибка обновления ${error}`);
    }
}

export const getUserData = async ( token ) => {
    console.log('token from getUserData');
    console.log( token );

    const settings = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
        }
    };

    try {
        const res = await fetch( API_URL_AUTH_USER, settings );

        if ( res.ok ) {
            return await res.json();
        } return Promise.reject(`1 Ошибка получения информации ${res.status}`);
    } catch (error) {
        return Promise.reject(`2 Ошибка получения информации ${error}`);
    }
}