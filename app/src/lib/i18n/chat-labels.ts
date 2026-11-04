import { getLocale, type Locale } from "./index";

/**
 * The chat library's own words, which it takes as one object of labels.
 *
 * Only the labels a person sees in OpenBot are here. English needs none: the library's defaults are
 * English. The Inspector labels are left out because OpenBot does not show the Inspector.
 */
const de = {
  chatInputPlaceholder: "Nachricht eingeben …",
  chatInputToolbarStartTranscribeButtonLabel: "Diktieren",
  chatInputToolbarCancelTranscribeButtonLabel: "Abbrechen",
  chatInputToolbarFinishTranscribeButtonLabel: "Fertig",
  chatInputToolbarAddButtonLabel: "Anhänge hinzufügen",
  chatInputToolbarToolsButtonLabel: "Werkzeuge",
  chatInputToolbarSendButtonLabel: "Nachricht senden",
  chatInputToolbarStopButtonLabel: "Anhalten",
  assistantMessageToolbarCopyCodeLabel: "Kopieren",
  assistantMessageToolbarCopyCodeCopiedLabel: "Kopiert",
  assistantMessageToolbarCopyMessageLabel: "Kopieren",
  assistantMessageToolbarThumbsUpLabel: "Gute Antwort",
  assistantMessageToolbarThumbsDownLabel: "Schlechte Antwort",
  assistantMessageFeedbackCommentPlaceholder: "Kommentar hinzufügen (optional)",
  assistantMessageFeedbackCommentSubmitLabel: "Kommentar senden",
  assistantMessageToolbarReadAloudLabel: "Vorlesen",
  assistantMessageToolbarRegenerateLabel: "Neu erzeugen",
  userMessageToolbarCopyMessageLabel: "Kopieren",
  userMessageToolbarEditMessageLabel: "Bearbeiten",
  userMessageToolbarPreviousBranchLabel: "Vorherige Fassung",
  userMessageToolbarNextBranchLabel: "Nächste Fassung",
  chatDisclaimerText:
    "KI kann Fehler machen. Bitte prüfen Sie wichtige Angaben.",
  chatToggleOpenLabel: "Chat öffnen",
  chatToggleCloseLabel: "Chat schließen",
  chatScrollToBottomLabel: "Nach unten scrollen",
  welcomeMessageText: "Wie kann ich Ihnen heute helfen?",
  reasoningMessageThinkingLabel: "Denkt nach …",
  chatInputSlashMenuLabel: "Befehle mit /",
  chatInputSlashMenuEmptyText: "Keine Befehle gefunden",
  attachmentRemoveButtonLabel: "Anhang entfernen",
  attachmentPlayVideoButtonLabel: "Video abspielen",
  attachmentPreviewCloseButtonLabel: "Vorschau schließen",
  modalHeaderCloseButtonLabel: "Schließen",
  modalHeaderThreadsButtonLabel: "Unterhaltungen öffnen",
};

const catalogues: Partial<Record<Locale, Record<string, string>>> = { de };

/** Passed as `labels`. Empty in English, so the library's defaults apply. */
export function chatLabels(
  locale: Locale = getLocale(),
): Record<string, string> {
  return catalogues[locale] ?? {};
}
