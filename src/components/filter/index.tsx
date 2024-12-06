import {Button} from "antd";
import {useAppDispatch} from "../../hooks/use-app-dispatch";
import {setViewMode} from "../../state/app-reducer";

export const Filter = () => {

    const dispatch = useAppDispatch()

    const favoritesOnClickHandler = () => {
        dispatch(setViewMode("favorites"))
    }

    const allOnClickHandler = () => {
        dispatch(setViewMode("all"))
    }

    return <div>
        <Button type="primary" onClick={allOnClickHandler}>Все товары</Button>
        <Button type="primary" onClick={favoritesOnClickHandler}>Избранное</Button>
    </div>
}