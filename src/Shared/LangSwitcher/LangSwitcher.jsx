import { useTranslation } from "react-i18next";

export function LangSwitcher() {
  const { i18n } = useTranslation();
  const lang = i18n.language; // current language

  return (
    <div className="flex gap-2">
      {lang !== "en" && (
        <button
          className="py-2 px-3 text-black dark:text-white  rounded"
          onClick={() => {
            localStorage.setItem("lang", "en");
            i18n.changeLanguage("en");
          }}
        >
          EN
        </button>
      )}

      {lang !== "ar" && (
        <button
          className="py-2 px-3 text-black dark:text-white rounded"
          onClick={() => {
            localStorage.setItem("lang", "ar");
            i18n.changeLanguage("ar");
          }}
        >
          AR
        </button>
      )}
    </div>
  );
}
