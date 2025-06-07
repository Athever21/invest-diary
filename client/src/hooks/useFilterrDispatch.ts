import { useDispatch } from "react-redux";
import { Filters, setFilter } from '../redux/tradeFiltersSlice'

const useFilterDispatch = () => {
    const dispatch = useDispatch();

    return <K extends keyof Filters>(name: K) =>
        (value: Filters[K]) =>
            dispatch(setFilter({name, value}));
};

export default useFilterDispatch;