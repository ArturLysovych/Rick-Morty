export interface IInfo {
    id: number;
    name: string;
    dimension: string;
    created: string;
    type: string;
}
  
export interface IProps {
    infoArr: IInfo[];
}