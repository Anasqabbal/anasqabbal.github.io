// Average adult silent reading of English non-fiction is about 238 wpm (typical range 175 to 300).
// Technical text and non-native readers read slower, so we use 230 and add pauses.
export const READ_WPM = 230;
export const READ_WORD_MS = 60_000 / READ_WPM;
export const READ_FADE_MS = 120;
export const SCAN_LINE_MS = 90;
export const PARAGRAPH_PAUSE_MS = 350;
export const COMMA_PAUSE_MS = 100;
export const SENTENCE_PAUSE_MS = 250;
