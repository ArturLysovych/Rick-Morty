export interface ICharacterProps {
    character: {
      id: number;
      name: string;
      image: string;
    };
    showPopup: (character: { id: number; name: string; image: string, }) => void;
}