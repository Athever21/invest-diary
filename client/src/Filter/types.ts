import { Filters, SelectOption } from "../redux/tradeFiltersSlice";

export type FilterProps = {
    name: string,
    value?: string | number,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    type: string,
    placeholder?: string
}

export type DateFilterProps = {
    value?: Date,
    onChange: (date: Date | null, event?: React.SyntheticEvent<any>) => void;
}

export type SelectFilterProps<K extends keyof Filters> = {
    value?: string;
    name: K;
    options: SelectOption<Filters[K]>[];
    placeholder?: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
};