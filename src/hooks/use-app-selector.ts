import { useSelector } from "react-redux"
import {RootState} from "../state/store";


export const useAppSelector = useSelector.withTypes<RootState>()