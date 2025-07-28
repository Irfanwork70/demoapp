import { getTextList } from "@/languages/TextList";
import i18next from "i18next";
import { useEffect, useState } from "react";

export const useTextListOnFocus = () => {
  const [textList, setTextList] = useState(getTextList());
  // Update when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setTextList(getTextList());
    };

    i18next.on("languageChanged", handleLanguageChange);

    return () => {
      i18next.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return textList;
};
