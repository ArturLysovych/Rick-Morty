export interface ICharacterPopupProps {
    popupVisible: boolean;
    hidePopup: () => void;
    currentCharacter: {
      id: number;
      name: string;
      gender: string;
      species: string;
      location?: { name: string };
      status: string;
      type?: string;
      image: string;
    };
}
  