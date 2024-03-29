import React, { useEffect } from "react";
import { useSelector, useDispatch } from "../services/hooks";
import { useHistory } from "react-router-dom";
import { getItems } from "../services/actions";
import { TIngredient } from "../services/types";

import styles from "./pages.module.css";

export function IngredientsPage(props: { modal?: boolean }) {
    const ingredients = useSelector((store) => store?.data?.ingredients);
    const [currentItem, setCurrentItem] = React.useState<TIngredient>({});
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        //обновить список ингредиентов
        dispatch(getItems());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const res = ingredients.find(
            (elem: TIngredient) =>
                elem._id === history.location.pathname.split("/")[2]
        );

        if (res !== undefined) setCurrentItem(res);
    }, [history.location.pathname, ingredients]);

    return (
        <div
            id="ingredientsPageModal"
            className={!props?.modal ? `${styles.wrapper}` : ""}
        >
            <p className={`text text_type_main-medium ${styles.profile_cells}`}>
                Детали ингредиента
            </p>
            <div className={styles.ingredients_wrapper}>
                <img alt={currentItem.name} src={currentItem.image} />
                <p className="text text_type_main-small mt-4 mb-8">
                    {currentItem.name}
                </p>
                <div className={styles.nutrients + " mb-15"}>
                    <p className="text text_type_main-small text_color_inactive mr-5">
                        Калории, ккал
                        <br />
                        <span className="text_type_digits-default">
                            {currentItem.calories}
                        </span>
                    </p>
                    <p className="text text_type_main-small text_color_inactive mr-5">
                        Белки, г<br />
                        <span className="text_type_digits-default">
                            {currentItem.proteins}
                        </span>
                    </p>
                    <p className="text text_type_main-small text_color_inactive mr-5">
                        Жиры, г<br />
                        <span className="text_type_digits-default">
                            {currentItem.fat}
                        </span>
                    </p>
                    <p className="text text_type_main-small text_color_inactive">
                        Углеводы, г<br />
                        <span className="text_type_digits-default">
                            {currentItem.carbohydrates}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
