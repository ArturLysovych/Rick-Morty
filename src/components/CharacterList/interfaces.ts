export interface ICurrentCharacter {
    id: number;
    name: string;
    gender: string;
    species: string;
    location?: { name: string };
    status: string;
    type?: string;
    image: string;
}
  
export interface IEpisodeData {
    air_date: string;
    characters: string[];
    created: string;
    episode: string;
    id: number;
    name: string;
    url: string;
}
  
export interface ILocationData {
    created: string;
    dimension: string;
    id: number;
    name: string; 
    residents: string[];
    type: string;
    url: string;
}