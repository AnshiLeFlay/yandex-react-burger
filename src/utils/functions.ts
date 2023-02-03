import { TIngredient } from "../services/types";

export const findIngredients = ( args: Array<string>, inrgediensArray: Array<TIngredient> ) => {
    let res = [];
    for ( let i = 0; i < inrgediensArray.length; i++ ) {
        const buf = inrgediensArray.find( ( elem: TIngredient ) => elem._id === args[i] );
        if ( buf !== undefined )
            res.push( buf );
    }

    return res;
}