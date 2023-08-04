import { useState, useEffect } from 'react';

export function useSettingCardsRender() {
  const [settingsCardRender, setSettingsCardRender] = useState({});
  const [widthWindow, setWidthWindow] = useState(window.innerWidth);
  const [isDownloadSettingCards, setIsDownloadSettingCards] = useState(true);

  function changeWindowWidth() {
    const { innerWidth: newWidth } = window;
    setWidthWindow(newWidth);
  }

  function addSettings() {
    if (widthWindow > 820) {
      setSettingsCardRender({ cardRender: 12, cardRenderMore: 3 });
      setIsDownloadSettingCards(false);
    } else if (widthWindow >= 610) {
      setSettingsCardRender({ cardRender: 8, cardRenderMore: 2 });
      setIsDownloadSettingCards(false);
    } else if (widthWindow < 610) {
      setSettingsCardRender({ cardRender: 5, cardRenderMore: 2 });
      setIsDownloadSettingCards(false);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", changeWindowWidth);
    addSettings();
  }, [widthWindow]);

  useEffect(() => {
    addSettings();
  }, []);

  return { settingsCardRender, isDownloadSettingCards }
}
