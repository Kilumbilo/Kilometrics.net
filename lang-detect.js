(() => {
    const storageKey = "kilometrics-lang-prompt-dismissed";
    const userLang = (navigator.language || navigator.userLanguage || "en").trim();
    const normalizedLang = userLang.toLowerCase();

    const supportedLanguages = new Set([
        "af", "ar", "bg", "cs", "da", "de", "el", "en", "es", "et", "fi", "fr",
        "gu", "he", "hi", "hu", "id", "it", "ja", "kn", "ko", "lt", "lv", "ml",
        "ms", "mt", "nl", "no", "pl", "pt", "ro", "ru", "sk", "sl", "sv", "sw",
        "ta", "te", "th", "tr", "uk", "ur", "vi", "zh-cn", "zh-tw"
    ]);

    function getTargetLanguage(lang) {
        if (lang.startsWith("zh-tw") || lang.startsWith("zh-hk")) return "zh-TW";
        if (lang.startsWith("zh")) return "zh-CN";

        return lang.split("-")[0];
    }

    function getLanguageName(languageCode) {
        try {
            if (typeof Intl !== "undefined" && typeof Intl.DisplayNames === "function") {
                const displayNames = new Intl.DisplayNames([languageCode], { type: "language" });
                return displayNames.of(languageCode) || languageCode;
            }
        } catch (error) {
            console.warn("Language display name lookup failed.", error);
        }

        return languageCode;
    }

    if (window.location.hostname === "translate.google.com") return;
    if (localStorage.getItem(storageKey) === "true") return;

    const targetLang = getTargetLanguage(normalizedLang);
    if (targetLang === "en" || !supportedLanguages.has(targetLang.toLowerCase())) return;

    const langName = getLanguageName(targetLang);
    const shouldTranslate = window.confirm(
        `We detected your browser language as "${langName}". Would you like to view this site in ${langName}?`
    );

    if (!shouldTranslate) {
        localStorage.setItem(storageKey, "true");
        return;
    }

    const translateUrl = `https://translate.google.com/translate?sl=en&tl=${targetLang}&u=${encodeURIComponent(window.location.href)}`;
    window.location.href = translateUrl;
})();
