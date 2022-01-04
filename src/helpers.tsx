import axios from "axios";

export const addGroup = (setter: React.SetStateAction<any>) => {
  setter((prev: any) => {
    return [
      ...prev,
      {
        id: Date.now(),
      },
    ];
  });
};