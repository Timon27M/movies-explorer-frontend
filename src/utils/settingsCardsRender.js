import { useState, useEffect } from "react";

export function CheckSettingsCardsRender() {
  const [settingsCardRender, setSettingsCardRender] = useState({});

  const [widthWindow, setWidthWindow] = useState(window.inerWidth);

  
  useEffect(() => {
    //   const { innerWidth: width } = window;
    function changeWindowWidth() {
      const { innerWidth: newWidth } = window;
      setWidthWindow(newWidth);
    }

    window.addEventListener("resize", changeWindowWidth);
  }, []);

  useEffect(() => {
    if (widthWindow > 820) {
      setSettingsCardRender({ cardRender: 12, cardRenderMore: 3 });
    } else if (widthWindow >= 610) {
      setSettingsCardRender({ cardRender: 8, cardRenderMore: 2 });
    } else {
      setSettingsCardRender({ cardRender: 5, cardRenderMore: 2 });
    }
  }, [widthWindow]);

  return settingsCardRender;
}
