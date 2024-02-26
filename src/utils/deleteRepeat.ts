import { useDispatch } from "react-redux";
import { setRepeatToTask } from "../redux/slices/repeatTaskSlice";
import { AppDispatch } from "../redux/store";


export function deleteRepeat(dispatch: AppDispatch, onClose: () => void) {
    dispatch(setRepeatToTask({
        isRepeat: false,
        nextDateRepeat: undefined,
        repeatVariant: '',
    }))
    onClose();
}