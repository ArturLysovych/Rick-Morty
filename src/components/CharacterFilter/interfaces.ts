import { SelectChangeEvent } from '@mui/material/Select';

export interface ICharacterFilterProps {
    filterStatus: string;
    filterGender: string;
    filterName: string;
    handleChangeStatus: (event: SelectChangeEvent<string>) => void;
    handleChangeGender: (event: SelectChangeEvent<string>) => void;
    setFilterName: React.Dispatch<React.SetStateAction<string>>;
}