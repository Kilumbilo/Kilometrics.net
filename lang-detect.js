// Detect browser language
    const userLang = navigator.language || navigator.userLanguage;
    const defaultLang = userLang.split('-')[0]; // e.g. "fr" from "fr-FR"

    // Supported Google Translate languages
    const supportedLanguages = [
        'af','ar','bg','zh-CN','zh-TW','cs','da','nl','en','et','fi','fr','de','el','gu','he','hi','hu','id','it','ja','kn','ko','lt','lv','ms','ml','mt','no','pl','pt','ro','ru','sk','sl','es','sw','sv','ta','te','th','tr','uk','ur','vi'
    ];

    // If not English and supported, offer to switch
    if (defaultLang !== 'en' && supportedLanguages.includes(defaultLang)) {
        const langName = new Intl.DisplayNames([defaultLang], { type: 'language' }).of(defaultLang);
        if (confirm(`We detected your browser language as "${langName}". Would you like to view this site in ${langName}?`)) {
        // Redirect via Google Translate
        const translateUrl = `https://translate.google.com/translate?sl=en&tl=${defaultLang}&u=${encodeURIComponent(window.location.href)}`;
        window.location.href = translateUrl;
        }
    }