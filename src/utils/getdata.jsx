import { API_URL_INGREDIENTS, API_URL_ORDER } from './api';

/* OLD query to API
fetch( API_URL )
    .then( res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    } ).then( data => setData(data.data) )
    .catch(( error ) => {
        console.log('Ошибка подключения к API: ', error);
    })
*/

export const getDataRequest = async ( ) => {
    /* NEW query to API */
    try {
        const res = await fetch( API_URL_INGREDIENTS );

        if ( res.ok ) {
            return await res.json();
        } return Promise.reject(`Ошибка подключения к API ${res.status}`);
    } catch (error) {
        return Promise.reject(`Ошибка подключения к API ${error}`);
    }
}

export const getOrderNumberRequest = async ( order = {} ) => {

    const settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( order )
    };

    try {
        const res = await fetch( API_URL_ORDER, settings );

        if ( res.ok ) {
            return await res.json();
        } return Promise.reject(`Ошибка подключения к API ${res.status}`);
    } catch (error) {
        return Promise.reject(`Ошибка подключения к API ${error}`);
    }
}