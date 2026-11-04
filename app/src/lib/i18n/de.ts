/**
 * German text, keyed by the English it replaces.
 *
 * Register: "Sie", plain words, short sentences. Vocabulary follows the English glossary in
 * `.claude/skills/openbot-copy`: Bot (capitalised), App for an app a Bot uses, Verbindungen,
 * Fähigkeiten, Admin, Unterhaltung. "Anfrage" and "Aufgabe" are not interchangeable with "Bot".
 */
export const de: Record<string, string> = {
  " and ": " und ",
  "A Bot can call this tool only while its switch is on. Turning it off applies from the next call.":
    "Ein Bot kann dieses Werkzeug nur aufrufen, solange sein Schalter an ist. Ausschalten gilt ab dem nächsten Aufruf.",
  "A Bot no longer here": "Ein Bot, der nicht mehr da ist",
  "A Bot only sees the tools it has been given. Each call is checked when it happens, so removing access applies from the next call.":
    "Ein Bot sieht nur die Werkzeuge, die er bekommen hat. Jeder Aufruf wird bei seiner Ausführung geprüft, ein Entzug gilt also ab dem nächsten Aufruf.",
  "A Bot starts checking in once somebody talks to it.":
    "Ein Bot beginnt mit Rückfragen, sobald jemand mit ihm spricht.",
  "A built-in Bot on an unlisted model is refused before it runs.":
    "Ein integrierter Bot mit einem nicht gelisteten Modell wird vor dem Lauf abgelehnt.",
  "A computer of its own, instead of sharing yours.":
    "Ein eigener Computer, statt Ihren mitzunutzen.",
  "A group can only add. Grant gives its members the capability even when the organization has it off.":
    "Eine Gruppe kann nur hinzufügen. „Gewähren“ gibt ihren Mitgliedern die Fähigkeit, auch wenn die Organisation sie ausgeschaltet hat.",
  "A member's own stricter setting still applies.":
    "Eine strengere eigene Einstellung eines Mitglieds gilt weiterhin.",
  "A message contains a phrase": "Eine Nachricht enthält eine Wendung",
  "A model provider's key, or one a connector signs in with.":
    "Der Schlüssel eines Modellanbieters oder einer, mit dem sich ein Konnektor anmeldet.",
  "A person cleared the browser": "Eine Person hat den Browser geleert",
  "A person pressed stop": "Eine Person hat angehalten",
  "A person supplied a secret": "Eine Person hat ein Geheimnis geliefert",
  "A person took control": "Eine Person hat übernommen",
  "A reaction is added": "Eine Reaktion wird hinzugefügt",
  "A role's setting replaces the organization switch for everybody with that role.":
    "Die Einstellung einer Rolle ersetzt den Schalter der Organisation für alle mit dieser Rolle.",
  "A routine is running…": "Eine Routine läuft …",
  "A teammate": "Eine Kollegin oder ein Kollege",
  "A tool or app, and what a Bot does before using it.":
    "Ein Werkzeug oder eine App und was ein Bot tut, bevor er sie nutzt.",
  "A worked example": "Ein ausgearbeitetes Beispiel",
  "AG-UI agent": "AG-UI-Agent",
  Acceptance: "Annahmequote",
  "Acceptance is how many items people started, out of the ones they started or hid.":
    "Die Annahmequote zeigt, wie viele Punkte Personen gestartet haben, von denen, die sie gestartet oder ausgeblendet haben.",
  "Access token": "Zugriffstoken",
  "Action Recording": "Aktionsaufzeichnung",
  Active: "Aktiv",
  Activity: "Aktivität",
  "Add a group policy": "Gruppenrichtlinie hinzufügen",
  "Add a provider": "Anbieter hinzufügen",
  "Add a rule": "Regel hinzufügen",
  "Add a source": "Quelle hinzufügen",
  "Add a team rule": "Teamregel hinzufügen",
  "Add an identity provider": "Identitätsanbieter hinzufügen",
  "Add and sync source": "Quelle hinzufügen und synchronisieren",
  "Add another Bot for a group…": "Weiteren Bot für eine Gruppe hinzufügen …",
  "Add credential": "Zugangsdaten hinzufügen",
  "Add one with Remember a fact.": "Fügen Sie eine mit „Etwas merken“ hinzu.",
  "Add rule": "Regel hinzufügen",
  "Add someone by email": "Person per E-Mail hinzufügen",
  "Add source": "Quelle hinzufügen",
  "Add this to the client's authorised redirect URIs at the vendor, exactly as written. One wrong character fails there, with an error that doesn't mention OpenBot.":
    "Tragen Sie dies beim Anbieter genau so in die erlaubten Weiterleitungs-URIs des Clients ein. Ein falsches Zeichen scheitert dort mit einem Fehler, der OpenBot nicht erwähnt.",
  "Add trigger": "Auslöser hinzufügen",
  "Added for everybody. Open one to set it up and choose which Bots get its tools.":
    "Für alle hinzugefügt. Öffnen Sie eines, um es einzurichten und festzulegen, welche Bots seine Werkzeuge bekommen.",
  "Added: ": "Hinzugefügt: ",
  "Addresses in INITIAL_ADMIN_EMAILS are always admins. You can't change them here.":
    "Adressen in INITIAL_ADMIN_EMAILS sind immer Admins. Sie können sie hier nicht ändern.",
  "Addresses in INITIAL_ADMIN_EMAILS can always use social sign-in as an emergency way in. Each of those sign-ins shows in Audit.":
    "Adressen in INITIAL_ADMIN_EMAILS können sich als Notzugang immer über soziale Anmeldung anmelden. Jede dieser Anmeldungen erscheint im Audit.",
  Admin: "Admin",
  "Admin → Approvals": "Admin → Freigaben",
  Admins: "Admins",
  "Agent URL": "Adresse des Agenten",
  "Agent address": "Adresse des Agenten",
  "All Bots": "Alle Bots",
  "All activity": "Gesamte Aktivität",
  "All connected": "Alle verbunden",
  "All occurrences": "Alle Vorkommen",
  "All pinned": "Alle angeheftet",
  "All waiting on you": "Alle warten auf Sie",
  "All your Bots will know it.": "Alle Ihre Bots werden es wissen.",
  "Allow all network access": "Gesamten Netzwerkzugang erlauben",
  "Allow once": "Einmal erlauben",
  "Allowed models": "Erlaubte Modelle",
  "Allowed once. Ask the Bot to try again.":
    "Einmal erlaubt. Bitten Sie den Bot, es erneut zu versuchen.",
  "Allowed, but this Bot has no callback token. Every call is refused. Issue one on its page, or set AGENT_TOOL_TOKEN.":
    "Erlaubt, aber dieser Bot hat kein Callback-Token. Jeder Aufruf wird abgelehnt. Stellen Sie auf seiner Seite eines aus oder setzen Sie AGENT_TOOL_TOKEN.",
  "Allowed. A Bot can do anything no rule above stops, within its own permissions.":
    "Erlaubt. Ein Bot darf alles, was keine Regel oben stoppt, im Rahmen seiner eigenen Berechtigungen.",
  Allowlist: "Zulassungsliste",
  "Already one of your rules.": "Bereits eine Ihrer Regeln.",
  "Always allow": "Immer erlauben",
  "Always allow for all Team Bots": "Für alle Team-Bots immer erlauben",
  "Always allow for this Bot": "Für diesen Bot immer erlauben",
  "Always allow here": "Hier immer erlauben",
  "Always allowed for every Team Bot. Ask it to try again.":
    "Für jeden Team-Bot immer erlaubt. Bitten Sie ihn, es erneut zu versuchen.",
  "Always allowed for this Bot. Ask it to try again.":
    "Für diesen Bot immer erlaubt. Bitten Sie ihn, es erneut zu versuchen.",
  "An action was blocked. This Bot reaches more people than approved.":
    "Eine Aktion wurde blockiert. Dieser Bot erreicht mehr Personen als freigegeben.",
  "An admin assigned it to you. It stays at the top of your Bots list.":
    "Ein Admin hat ihn Ihnen zugewiesen. Er bleibt oben in Ihrer Bot-Liste.",
  "An admin assigned it to you. You can't hide it.":
    "Ein Admin hat ihn Ihnen zugewiesen. Sie können ihn nicht ausblenden.",
  "An admin decides which Bots this one can ask.":
    "Ein Admin legt fest, welche Bots dieser fragen darf.",
  "An admin gave it to this Bot.": "Ein Admin hat sie diesem Bot gegeben.",
  "An admin has to add them. Until then this Bot can only talk with you.":
    "Ein Admin muss sie hinzufügen. Bis dahin kann dieser Bot nur mit Ihnen sprechen.",
  "An admin has turned off personal rules. Yours are kept but don't apply.":
    "Ein Admin hat persönliche Regeln ausgeschaltet. Ihre bleiben erhalten, gelten aber nicht.",
  "An admin must enable built-in hosting before you can run a Bot here.":
    "Ein Admin muss das integrierte Hosting einschalten, bevor Sie hier einen Bot betreiben können.",
  "An admin requires this.": "Das schreibt ein Admin vor.",
  "An admin turned off handing work between Bots. These settings are kept, and they apply again once it's back on.":
    "Ein Admin hat die Übergabe von Arbeit zwischen Bots ausgeschaltet. Diese Einstellungen bleiben erhalten und gelten wieder, sobald sie eingeschaltet ist.",
  "An admin turned them off. Your logins are kept but won't be offered.":
    "Ein Admin hat sie ausgeschaltet. Ihre Anmeldungen bleiben erhalten, werden aber nicht angeboten.",
  "An admin writes these for everyone and picks which Bots use them.":
    "Ein Admin schreibt diese für alle und legt fest, welche Bots sie nutzen.",
  "An ongoing goal. The Bot works on it in the conversation you pick.":
    "Ein laufendes Ziel. Der Bot arbeitet in der gewählten Unterhaltung daran.",
  "Another one still running": "Eine andere läuft noch",
  "Any agent that speaks AG-UI works. OpenBot connects to it, so it has to be reachable from OpenBot's server.":
    "Jeder Agent, der AG-UI spricht, funktioniert. OpenBot verbindet sich mit ihm, er muss also vom Server von OpenBot aus erreichbar sein.",
  "Any message": "Jede Nachricht",
  "Anybody with an address at this domain signs in here. Separate several with commas.":
    "Alle mit einer Adresse in dieser Domain melden sich hier an. Mehrere trennen Sie mit Kommas.",
  "App sources": "App-Quellen",
  "Approval rules": "Freigaberegeln",
  Approvals: "Freigaben",
  Approve: "Freigeben",
  "Apps it can use": "Apps, die er nutzen darf",
  "Apps show up here once an admin turns them on.":
    "Apps erscheinen hier, sobald ein Admin sie einschaltet.",
  "Apps this Bot can read from show up here.":
    "Apps, aus denen dieser Bot lesen kann, erscheinen hier.",
  "Apps you connected that this Bot can read show up here, and you can add more. Sources refresh every 15 minutes. Only this Bot sees what they hold.":
    "Apps, die Sie verbunden haben und aus denen dieser Bot lesen kann, erscheinen hier, und Sie können weitere hinzufügen. Quellen werden alle 15 Minuten aktualisiert. Nur dieser Bot sieht ihren Inhalt.",
  "As the person asking, through their Microsoft sign-in. There is no token to paste.":
    "Als die fragende Person, über deren Microsoft-Anmeldung. Es gibt kein Token einzufügen.",
  "Ask a Bot to create or change a scheduled routine. You can review and stop routines here.":
    "Bitten Sie einen Bot, eine geplante Routine zu erstellen oder zu ändern. Hier können Sie Routinen prüfen und anhalten.",
  "Ask anything": "Fragen Sie, was Sie möchten",
  "Ask before making changes": "Vor Änderungen nachfragen",
  "Ask every time": "Jedes Mal nachfragen",
  "Ask it to open a page and watch it work.":
    "Bitten Sie ihn, eine Seite zu öffnen, und sehen Sie ihm bei der Arbeit zu.",
  "Asked:": "Angefragt:",
  "Asking another Bot…": "Fragt einen anderen Bot …",
  Assign: "Zuweisen",
  "Assign to a group": "Einer Gruppe zuweisen",
  "Assign to groups": "Gruppen zuweisen",
  "At the top of your Bots list. Only your list changes.":
    "Oben in Ihrer Bot-Liste. Nur Ihre Liste ändert sich.",
  "Attach a file": "Datei anhängen",
  Attachment: "Anhang",
  Attachments: "Anhänge",
  Audience: "Zielgruppe",
  Audit: "Audit",
  "Auto-review": "Automatische Prüfung",
  "Automatic learning": "Automatisches Lernen",
  "Available to": "Verfügbar für",
  Back: "Zurück",
  "Back to app": "Zurück zur App",
  "Back to components": "Zurück zu den Komponenten",
  "Before a Bot acts": "Bevor ein Bot handelt",
  "Before a Bot does something that could affect your accounts or share information, OpenBot checks it against your request and your rules. If it can't tell, it asks you.":
    "Bevor ein Bot etwas tut, das Ihre Konten betreffen oder Informationen weitergeben könnte, prüft OpenBot es gegen Ihre Anfrage und Ihre Regeln. Wenn es sich nicht entscheiden kann, fragt es Sie.",
  Behaviour: "Verhalten",
  Blocked: "Blockiert",
  "Bot not found": "Bot nicht gefunden",
  "Bot owners can give it to their Bots":
    "Bot-Besitzer können es ihren Bots geben",
  "Bot owners who give it to their Bots let those Bots use the team account.":
    "Bot-Besitzer, die es ihren Bots geben, lassen diese Bots das Teamkonto nutzen.",
  "Bot paused": "Bot pausiert",
  Bots: "Bots",
  "Bots can answer with it.": "Bots können damit antworten.",
  "Bots can be given its tools. Turning this off removes it and every Bot's access to its tools.":
    "Bots können seine Werkzeuge bekommen. Ausschalten entfernt es und den Zugriff jedes Bots auf seine Werkzeuge.",
  "Bots can do anything their own permissions allow.":
    "Bots dürfen alles, was ihre eigenen Berechtigungen erlauben.",
  "Bots can do this again from their next action.":
    "Bots können das ab ihrer nächsten Aktion wieder tun.",
  "Bots check in for everybody.": "Bots fragen für alle nach.",
  "Bots check the apps people connected and tell them when something needs them, at most once an hour. They never act without asking.":
    "Bots prüfen die Apps, die Personen verbunden haben, und sagen Bescheid, wenn etwas sie braucht, höchstens einmal pro Stunde. Sie handeln nie, ohne zu fragen.",
  "Bots it can ask": "Bots, die er fragen darf",
  "Bots may never": "Bots dürfen nie",
  "Bots somebody shares with you show up here.":
    "Bots, die jemand mit Ihnen teilt, erscheinen hier.",
  "Bots you create show up here.": "Bots, die Sie erstellen, erscheinen hier.",
  Boundaries: "Grenzen",
  "Boundary at start-up": "Grenze beim Start",
  "Browser notifications": "Browser-Benachrichtigungen",
  Browsers: "Browser",
  "Built in": "Integriert",
  "Built into this deployment. There is no vendor to reach and no credential to keep. A call runs as whoever asked.":
    "In diese Installation eingebaut. Es gibt keinen Anbieter zu erreichen und keine Zugangsdaten zu verwahren. Ein Aufruf läuft als die fragende Person.",
  "By Bot": "Nach Bot",
  "Call duration": "Anrufdauer",
  "Call settings": "Anrufeinstellungen",
  "Call this Bot": "Diesen Bot anrufen",
  "Call unavailable": "Anruf nicht verfügbar",
  "Called as": "Aufgerufen als",
  "Called on this Bot's behalf": "Im Namen dieses Bots aufgerufen",
  "Can call this tool. Every call is still checked against boundaries and logged in Audit.":
    "Darf dieses Werkzeug aufrufen. Jeder Aufruf wird weiterhin gegen die Grenzen geprüft und im Audit protokolliert.",
  "Can no longer read this": "Darf dies nicht mehr lesen",
  "Can read": "Darf lesen",
  "Can read this": "Darf dies lesen",
  "Can't call this tool. The Bot never sees it.":
    "Darf dieses Werkzeug nicht aufrufen. Der Bot sieht es nie.",
  "Can't hand off work": "Kann keine Arbeit übergeben",
  Cancel: "Abbrechen",
  "Cancel dictation": "Diktat abbrechen",
  Capabilities: "Fähigkeiten",
  "Change how {name} looks for you, on every device. Every skin keeps everything {name} does.":
    "Ändern Sie, wie {name} für Sie aussieht, auf jedem Gerät. Jeder Skin behält alles, was {name} kann.",
  "Changes things": "Ändert etwas",
  "Check the source settings.": "Prüfen Sie die Einstellungen der Quelle.",
  "Check this field and try again.":
    "Prüfen Sie dieses Feld und versuchen Sie es erneut.",
  "Check-ins": "Rückfragen",
  "Check-ins a day per Bot, for each person":
    "Rückfragen pro Tag und Bot, für jede Person",
  "Check-ins are off": "Rückfragen sind ausgeschaltet",
  "Checking now": "Prüft gerade",
  "Choose Save to Passwords when you sign a Bot in to a website.":
    "Wählen Sie „In Passwörtern speichern“, wenn Sie einen Bot auf einer Website anmelden.",
  "Choose a Bot": "Bot auswählen",
  "Choose a Bot…": "Bot auswählen …",
  "Choose a conversation": "Unterhaltung auswählen",
  "Choose a value": "Wert auswählen",
  "Choose folder": "Ordner wählen",
  "Choose folders a Bot can read on this computer. The desktop app asks before each edit or command. Access ends when you stop OpenBot.":
    "Wählen Sie Ordner, die ein Bot auf diesem Computer lesen darf. Die Desktop-App fragt vor jeder Änderung oder jedem Befehl. Der Zugriff endet, wenn Sie OpenBot beenden.",
  "Choose the language for menus and messages in this browser.":
    "Wählen Sie die Sprache für Menüs und Meldungen in diesem Browser.",
  "Choose the name OpenBot displays for you.":
    "Wählen Sie den Namen, den OpenBot für Sie anzeigt.",
  "Choose what to read": "Auswählen, was gelesen werden soll",
  "Choose when your Bots ask before they change things. Rules here apply to all of them.":
    "Legen Sie fest, wann Ihre Bots vor Änderungen nachfragen. Regeln hier gelten für alle.",
  "Choose which Bots this Bot can ask for help. Their answers appear in the same conversation under their own names. This does not change who can ask this Bot for help.":
    "Wählen Sie, welche Bots dieser Bot um Hilfe bitten darf. Ihre Antworten erscheinen in derselben Unterhaltung unter ihrem eigenen Namen. Wer diesen Bot um Hilfe bitten darf, ändert sich dadurch nicht.",
  "Choose which actions require approval for members’ Bots.":
    "Legen Sie fest, welche Aktionen für die Bots der Mitglieder eine Freigabe brauchen.",
  "Choose which actions this Bot can take without your approval.":
    "Legen Sie fest, welche Aktionen dieser Bot ohne Ihre Freigabe ausführen darf.",
  "Choose which apps this Bot learns from and manage its check-ins.":
    "Legen Sie fest, aus welchen Apps dieser Bot lernt, und verwalten Sie seine Rückfragen.",
  "Choose which components each Bot can display. Published components are available to all Bots by default. Changes and blocked requests appear in Audit.":
    "Legen Sie fest, welche Komponenten jeder Bot anzeigen kann. Veröffentlichte Komponenten stehen standardmäßig allen Bots zur Verfügung. Änderungen und blockierte Anfragen erscheinen im Audit.",
  "Choose who can use this Bot. Each person’s conversations with it are private.":
    "Legen Sie fest, wer diesen Bot nutzen kann. Die Unterhaltungen jeder Person mit ihm sind privat.",
  "Chosen by skill": "Durch Fähigkeit gewählt",
  "Clear filter": "Filter zurücksetzen",
  "Clicked on page": "Auf der Seite geklickt",
  "Client ID": "Client-ID",
  "Client secret": "Client-Geheimnis",
  Close: "Schließen",
  "Comes with OpenBot, so it runs on the computer of whoever is using it.":
    "Gehört zu OpenBot und läuft deshalb auf dem Computer der Person, die ihn nutzt.",
  "Comes with OpenBot. It doesn't belong to a person.":
    "Gehört zu OpenBot. Er gehört keiner Person.",
  "Comma separated": "Durch Kommas getrennt",
  "Commands on members' computers, at most":
    "Befehle auf den Computern der Mitglieder, höchstens",
  "Commands on your computer": "Befehle auf Ihrem Computer",
  Complete: "Abschließen",
  Completed: "Abgeschlossen",
  Components: "Komponenten",
  "Components gallery": "Komponenten-Galerie",
  "Components your Bots can use will show here.":
    "Komponenten, die Ihre Bots nutzen können, erscheinen hier.",
  Computer: "Computer",
  "Computer actions": "Computeraktionen",
  Computers: "Computer",
  "Computers in this deployment": "Computer in dieser Installation",
  Configuration: "Konfiguration",
  "Configuration changed": "Konfiguration geändert",
  "Configure roles, groups, SSO, SCIM, Skill sharing, network policies, allowlists, and Action Recording.":
    "Richten Sie Rollen, Gruppen, SSO, SCIM, das Teilen von Fähigkeiten, Netzwerkrichtlinien, Zulassungslisten und die Aktionsaufzeichnung ein.",
  "Configure the apps, skills, and UI components available to Bots.":
    "Richten Sie die Apps, Fähigkeiten und UI-Komponenten ein, die Bots zur Verfügung stehen.",
  "Configure your company’s SAML or OpenID Connect provider. Email domains determine which provider people use to sign in.":
    "Richten Sie den SAML- oder OpenID-Connect-Anbieter Ihres Unternehmens ein. Die E-Mail-Domain bestimmt, welchen Anbieter Personen zur Anmeldung nutzen.",
  "Configure your company’s sign-in provider for each email domain.":
    "Richten Sie den Anmeldeanbieter Ihres Unternehmens für jede E-Mail-Domain ein.",
  Confirm: "Bestätigen",
  "Confirm and sign in": "Bestätigen und anmelden",
  Connect: "Verbinden",
  "Connect a custom agent": "Eigenen Agenten verbinden",
  "Connect an app to let your Bots use it.":
    "Verbinden Sie eine App, damit Ihre Bots sie nutzen können.",
  "Connect services and choose which Bots can use them.":
    "Verbinden Sie Dienste und legen Sie fest, welche Bots sie nutzen können.",
  "Connect services for your company, then choose which Bots can use each service’s tools.":
    "Verbinden Sie Dienste für Ihr Unternehmen und legen Sie dann fest, welche Bots die Werkzeuge jedes Dienstes nutzen können.",
  "Connect your accounts so Bots can use apps on your behalf.":
    "Verbinden Sie Ihre Konten, damit Bots Apps in Ihrem Namen nutzen können.",
  "Connect your own account to try this connector. Setup is complete without it, and it reaches your documents only.":
    "Verbinden Sie Ihr eigenes Konto, um diesen Konnektor auszuprobieren. Die Einrichtung ist auch ohne abgeschlossen, und er erreicht nur Ihre Dokumente.",
  Connected: "Verbunden",
  "Connected app": "Verbundene App",
  Connection: "Verbindung",
  Connections: "Verbindungen",
  Connector: "Konnektor",
  Continue: "Weiter",
  "Continue a conversation with this Bot in Slack, Microsoft Teams, or by text message.":
    "Setzen Sie eine Unterhaltung mit diesem Bot in Slack, Microsoft Teams oder per SMS fort.",
  "Control went back to the Bot": "Die Kontrolle ging zurück an den Bot",
  "Control what Bots can access outside OpenBot.":
    "Steuern Sie, worauf Bots außerhalb von OpenBot zugreifen dürfen.",
  "Control where Bot computers can connect. Changes apply within seconds without a restart. Group policies override the organization’s policy unless it is locked.":
    "Steuern Sie, wohin sich Bot-Computer verbinden dürfen. Änderungen gelten innerhalb von Sekunden ohne Neustart. Gruppenrichtlinien überschreiben die der Organisation, sofern diese nicht gesperrt ist.",
  Conversation: "Unterhaltung",
  "Conversation deleted": "Unterhaltung gelöscht",
  "Conversation gone": "Unterhaltung weg",
  "Copy URL": "URL kopieren",
  "Copy address": "Adresse kopieren",
  "Copy header": "Header kopieren",
  "Copy key": "Schlüssel kopieren",
  "Copy link": "Link kopieren",
  "Copy this key now. You won't see it again.":
    "Kopieren Sie diesen Schlüssel jetzt. Sie sehen ihn nicht noch einmal.",
  "Could not add the trigger": "Der Auslöser konnte nicht hinzugefügt werden",
  "Could not add this source": "Diese Quelle konnte nicht hinzugefügt werden",
  "Could not change responsibility":
    "Die Zuständigkeit konnte nicht geändert werden",
  "Could not change the trigger": "Der Auslöser konnte nicht geändert werden",
  "Could not change the trigger secret":
    "Das Geheimnis des Auslösers konnte nicht geändert werden",
  "Could not change this source": "Diese Quelle konnte nicht geändert werden",
  "Could not connect GitHub events":
    "GitHub-Ereignisse konnten nicht verbunden werden",
  "Could not create responsibility":
    "Die Zuständigkeit konnte nicht erstellt werden",
  "Could not delete that password":
    "Dieses Passwort konnte nicht gelöscht werden",
  "Could not disconnect GitHub events":
    "GitHub-Ereignisse konnten nicht getrennt werden",
  "Could not forget this memory":
    "Diese Erinnerung konnte nicht vergessen werden",
  "Could not load GitHub event sources":
    "Die GitHub-Ereignisquellen konnten nicht geladen werden",
  "Could not load audit events":
    "Die Audit-Ereignisse konnten nicht geladen werden",
  "Could not load connected app actions":
    "Die Aktionen der verbundenen Apps konnten nicht geladen werden",
  "Could not load memory": "Das Gedächtnis konnte nicht geladen werden",
  "Could not load memory sources":
    "Die Gedächtnisquellen konnten nicht geladen werden",
  "Could not load responsibilities":
    "Die Zuständigkeiten konnten nicht geladen werden",
  "Could not load responsibility runs":
    "Die Läufe der Zuständigkeit konnten nicht geladen werden",
  "Could not load this sign-in request":
    "Diese Anmeldeanfrage konnte nicht geladen werden",
  "Could not load triggers": "Die Auslöser konnten nicht geladen werden",
  "Could not load your passwords":
    "Ihre Passwörter konnten nicht geladen werden",
  "Could not load your sign-in requests":
    "Ihre Anmeldeanfragen konnten nicht geladen werden",
  "Could not read the trigger secret":
    "Das Geheimnis des Auslösers konnte nicht gelesen werden",
  "Could not remember this fact": "Das konnte nicht gemerkt werden",
  "Could not remove the trigger": "Der Auslöser konnte nicht entfernt werden",
  "Could not update memory": "Die Erinnerung konnte nicht aktualisiert werden",
  "Could not update responsibility":
    "Die Zuständigkeit konnte nicht aktualisiert werden",
  "Couldn't check what a reset would delete. Try again.":
    "Es konnte nicht geprüft werden, was ein Zurücksetzen löschen würde. Versuchen Sie es erneut.",
  "Couldn't check whether each app is ready for you. Reload the page.":
    "Es konnte nicht geprüft werden, ob jede App für Sie bereit ist. Laden Sie die Seite neu.",
  "Couldn't choose, so all were offered":
    "Auswahl nicht möglich, deshalb wurden alle angeboten",
  "Couldn't confirm which Bot it was":
    "Es ließ sich nicht bestätigen, welcher Bot es war",
  "Couldn't connect that account. Nothing was saved. Try again.":
    "Das Konto konnte nicht verbunden werden. Es wurde nichts gespeichert. Versuchen Sie es erneut.",
  "Couldn't find that Bot.": "Dieser Bot wurde nicht gefunden.",
  "Couldn't finish this step.":
    "Dieser Schritt konnte nicht abgeschlossen werden.",
  "Couldn't finish.": "Konnte nicht abgeschlossen werden.",
  "Couldn't load GitHub and Slack, so they aren't listed. Reload the page.":
    "GitHub und Slack konnten nicht geladen werden und fehlen deshalb in der Liste. Laden Sie die Seite neu.",
  "Couldn't load check-in activity. Reload the page.":
    "Die Aktivität der Rückfragen konnte nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load check-in settings. Reload the page.":
    "Die Einstellungen für Rückfragen konnten nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load components. Reload the page.":
    "Die Komponenten konnten nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load credentials. Reload the page.":
    "Die Zugangsdaten konnten nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load earlier messages. The Bot is answering without them.":
    "Frühere Nachrichten konnten nicht geladen werden. Der Bot antwortet ohne sie.",
  "Couldn't load earlier messages. You can keep using this conversation.":
    "Frühere Nachrichten konnten nicht geladen werden. Sie können die Unterhaltung trotzdem weiter nutzen.",
  "Couldn't load enterprise controls. Reload the page.":
    "Die Unternehmenssteuerung konnte nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load identity providers. Reload the page.":
    "Die Identitätsanbieter konnten nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load model usage. Reload the page.":
    "Die Modellnutzung konnte nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load people. Reload the page.":
    "Die Personen konnten nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load plugins. Reload the page.":
    "Die Plugins konnten nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load recorded actions. Reload the page.":
    "Die aufgezeichneten Aktionen konnten nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load skills. Reload the page.":
    "Die Fähigkeiten konnten nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load that Bot. Reload the page.":
    "Dieser Bot konnte nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load the audit log. Reload the page.":
    "Das Audit-Protokoll konnte nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load the computers. Reload the page.":
    "Die Computer konnten nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load the list": "Die Liste konnte nicht geladen werden",
  "Couldn't load the plugin settings. Reload the page.":
    "Die Plugin-Einstellungen konnten nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load this Bot's activity.":
    "Die Aktivität dieses Bots konnte nicht geladen werden.",
  "Couldn't load this Bot's activity. Reload the page.":
    "Die Aktivität dieses Bots konnte nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load this Bot's settings. Reload the page.":
    "Die Einstellungen dieses Bots konnten nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load this Bot.": "Dieser Bot konnte nicht geladen werden.",
  "Couldn't load this Bot. Reload the page.":
    "Dieser Bot konnte nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load this conversation. Reload the page.":
    "Diese Unterhaltung konnte nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load what this Bot can use. Reload the page.":
    "Es konnte nicht geladen werden, was dieser Bot nutzen kann. Laden Sie die Seite neu.",
  "Couldn't load whether you've connected an account here. Reload the page, or check this deployment's logs if it keeps happening.":
    "Es konnte nicht geladen werden, ob Sie hier ein Konto verbunden haben. Laden Sie die Seite neu oder prüfen Sie die Protokolle dieser Installation, falls das Problem bleibt.",
  "Couldn't load your Bots. Reload the page.":
    "Ihre Bots konnten nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load your apps. Reload the page.":
    "Ihre Apps konnten nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load your connections. Reload the page, or ask an admin if it keeps happening.":
    "Ihre Verbindungen konnten nicht geladen werden. Laden Sie die Seite neu oder fragen Sie Ihren Admin, falls das Problem bleibt.",
  "Couldn't load your passwords. Reload the page.":
    "Ihre Passwörter konnten nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load your routines. Reload the page.":
    "Ihre Routinen konnten nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't load your skills. Reload the page.":
    "Ihre Fähigkeiten konnten nicht geladen werden. Laden Sie die Seite neu.",
  "Couldn't open this Bot. It may not be shared with you.":
    "Dieser Bot konnte nicht geöffnet werden. Möglicherweise ist er nicht mit Ihnen geteilt.",
  "Couldn't read it": "Konnte nicht gelesen werden",
  "Couldn't save the credential. Try again.":
    "Die Zugangsdaten konnten nicht gespeichert werden. Versuchen Sie es erneut.",
  "Couldn't save. Try again.":
    "Konnte nicht gespeichert werden. Versuchen Sie es erneut.",
  "Couldn't show": "Konnte nicht angezeigt werden",
  "Couldn't start the conversation. Try again.":
    "Die Unterhaltung konnte nicht gestartet werden. Versuchen Sie es erneut.",
  "Couldn't start the group. Try again.":
    "Die Gruppe konnte nicht gestartet werden. Versuchen Sie es erneut.",
  "Couldn’t bring in what was said on the call. You may need to repeat it.":
    "Das Gesagte aus dem Anruf konnte nicht übernommen werden. Möglicherweise müssen Sie es wiederholen.",
  "Couldn’t confirm this voice chat was saved.":
    "Es konnte nicht bestätigt werden, dass dieser Sprachchat gespeichert wurde.",
  "Couldn’t load voice chats. Reload the page.":
    "Sprachchats konnten nicht geladen werden. Laden Sie die Seite neu.",
  "Create Bot": "Bot erstellen",
  "Create a Bot": "Bot erstellen",
  "Create a new Bot": "Neuen Bot erstellen",
  "Create it": "Erstellen",
  "Create one to give it this tool.":
    "Erstellen Sie einen, um ihm dieses Werkzeug zu geben.",
  "Create one, then choose its folders.":
    "Erstellen Sie einen und wählen Sie dann seine Ordner.",
  "Create responsibility": "Zuständigkeit erstellen",
  "Create reusable instructions people can run with /.":
    "Erstellen Sie wiederverwendbare Anweisungen, die Personen mit / ausführen können.",
  "Create reusable instructions people can run with /. Skills use a Bot’s existing permissions and do not grant additional access.":
    "Erstellen Sie wiederverwendbare Anweisungen, die Personen mit / ausführen können. Fähigkeiten nutzen die vorhandenen Berechtigungen eines Bots und geben keinen zusätzlichen Zugriff.",
  "Credential saved": "Zugangsdaten gespeichert",
  Credentials: "Zugangsdaten",
  "Customize OpenBot’s appearance and message display. Your skin and message settings apply to your account; the theme applies only to this browser.":
    "Passen Sie Aussehen und Nachrichtenanzeige an. Skin und Nachrichteneinstellungen gelten für Ihr Konto, das Farbschema nur für diesen Browser.",
  "Daily limit": "Tageslimit",
  "Dark theme": "Dunkles Farbschema",
  "Days without use": "Tage ohne Nutzung",
  Decline: "Ablehnen",
  "Defaults plus team allowlist": "Standard plus Zulassungsliste des Teams",
  "Define actions that Bots must never take. OpenBot checks these rules before a Bot acts on its computer or in a connected app.":
    "Legen Sie Aktionen fest, die Bots nie ausführen dürfen. OpenBot prüft diese Regeln, bevor ein Bot auf seinem Computer oder in einer verbundenen App handelt.",
  "Define actions that no Bot may take.":
    "Legen Sie Aktionen fest, die kein Bot ausführen darf.",
  "Define an action that no Bot may take. This boundary applies to every Bot’s next action.":
    "Legen Sie eine Aktion fest, die kein Bot ausführen darf. Diese Grenze gilt für die nächste Aktion jedes Bots.",
  "Delegated task": "Delegierte Aufgabe",
  Delete: "Löschen",
  "Delete and reset": "Löschen und zurücksetzen",
  "Delete conversation…": "Unterhaltung löschen …",
  "Delete it": "Löschen",
  "Delete your conversations with it, what it remembers for you, and its scheduled work. You'll see the list first.":
    "Löschen Sie Ihre Unterhaltungen mit ihm, was er sich für Sie merkt, und seine geplante Arbeit. Sie sehen vorher die Liste.",
  "Deletes it for everyone. You can't undo this.":
    "Löscht ihn für alle. Das lässt sich nicht rückgängig machen.",
  "Delete…": "Löschen …",
  "Describe the action yourself, in CEL.":
    "Beschreiben Sie die Aktion selbst, in CEL.",
  "Describe this component and choose which Bots can display it.":
    "Beschreiben Sie diese Komponente und legen Sie fest, welche Bots sie anzeigen können.",
  Description: "Beschreibung",
  Details: "Details",
  "Dictate a message": "Nachricht diktieren",
  "Dictation needs a supported browser and a secure (HTTPS) connection":
    "Diktieren braucht einen unterstützten Browser und eine sichere Verbindung (HTTPS)",
  "Did not happen": "Nicht passiert",
  "Didn't finish": "Nicht fertig geworden",
  "Didn't work": "Hat nicht funktioniert",
  "Dismiss this refusal": "Diese Ablehnung ausblenden",
  "Don't create": "Nicht erstellen",
  "Don't do it": "Nicht ausführen",
  "Done.": "Fertig.",
  "Draft saved, not yet published":
    "Entwurf gespeichert, noch nicht veröffentlicht",
  "Draft saved.": "Entwurf gespeichert.",
  Duplicate: "Duplizieren",
  "Each Bot has its own browser and files":
    "Jeder Bot hat einen eigenen Browser und eigene Dateien",
  "Each grant is its own row in Audit. Tools that change things are still checked against the boundaries on every call.":
    "Jede Gewährung ist eine eigene Zeile im Audit. Werkzeuge, die etwas ändern, werden bei jedem Aufruf weiterhin gegen die Grenzen geprüft.",
  "Each one folds a person's waiting items from every Bot into one message.":
    "Jeder fasst die wartenden Punkte einer Person aus allen Bots in einer Nachricht zusammen.",
  "Each person connects their own.": "Jede Person verbindet ihr eigenes.",
  "Each person has their own computer, and every Bot they use runs on it, public Bots made by other people included. Each Bot keeps its own browser profile and folder there, but a command one Bot runs can reach anything else on that person's computer. An isolated Bot has a computer of its own.":
    "Jede Person hat einen eigenen Computer, und jeder Bot, den sie nutzt, läuft darauf, auch öffentliche Bots anderer Personen. Jeder Bot behält dort sein eigenes Browserprofil und seinen eigenen Ordner, aber ein Befehl eines Bots kann alles andere auf dem Computer dieser Person erreichen. Ein isolierter Bot hat einen eigenen Computer.",
  "Each person's computer, and each isolated Bot's. Every Bot keeps its own browser profile on it, which keeps that Bot signed in. Resetting a computer signs every Bot on it out of everything.":
    "Der Computer jeder Person und der jedes isolierten Bots. Jeder Bot behält darauf sein eigenes Browserprofil, wodurch er angemeldet bleibt. Beim Zurücksetzen eines Computers wird jeder Bot darauf überall abgemeldet.",
  "Each person's conversations with it are private.":
    "Die Unterhaltungen jeder Person mit ihm sind privat.",
  "Each person's recordings teach Skills in their own Learning space, and those Skills reach the Bots that person uses. A shared Skill puts its person's recorded and narrated text in front of everybody's Bots.":
    "Die Aufzeichnungen jeder Person erzeugen Fähigkeiten in ihrem eigenen Lernbereich, und diese Fähigkeiten erreichen die Bots, die die Person nutzt. Eine geteilte Fähigkeit legt den aufgezeichneten und gesprochenen Text der Person den Bots aller vor.",
  "Each switch applies to the whole organization. A role can override it, and a directory group can get a capability the organization has off.":
    "Jeder Schalter gilt für die ganze Organisation. Eine Rolle kann ihn überschreiben, und eine Verzeichnisgruppe kann eine Fähigkeit erhalten, die die Organisation ausgeschaltet hat.",
  Edit: "Bearbeiten",
  "Edit memory": "Erinnerung bearbeiten",
  "Edit the panels on the left and this redraws.":
    "Bearbeiten Sie die Felder links, dann wird dies neu gezeichnet.",
  "Edit this Bot’s profile, visibility, and runtime settings.":
    "Bearbeiten Sie Profil, Sichtbarkeit und Laufzeiteinstellungen dieses Bots.",
  "Edited a file": "Datei bearbeitet",
  Effect: "Wirkung",
  "Egress not reported": "Ausgehender Verkehr nicht gemeldet",
  "Email domain": "E-Mail-Domain",
  "Email isn't set up on OpenBot yet, so this address can't receive mail. An admin has to turn it on.":
    "E-Mail ist in OpenBot noch nicht eingerichtet, deshalb kann diese Adresse keine Nachrichten empfangen. Ein Admin muss sie einschalten.",
  "Enable for this deployment": "Für diese Installation einschalten",
  "End call": "Anruf beenden",
  "End voice call": "Sprachanruf beenden",
  "Enter it on": "Geben Sie ihn ein auf",
  "Enter it on {title}'s page": "Geben Sie ihn auf der Seite von {title} ein",
  "Enter one model per line as provider/model, for example openai/gpt-5.6-terra.":
    "Geben Sie ein Modell pro Zeile ein, als Anbieter/Modell, zum Beispiel openai/gpt-5.6-terra.",
  "Enter the verification code": "Bestätigungscode eingeben",
  "Enter your agent's address.": "Geben Sie die Adresse Ihres Agenten ein.",
  "Enter your login": "Anmeldedaten eingeben",
  "Enterprise controls": "Unternehmenssteuerung",
  "Event source": "Ereignisquelle",
  "Event type": "Ereignistyp",
  "Event types": "Ereignistypen",
  Events: "Ereignisse",
  "Events come from the repositories you connected in":
    "Ereignisse kommen aus den Repositories, die Sie verbunden haben unter",
  "Every 4 hours": "Alle 4 Stunden",
  "Every Bot can do this again from its next action.":
    "Jeder Bot kann das ab seiner nächsten Aktion wieder tun.",
  "Every Bot's profile on this person's computer is deleted. Each is signed out of every service and starts clean.":
    "Das Profil jedes Bots auf dem Computer dieser Person wird gelöscht. Jeder wird überall abgemeldet und beginnt neu.",
  "Every hour": "Jede Stunde",
  "Every person's Bots run on one computer.":
    "Die Bots aller Personen laufen auf einem Computer.",
  "Every plugin in the catalogue is connected.":
    "Jedes Plugin im Katalog ist verbunden.",
  "Every tool": "Jedes Werkzeug",
  "Everyone here sees the whole conversation. Every Bot in it answers them.":
    "Alle hier sehen die ganze Unterhaltung. Jeder Bot darin antwortet ihnen.",
  "Everyone in your company can find and use it.":
    "Alle in Ihrem Unternehmen können ihn finden und nutzen.",
  "Everyone on OpenBot can find and use it.":
    "Alle in OpenBot können ihn finden und nutzen.",
  Everything: "Alles",
  "Everything else": "Alles andere",
  "Expand call": "Anruf vergrößern",
  "Expand voice call": "Sprachanruf vergrößern",
  "Explore plugins": "Plugins entdecken",
  "Export CSV": "CSV exportieren",
  "Exporting over OTLP/HTTP.": "Export über OTLP/HTTP.",
  Failed: "Fehlgeschlagen",
  "Few enough tools to offer them all":
    "So wenige Werkzeuge, dass alle angeboten wurden",
  "Filled in field": "Feld ausgefüllt",
  "Finish in the tab that opened, then come back here.":
    "Schließen Sie den Vorgang im geöffneten Tab ab und kehren Sie dann hierher zurück.",
  "Finish signing in": "Anmeldung abschließen",
  "Fire on": "Auslösen bei",
  "Fix the JSON fields before previewing.":
    "Korrigieren Sie die JSON-Felder vor der Vorschau.",
  "Fix the JSON fields before saving.":
    "Korrigieren Sie die JSON-Felder vor dem Speichern.",
  "Folders are read-only. When a Bot needs to write, the desktop app asks you first.":
    "Ordner sind schreibgeschützt. Wenn ein Bot schreiben muss, fragt Sie die Desktop-App zuerst.",
  "Folders on this computer": "Ordner auf diesem Computer",
  "For you": "Für Sie",
  Forget: "Vergessen",
  "Formed by {name}": "Gebildet von {name}",
  "From the vendor's console. The secret is saved in this deployment's vault and never shown again.":
    "Aus der Konsole des Anbieters. Das Geheimnis wird im Tresor dieser Installation gespeichert und nie wieder angezeigt.",
  "From {source}": "Aus {source}",
  General: "Allgemein",
  "Generate key": "Schlüssel erzeugen",
  "Get started": "Los geht’s",
  "Given but no longer listed": "Gewährt, aber nicht mehr aufgeführt",
  Goals: "Ziele",
  "Google, Microsoft and Okta are set in the environment. They don't show here.":
    "Google, Microsoft und Okta werden in der Umgebung gesetzt. Sie erscheinen hier nicht.",
  "Grant tools": "Werkzeuge gewähren",
  "Grant tools…": "Werkzeuge gewähren …",
  "Granted to this Bot": "Diesem Bot gewährt",
  Group: "Gruppe",
  "Group network policy": "Netzwerkrichtlinie der Gruppe",
  "Group, or *": "Gruppe oder *",
  "Group:": "Gruppe:",
  Groups: "Gruppen",
  "Hand off tasks to your team of Bots":
    "Geben Sie Aufgaben an Ihr Team aus Bots ab",
  "Handed on": "Weitergegeben",
  "Handed to you:": "An Sie übergeben:",
  "Handoffs are off": "Übergaben sind ausgeschaltet",
  "Hasn't run yet": "Noch nicht gelaufen",
  Hidden: "Ausgeblendet",
  "Hidden from your roster.": "In Ihrer Liste ausgeblendet.",
  "Hidden from your roster. Turn this app's actions on or off one at a time.":
    "In Ihrer Liste ausgeblendet. Schalten Sie die Aktionen dieser App einzeln ein oder aus.",
  "Hide runs": "Läufe ausblenden",
  History: "Verlauf",
  "How often": "Wie oft",
  "How rules apply": "Wie Regeln gelten",
  "How this is reached": "Wie dies erreicht wird",
  "I did it myself": "Habe ich selbst erledigt",
  "I prefer meetings in the morning.":
    "Ich bevorzuge Besprechungen am Vormittag.",
  "I've signed in": "Ich habe mich angemeldet",
  "Identifies this deployment to the vendor. On its own, it can't reach anyone's documents.":
    "Identifiziert diese Installation gegenüber dem Anbieter. Für sich allein erreicht es keine Dokumente.",
  Identity: "Identität",
  "Identity providers": "Identitätsanbieter",
  "If you lose it, make a new one.":
    "Wenn Sie ihn verlieren, erzeugen Sie einen neuen.",
  "Imported · needs review": "Importiert · muss geprüft werden",
  "In Audit, choose Blocked to see every action a rule stopped and which rule it was.":
    "Wählen Sie im Audit „Blockiert“, um jede von einer Regel gestoppte Aktion und die Regel zu sehen.",
  "In Linear, Settings → API → Webhooks: set the URL, then paste the signing secret Linear shows here.":
    "In Linear unter Einstellungen → API → Webhooks: URL eintragen und dann das von Linear angezeigte Signaturgeheimnis hier einfügen.",
  "In PagerDuty, Integrations → Generic Webhooks (v3): set the URL, then paste the secret shown on creation here.":
    "In PagerDuty unter Integrations → Generic Webhooks (v3): URL eintragen und dann das beim Erstellen angezeigte Geheimnis hier einfügen.",
  "In a Sentry internal integration, set the webhook URL, then paste the integration's client secret here.":
    "In einer internen Sentry-Integration: Webhook-URL eintragen und dann das Client-Geheimnis der Integration hier einfügen.",
  "In progress": "In Arbeit",
  "In the repository's Settings → Webhooks, set the payload URL to this URL, content type application/json, and the secret to the key.":
    "Tragen Sie in den Repository-Einstellungen unter Webhooks diese URL als Payload-URL ein, als Inhaltstyp application/json und den Schlüssel als Geheimnis.",
  Inherit: "Erben",
  "Inspected page": "Seite untersucht",
  "Install skill": "Fähigkeit installieren",
  Installed: "Installiert",
  "Instance host": "Instanz-Host",
  Instruction: "Anweisung",
  Instructions: "Anweisungen",
  Isolated: "Isoliert",
  "Isolated: a computer of its own, shared by everyone who uses it":
    "Isoliert: ein eigener Computer, geteilt von allen, die ihn nutzen",
  "Isolation at start-up": "Isolation beim Start",
  Issuer: "Aussteller",
  "It always uses the account of whoever is asking.":
    "Er nutzt immer das Konto der Person, die ihn fragt.",
  "It disappears for everyone in the conversation.":
    "Sie verschwindet für alle in der Unterhaltung.",
  "It may have been deleted after you opened this page.":
    "Möglicherweise wurde es gelöscht, nachdem Sie diese Seite geöffnet haben.",
  "It may have been removed since the tool list was last refreshed.":
    "Möglicherweise wurde es entfernt, seit die Werkzeugliste zuletzt aktualisiert wurde.",
  "It may have been renamed, or this deployment no longer ships it.":
    "Möglicherweise wurde sie umbenannt, oder diese Installation liefert sie nicht mehr mit.",
  "It moves to the computer image this deployment now runs. Its files and sign-ins are kept. If it's running, it restarts and stops what it's doing.":
    "Er wechselt auf das Computer-Image, das diese Installation jetzt nutzt. Seine Dateien und Anmeldungen bleiben erhalten. Läuft er gerade, startet er neu und beendet, was er tut.",
  "It reads the apps it can use in this conversation and tells you when something needs you.":
    "Er liest die Apps, die er in dieser Unterhaltung nutzen darf, und sagt Ihnen Bescheid, wenn etwas Sie braucht.",
  "It runs on your machine": "Es läuft auf Ihrem Rechner",
  "It starts private, with no apps. Apps are added on its page afterwards.":
    "Er startet privat und ohne Apps. Apps fügen Sie danach auf seiner Seite hinzu.",
  "It stopped before this step, so you're asked about it in this conversation instead.":
    "Er hat vor diesem Schritt angehalten, deshalb werden Sie stattdessen in dieser Unterhaltung gefragt.",
  "It was given the app's actions.":
    "Ihm wurden die Aktionen der App übertragen.",
  "It's deleted for everyone. You can't undo this.":
    "Er wird für alle gelöscht. Das lässt sich nicht rückgängig machen.",
  "It's pinned at the top of every member's Bots list.":
    "Er ist oben in der Bot-Liste jedes Mitglieds angeheftet.",
  "It's public, so everyone on OpenBot can already use it.":
    "Er ist öffentlich, alle in OpenBot können ihn also bereits nutzen.",
  "It's removed from this deployment, and no Bot can draw it. You can't undo this.":
    "Sie wird aus dieser Installation entfernt, und kein Bot kann sie darstellen. Das lässt sich nicht rückgängig machen.",
  Items: "Punkte",
  "Items raised": "Angesprochene Punkte",
  "Its computer": "Sein Computer",
  "Its events and triggers start it.":
    "Ihre Ereignisse und Auslöser starten sie.",
  "Its instructions. It follows these every time it replies.":
    "Seine Anweisungen. Er befolgt sie bei jeder Antwort.",
  "Its owner added a trigger that lets outside messages steer it.":
    "Sein Besitzer hat einen Auslöser hinzugefügt, über den externe Nachrichten ihn steuern können.",
  "Its owner widened who can reach it.":
    "Sein Besitzer hat erweitert, wer ihn erreichen kann.",
  "Its profile is deleted. The Bot is signed out of every service and starts clean.":
    "Sein Profil wird gelöscht. Der Bot wird überall abgemeldet und beginnt neu.",
  "Keep it at the top of your Bots list. Only your list changes.":
    "Oben in Ihrer Bot-Liste halten. Nur Ihre Liste ändert sich.",
  "Keep the customer report up to date": "Den Kundenbericht aktuell halten",
  "Kept in Intelligence": "In Intelligence gespeichert",
  "Key ID": "Schlüssel-ID",
  "Key for tools": "Schlüssel für Werkzeuge",
  "Keyboard shortcuts": "Tastenkürzel",
  "Keys and tokens for models and connectors are kept here.":
    "Schlüssel und Token für Modelle und Konnektoren liegen hier.",
  "Kind of action": "Art der Aktion",
  Language: "Sprache",
  "Last 30 days": "Letzte 30 Tage",
  "Last 7 days": "Letzte 7 Tage",
  "Last changed": "Zuletzt geändert",
  "Last result": "Letztes Ergebnis",
  "Learn from finished conversations and review the skills it proposes.":
    "Aus abgeschlossenen Unterhaltungen lernen und die vorgeschlagenen Fähigkeiten prüfen.",
  Learning: "Lernen",
  "Leave this group": "Gruppe verlassen",
  "Leaves directly": "Verlässt das Netz direkt",
  "Let members set personal rules": "Mitgliedern eigene Regeln erlauben",
  "Let's get to it.": "Dann legen wir los.",
  "Listening to you": "Hört Ihnen zu",
  "Load more conversations": "Weitere Unterhaltungen laden",
  "Load older conversations to search more of your history.":
    "Laden Sie ältere Unterhaltungen, um mehr von Ihrem Verlauf zu durchsuchen.",
  "Loading this conversation": "Unterhaltung wird geladen",
  "Lock so groups can't replace this policy":
    "Sperren, damit Gruppen diese Richtlinie nicht ersetzen können",
  Locked: "Gesperrt",
  "Looks for:": "Sucht nach:",
  "MCP servers": "MCP-Server",
  "Make a new key": "Neuen Schlüssel erzeugen",
  "Make personal": "Persönlich machen",
  "Make shared": "Gemeinsam machen",
  "Make your own copy. Its conversations and keys aren't copied.":
    "Erstellen Sie Ihre eigene Kopie. Seine Unterhaltungen und Schlüssel werden nicht kopiert.",
  Manage: "Verwalten",
  "Manage access for people who have signed in. Only admins can access the Admin pages.":
    "Verwalten Sie den Zugang von Personen, die sich angemeldet haben. Nur Admins erreichen die Admin-Seiten.",
  "Manage custom components that Bots can display in conversations.":
    "Verwalten Sie eigene Komponenten, die Bots in Unterhaltungen anzeigen können.",
  "Manage member permissions, network access for Bot computers, and recording settings. All changes appear in Audit.":
    "Verwalten Sie Berechtigungen der Mitglieder, den Netzwerkzugang der Bot-Computer und Aufzeichnungseinstellungen. Alle Änderungen erscheinen im Audit.",
  "Manage saved website logins. Bots cannot see your passwords, and you approve each use.":
    "Verwalten Sie gespeicherte Website-Anmeldungen. Bots können Ihre Passwörter nicht sehen, und Sie geben jede Nutzung frei.",
  "Manage settings that apply to everyone and every Bot in this deployment.":
    "Verwalten Sie Einstellungen, die für alle Personen und alle Bots in dieser Installation gelten.",
  "Manage skills shared across this deployment. People can create personal skills on their Skills page.":
    "Verwalten Sie Fähigkeiten, die in dieser Installation geteilt werden. Personen können auf ihrer Seite „Fähigkeiten“ persönliche Fähigkeiten erstellen.",
  "Manage the computers that run Bot tools.":
    "Verwalten Sie die Computer, auf denen die Werkzeuge der Bots laufen.",
  "Manage the skills, apps, and other Bots this Bot can use.":
    "Verwalten Sie die Fähigkeiten, Apps und anderen Bots, die dieser Bot nutzen kann.",
  "Manage this Bot’s scheduled routines. Turn a routine off, run it now, or delete it.":
    "Verwalten Sie die geplanten Routinen dieses Bots. Schalten Sie eine Routine aus, führen Sie sie jetzt aus oder löschen Sie sie.",
  "Manage this deployment’s keys and tokens.":
    "Verwalten Sie die Schlüssel und Token dieser Installation.",
  "Manage this deployment’s keys and tokens. Saved secrets cannot be viewed again.":
    "Verwalten Sie die Schlüssel und Token dieser Installation. Gespeicherte Geheimnisse lassen sich nicht erneut anzeigen.",
  "Manage what your Bots remember about you. Facts you add are shared with all Bots; learned facts stay with the Bot that learned them.":
    "Verwalten Sie, was Ihre Bots über Sie wissen. Fakten, die Sie hinzufügen, gelten für alle Bots. Gelernte Fakten bleiben bei dem Bot, der sie gelernt hat.",
  "Manage your Bots and access those shared with you.":
    "Verwalten Sie Ihre Bots und die Bots, die mit Ihnen geteilt wurden.",
  "Mark it done. Nothing starts it after this.":
    "Als erledigt markieren. Danach startet nichts sie mehr.",
  "Member's machine": "Rechner des Mitglieds",
  Members: "Mitglieder",
  "Memories you told a Bot yourself are kept.":
    "Erinnerungen, die Sie einem Bot selbst mitgeteilt haben, bleiben erhalten.",
  Memory: "Gedächtnis",
  Message: "Nachricht",
  "Metadata XML": "Metadaten-XML",
  "Microsoft Entra": "Microsoft Entra",
  Model: "Modell",
  "Model allowlist": "Zulassungsliste für Modelle",
  Models: "Modelle",
  "More apps": "Weitere Apps",
  "More message options unavailable":
    "Weitere Nachrichtenoptionen sind nicht verfügbar",
  "Mute your microphone": "Mikrofon stummschalten",
  "Mute your microphone · you’ll still hear the Bot":
    "Mikrofon stummschalten · Sie hören den Bot weiterhin",
  "My project documents": "Meine Projektdokumente",
  Name: "Name",
  "Needs you": "Braucht Sie",
  "Needs your approval": "Braucht Ihre Freigabe",
  Network: "Netzwerk",
  "Never delete files": "Nie Dateien löschen",
  "New Bot": "Neuer Bot",
  "New chat": "Neuer Chat",
  "New conversation": "Neue Unterhaltung",
  "New responsibility": "Neue Zuständigkeit",
  "New skill": "Neue Fähigkeit",
  "No Bot by that name.": "Kein Bot mit diesem Namen.",
  "No Bot can reach this vendor. Turn it on to set it up and give Bots its tools.":
    "Kein Bot kann diesen Anbieter erreichen. Schalten Sie ihn ein, um ihn einzurichten und Bots seine Werkzeuge zu geben.",
  "No Bot can use it.": "Kein Bot kann sie nutzen.",
  "No Bot runs in the last 30 days.": "Kein Bot-Lauf in den letzten 30 Tagen.",
  "No Bots": "Keine Bots",
  "No Bots found.": "Keine Bots gefunden.",
  "No Bots in this conversation": "Keine Bots in dieser Unterhaltung",
  "No Bots yet": "Noch keine Bots",
  "No Bots yet.": "Noch keine Bots.",
  "No actions listed": "Keine Aktionen aufgeführt",
  "No actions that change things": "Keine Aktionen, die etwas ändern",
  "No answers yet": "Noch keine Antworten",
  "No app with that name is turned on.":
    "Keine App mit diesem Namen ist eingeschaltet.",
  "No apps to give yet": "Noch keine Apps zum Freigeben",
  "No apps yet": "Noch keine Apps",
  "No browser running. It starts when the Bot next needs it.":
    "Kein Browser läuft. Er startet, wenn der Bot ihn das nächste Mal braucht.",
  "No check-ins yet": "Noch keine Rückfragen",
  "No commands recorded yet": "Noch keine Befehle aufgezeichnet",
  "No components yet": "Noch keine Komponenten",
  "No computers yet": "Noch keine Computer",
  "No conversation has “{search}” in its name or latest message.":
    "Keine Unterhaltung enthält „{search}“ im Namen oder in der letzten Nachricht.",
  "No conversations match your search":
    "Keine Unterhaltung passt zu Ihrer Suche",
  "No conversations yet": "Noch keine Unterhaltungen",
  "No credentials yet": "Noch keine Zugangsdaten",
  "No events match this filter yet.":
    "Noch keine Ereignisse passen zu diesem Filter.",
  "No folders approved.": "Keine Ordner freigegeben.",
  "No identity providers yet": "Noch keine Identitätsanbieter",
  "No loaded conversations match your search":
    "Keine geladene Unterhaltung passt zu Ihrer Suche",
  "No matches": "Keine Treffer",
  "No matching skills": "Keine passenden Fähigkeiten",
  "No memories yet": "Noch keine Erinnerungen",
  "No other Bots yet": "Noch keine anderen Bots",
  "No read-only actions": "Keine lesenden Aktionen",
  "No recent runs": "Keine aktuellen Läufe",
  "No recorded actions yet. What this rule stops will show here once Bots have acted.":
    "Noch keine festgehaltenen Aktionen. Was diese Regel stoppt, erscheint hier, sobald Bots gehandelt haben.",
  "No responsibilities yet": "Noch keine Zuständigkeiten",
  "No routines": "Keine Routinen",
  "No routines for this Bot yet": "Noch keine Routinen für diesen Bot",
  "No routines yet": "Noch keine Routinen",
  "No rules": "Keine Regeln",
  "No rules for this Bot": "Keine Regeln für diesen Bot",
  "No rules yet": "Noch keine Regeln",
  "No runs yet.": "Noch keine Läufe.",
  "No saved logins yet": "Noch keine gespeicherten Anmeldungen",
  "No skill applied, so all were offered":
    "Keine Fähigkeit passte, deshalb wurden alle angeboten",
  "No skill declares any of these tools":
    "Keine Fähigkeit nennt eines dieser Werkzeuge",
  "No skills yet": "Noch keine Fähigkeiten",
  "No skills yet. Write one with New skill.":
    "Noch keine Fähigkeiten. Schreiben Sie eine mit „Neue Fähigkeit“.",
  "No sources yet": "Noch keine Quellen",
  "No such component": "Keine solche Komponente",
  "No team account is connected. Bots with these tools are refused.":
    "Es ist kein Teamkonto verbunden. Bots mit diesen Werkzeugen werden abgelehnt.",
  "No team rules": "Keine Teamregeln",
  "No tools listed": "Keine Werkzeuge aufgeführt",
  "No triggers. It runs when you press Run now, or on the events above.":
    "Keine Auslöser. Sie läuft, wenn Sie auf „Jetzt ausführen“ klicken oder bei den oben genannten Ereignissen.",
  "Nobody has signed in yet": "Noch niemand hat sich angemeldet",
  "Nobody watching": "Niemand sieht zu",
  "None active": "Keine aktiv",
  "None listed": "Keine gelistet",
  "None yet": "Noch keine",
  "None. Everybody gets the switches above":
    "Keine. Alle bekommen die obigen Schalter",
  "Not a Bot": "Kein Bot",
  "Not a plugin": "Kein Plugin",
  "Not added": "Nicht hinzugefügt",
  "Not approved": "Nicht freigegeben",
  "Not assigned to any group": "Keiner Gruppe zugewiesen",
  "Not completed": "Nicht abgeschlossen",
  "Not created": "Nicht erstellt",
  "Not in this build": "Nicht in diesem Build",
  "Not listed by": "Nicht aufgeführt von",
  "Not published": "Nicht veröffentlicht",
  "Not published to the team": "Nicht für das Team veröffentlicht",
  "Not published. No Bot can see it.":
    "Nicht veröffentlicht. Kein Bot kann sie sehen.",
  "Not registered": "Nicht registriert",
  "Not set": "Nicht gesetzt",
  "Not set up. Set OTEL_EXPORTER_OTLP_ENDPOINT on the server.":
    "Nicht eingerichtet. Setzen Sie OTEL_EXPORTER_OTLP_ENDPOINT auf dem Server.",
  "Nothing connected yet": "Noch nichts verbunden",
  "Nothing else is allowed. Every action is refused.":
    "Sonst ist nichts erlaubt. Jede Aktion wird abgelehnt.",
  "Nothing has finished yet.": "Noch nichts ist abgeschlossen.",
  "Nothing is created until you press Create it.":
    "Es wird nichts erstellt, bis Sie auf „Erstellen“ klicken.",
  "Nothing is running or waiting on you.": "Nichts läuft oder wartet auf Sie.",
  "Nothing is scheduled.": "Nichts ist geplant.",
  "Nothing it could read": "Nichts, was er lesen konnte",
  "Nothing loaded matches this search and these filters.":
    "Nichts Geladenes passt zu dieser Suche und diesen Filtern.",
  "Nothing needs you right now": "Im Moment braucht Sie nichts",
  "Nothing running or scheduled": "Nichts läuft oder ist geplant",
  "Nothing saved yet. Save a draft to see it here.":
    "Noch nichts gespeichert. Speichern Sie einen Entwurf, um ihn hier zu sehen.",
  "Nothing shared yet": "Noch nichts geteilt",
  "Nothing to configure.": "Nichts einzurichten.",
  "Nothing to give a Bot here.":
    "Hier gibt es nichts, was ein Bot bekommen kann.",
  "Nothing to set up. These tools run inside this deployment, on its own data.":
    "Nichts einzurichten. Diese Werkzeuge laufen in dieser Installation, auf deren eigenen Daten.",
  "Nothing yet": "Noch nichts",
  "Nothing. It shows only what the Bot passes it.":
    "Nichts. Sie zeigt nur, was der Bot ihr übergibt.",
  Notifications: "Benachrichtigungen",
  "Now:": "Jetzt:",
  "OAuth client": "OAuth-Client",
  "Off for all your Bots": "Für alle Ihre Bots ausgeschaltet",
  "Off for everybody, unless a role or group turns it on.":
    "Für alle aus, außer eine Rolle oder Gruppe schaltet es ein.",
  "Off in this browser. Turn them on to hear when a Bot needs you.":
    "In diesem Browser ausgeschaltet. Schalten Sie sie ein, um zu erfahren, wann ein Bot Sie braucht.",
  "Off. A matching action is stopped, and the Bot is told which rule stopped it.":
    "Aus. Eine passende Aktion wird gestoppt, und der Bot erfährt, welche Regel sie gestoppt hat.",
  "Off. Any model can be used.": "Aus. Jedes Modell darf verwendet werden.",
  "Off. Bots can use any registered server they have access to.":
    "Aus. Bots können jeden registrierten Server nutzen, auf den sie Zugriff haben.",
  "Off. Commands show in Audit only.": "Aus. Befehle erscheinen nur im Audit.",
  "Off. Each person's Skills reach only the Bots they use, even Skills they opened before.":
    "Aus. Die Fähigkeiten jeder Person erreichen nur die Bots, die sie nutzt, auch solche, die sie zuvor geöffnet hat.",
  "Off. No Bot checks in for anybody.":
    "Aus. Kein Bot fragt für irgendjemanden nach.",
  "Off. Set SCIM_BEARER_TOKEN to accept provisioning from Okta, Entra or another directory.":
    "Aus. Setzen Sie SCIM_BEARER_TOKEN, um die Bereitstellung aus Okta, Entra oder einem anderen Verzeichnis anzunehmen.",
  "On by default once you message just this Bot. It reads the apps it can use and tells you when something needs you, at most once an hour. It also forms memories for you to review. It can only read: it can't send messages, change anything in an app, or use a browser or computer. If you turn it off or remove it, it stays that way.":
    "Standardmäßig eingeschaltet, sobald Sie nur diesem Bot schreiben. Er liest die Apps, die er nutzen darf, und sagt Ihnen höchstens einmal pro Stunde Bescheid, wenn etwas Sie braucht. Außerdem bildet er Erinnerungen, die Sie prüfen können. Er kann nur lesen: Er kann keine Nachrichten senden, nichts in einer App ändern und keinen Browser oder Computer nutzen. Wenn Sie ihn ausschalten oder entfernen, bleibt das so.",
  "On. A matching action goes ahead and is recorded in Audit, so you can see what a rule catches before it stops anything.":
    "An. Eine passende Aktion wird ausgeführt und im Audit festgehalten, so sehen Sie, was eine Regel erfasst, bevor sie etwas stoppt.",
  "Once a day": "Einmal täglich",
  "One earlier message couldn't be read, so it isn't shown. Everything else is here.":
    "Eine frühere Nachricht konnte nicht gelesen werden und wird deshalb nicht angezeigt. Alles andere ist vorhanden.",
  "One line": "Eine Zeile",
  "One sentence, shown under the name in the list.":
    "Ein Satz, der in der Liste unter dem Namen steht.",
  "One shared account for everyone.": "Ein gemeinsames Konto für alle.",
  "One shows up the first time a Bot opens a page.":
    "Einer erscheint, sobald ein Bot zum ersten Mal eine Seite öffnet.",
  "One thing needs you": "Eine Sache braucht Sie",
  "Only an admin can give it to a Bot.":
    "Nur ein Admin kann es einem Bot geben.",
  "Only approved MCP servers": "Nur freigegebene MCP-Server",
  "Only approved servers": "Nur freigegebene Server",
  "Only when field": "Nur wenn Feld",
  "Only when it needs me": "Nur wenn er mich braucht",
  "Only you can see it and start conversations with it.":
    "Nur Sie können ihn sehen und Unterhaltungen mit ihm beginnen.",
  "Only you can see it and talk to it.":
    "Nur Sie können ihn sehen und mit ihm sprechen.",
  "Only you can use it.": "Nur Sie können ihn nutzen.",
  "Open Bots to see what's waiting.":
    "Öffnen Sie die Bots, um zu sehen, was wartet.",
  "Open conversation": "Unterhaltung öffnen",
  "Open issues assigned to me and questions waiting on me":
    "Mir zugewiesene offene Vorgänge und Fragen, die auf mich warten",
  "Open record": "Eintrag öffnen",
  "Open the Bot's browser": "Browser des Bots öffnen",
  "Open the Bot's browser and sign in yourself. Then choose I've signed in and the Bot carries on.":
    "Öffnen Sie den Browser des Bots und melden Sie sich selbst an. Wählen Sie dann „Ich habe mich angemeldet“, und der Bot macht weiter.",
  "OpenBot can't draw it. The settings below have no effect.":
    "OpenBot kann sie nicht darstellen. Die Einstellungen unten haben keine Wirkung.",
  "OpenBot got no consent link back, so nothing was connected. Try again, or check this connector's setup if it keeps happening.":
    "OpenBot hat keinen Zustimmungslink zurückbekommen, deshalb wurde nichts verbunden. Versuchen Sie es erneut oder prüfen Sie die Einrichtung dieses Konnektors, falls das Problem bleibt.",
  "OpenBot hasn't started running routines yet, so none of these will run. Ask an admin to set this up.":
    "OpenBot führt noch keine Routinen aus, deshalb läuft keine davon. Bitten Sie einen Admin, das einzurichten.",
  "OpenBot reads it now, then every 15 minutes while it's on.":
    "OpenBot liest sie jetzt und danach alle 15 Minuten, solange sie eingeschaltet ist.",
  "Opened page": "Seite geöffnet",
  "Opens a private conversation with it.":
    "Öffnet eine private Unterhaltung mit ihm.",
  Optional: "Optional",
  Organization: "Organisation",
  "Organization network policy": "Netzwerkrichtlinie der Organisation",
  Outcome: "Ergebnis",
  "Over the daily limit": "Tageslimit überschritten",
  Overview: "Übersicht",
  "POST JSON to this URL with the Authorization header, or with Standard Webhooks signature headers. A 200 means it was received, not that the run finished.":
    "Senden Sie JSON per POST an diese URL, mit dem Authorization-Header oder mit den Signatur-Headern von Standard Webhooks. Ein 200 bedeutet, dass es empfangen wurde, nicht dass der Lauf fertig ist.",
  "POST to": "POST an",
  Password: "Passwort",
  Passwords: "Passwörter",
  "Paste a new secret to replace it":
    "Fügen Sie ein neues Geheimnis ein, um es zu ersetzen",
  "Paste the signing secret": "Signaturgeheimnis einfügen",
  Paused: "Pausiert",
  "Paused. Its triggers won't start it.":
    "Pausiert. Ihre Auslöser starten sie nicht.",
  "Paused. Nothing runs for you until you turn it back on.":
    "Pausiert. Für Sie läuft nichts, bis Sie ihn wieder einschalten.",
  People: "Personen",
  "People can also sign in with Google, Microsoft or Okta.":
    "Personen können sich auch mit Google, Microsoft oder Okta anmelden.",
  "People can let Bots they own use it, on the account of whoever is asking.":
    "Personen können Bots, die ihnen gehören, es mit dem Konto der fragenden Person nutzen lassen.",
  "People can only sign in through a registered SAML or OpenID Connect provider.":
    "Personen können sich nur über einen registrierten SAML- oder OpenID-Connect-Anbieter anmelden.",
  "People in this group": "Personen in dieser Gruppe",
  "People may open their Skills to every Bot in Settings, Learning.":
    "Personen dürfen ihre Fähigkeiten unter Einstellungen → Lernen für jeden Bot öffnen.",
  "People show here once they do.":
    "Personen erscheinen hier, sobald sie sich anmelden.",
  "People type the slug after /. The Bot then follows the instructions. Everybody can use it, and you choose which Bots have it.":
    "Personen geben den Kurznamen nach / ein. Der Bot folgt dann den Anweisungen. Alle können sie nutzen, und Sie legen fest, welche Bots sie haben.",
  "People, by email": "Personen, per E-Mail",
  Period: "Zeitraum",
  "Pick a Bot or make your own":
    "Wählen Sie einen Bot oder erstellen Sie einen eigenen",
  "Pick one from the list below.": "Wählen Sie eines aus der Liste unten.",
  "Pin conversation": "Unterhaltung anheften",
  "Pings sent": "Gesendete Hinweise",
  Pinned: "Angeheftet",
  "Pins this Bot at the top of every group member's Bots list. Use * for the whole team.":
    "Heftet diesen Bot oben in die Bot-Liste jedes Gruppenmitglieds. Mit * gilt es für das ganze Team.",
  Playground: "Spielwiese",
  Plugin: "Plugin",
  "Plugin not found": "Plugin nicht gefunden",
  Plugins: "Plugins",
  Preferences: "Einstellungen",
  "Pressed key": "Taste gedrückt",
  Preview: "Vorschau",
  Private: "Privat",
  Profile: "Profil",
  Progress: "Fortschritt",
  Provider: "Anbieter",
  Public: "Öffentlich",
  Publish: "Veröffentlichen",
  "Publish to team": "Für das Team veröffentlichen",
  Published: "Veröffentlicht",
  "Published to": "Veröffentlicht für",
  "Published. Every Bot can use it":
    "Veröffentlicht. Jeder Bot kann sie nutzen",
  "Publishing doesn't change its visibility. You can unpublish at any time.":
    "Das Veröffentlichen ändert seine Sichtbarkeit nicht. Sie können die Veröffentlichung jederzeit aufheben.",
  "Publishing makes it available to every Bot. Turn it off for one Bot on the UI components page.":
    "Durch das Veröffentlichen steht sie jedem Bot zur Verfügung. Für einen einzelnen Bot schalten Sie sie auf der Seite „UI-Komponenten“ aus.",
  "Queue message": "Nachricht einreihen",
  Queued: "Eingereiht",
  "Queued. It checks in within a minute.":
    "Eingereiht. Er fragt innerhalb einer Minute nach.",
  "Ran a command": "Befehl ausgeführt",
  "Reaching you": "Erreichbarkeit",
  "Read page": "Seite gelesen",
  "Read real data": "Echte Daten gelesen",
  "Reading source…": "Quelle wird gelesen …",
  Reads: "Lesen",
  "Ready when you are": "Bereit, wenn Sie es sind",
  "Recently stopped": "Zuletzt gestoppt",
  "Record again": "Erneut aufnehmen",
  "Recording duration": "Aufnahmedauer",
  Refresh: "Aktualisieren",
  "Refresh its tools to check again.":
    "Aktualisieren Sie seine Werkzeuge, um erneut zu prüfen.",
  "Refresh tools": "Werkzeuge aktualisieren",
  "Refresh tools to check again.":
    "Aktualisieren Sie die Werkzeuge, um erneut zu prüfen.",
  "Refund card": "Erstattungskarte",
  Registered: "Registriert",
  Remember: "Merken",
  "Remember a fact": "Etwas merken",
  Remove: "Entfernen",
  "Remove for good": "Endgültig entfernen",
  "Remove policy": "Richtlinie entfernen",
  "Remove rule": "Regel entfernen",
  "Removed:": "Entfernt:",
  "Removed: ": "Entfernt: ",
  "Replace key": "Schlüssel ersetzen",
  "Require SSO": "SSO vorschreiben",
  "Require auto-review for everyone":
    "Automatische Prüfung für alle vorschreiben",
  Reset: "Zurücksetzen",
  "Reset it": "Zurücksetzen",
  Responsibilities: "Zuständigkeiten",
  "Responsibility ran.": "Zuständigkeit wurde ausgeführt.",
  "Retry save": "Speichern erneut versuchen",
  "Retry summary": "Zusammenfassung erneut versuchen",
  "Return to chat": "Zurück zum Chat",
  "Return to chat · keep call open": "Zurück zum Chat · Anruf offen lassen",
  "Review Bot actions and actions blocked by this deployment’s policy.":
    "Prüfen Sie Aktionen von Bots und Aktionen, die von den Richtlinien dieser Installation blockiert wurden.",
  "Review a Bot's changes to websites, connected apps, and files.":
    "Änderungen eines Bots an Websites, verbundenen Apps und Dateien prüfen.",
  "Review actions taken in OpenBot and who took them.":
    "Prüfen Sie, welche Aktionen in OpenBot ausgeführt wurden und von wem.",
  "Review members, manage admin roles, and remove access.":
    "Prüfen Sie Mitglieder, verwalten Sie Admin-Rollen und entziehen Sie den Zugang.",
  "Review this Bot’s activity and settings.":
    "Prüfen Sie Aktivität und Einstellungen dieses Bots.",
  "Review this Bot’s available apps and skills, and check which apps are ready to use. The Bot cannot use apps or skills outside this list.":
    "Prüfen Sie die Apps und Fähigkeiten dieses Bots und welche Apps einsatzbereit sind. Außerhalb dieser Liste kann der Bot keine Apps oder Fähigkeiten nutzen.",
  "Review this Bot’s current work, scheduled tasks, and completed tasks.":
    "Prüfen Sie die laufende Arbeit, geplante und abgeschlossene Aufgaben dieses Bots.",
  "Review this Bot’s ongoing goals, what triggered each run, and its results.":
    "Prüfen Sie die laufenden Ziele dieses Bots, was jeden Lauf ausgelöst hat und die Ergebnisse.",
  Reviewed: "Geprüft",
  "Reviewed, first-party servers. Open one to add it.":
    "Geprüfte Server der Hersteller. Öffnen Sie einen, um ihn hinzuzufügen.",
  Revoke: "Widerrufen",
  "Revoke key": "Schlüssel widerrufen",
  "Role and group overrides": "Überschreibungen nach Rolle und Gruppe",
  "Routine ran.": "Routine wurde ausgeführt.",
  Routines: "Routinen",
  "Routines aren't running.": "Routinen laufen nicht.",
  Rules: "Regeln",
  "Rules for every Bot": "Regeln für jeden Bot",
  "Rules for other Bots": "Regeln für andere Bots",
  "Run now": "Jetzt ausführen",
  "Run when asked": "Auf Anfrage ausführen",
  Running: "Läuft",
  "Running…": "Läuft …",
  "Runs every Bot this person uses":
    "Führt jeden Bot aus, den diese Person nutzt",
  "Runs inside OpenBot. There's nothing to connect.":
    "Läuft in OpenBot. Es gibt nichts zu verbinden.",
  "Runs it now, for real. The Bot does the work and can post and take actions.":
    "Führt sie jetzt wirklich aus. Der Bot erledigt die Arbeit und kann Beiträge senden und Aktionen ausführen.",
  "Runs it now, for real. The Bot does the work and posts in the conversation.":
    "Führt sie jetzt wirklich aus. Der Bot erledigt die Arbeit und schreibt in die Unterhaltung.",
  "Runs its routines, responsibilities, hand-offs and follow-ups for you.":
    "Führt seine Routinen, Zuständigkeiten, Übergaben und Nachfassaktionen für Sie aus.",
  "Runs on the computer of whoever is using it.":
    "Läuft auf dem Computer der Person, die ihn nutzt.",
  "Runs on your computer, alongside your other Bots.":
    "Läuft auf Ihrem Computer, neben Ihren anderen Bots.",
  "SCIM provisioning": "SCIM-Bereitstellung",
  "Sample arguments": "Beispielargumente",
  "Save a credential for this deployment. You won’t be able to view the secret after saving it.":
    "Speichern Sie Zugangsdaten für diese Installation. Nach dem Speichern lässt sich das Geheimnis nicht mehr anzeigen.",
  "Save credential": "Zugangsdaten speichern",
  "Save draft": "Entwurf speichern",
  "Save name": "Namen speichern",
  "Save rule": "Regel speichern",
  "Save secret": "Geheimnis speichern",
  "Save to Passwords": "In Passwörtern speichern",
  "Saved credentials": "Gespeicherte Zugangsdaten",
  "Saved here": "Hier gespeichert",
  "Saved in this deployment's vault and never shown again.":
    "Im Tresor dieser Installation gespeichert und nie wieder angezeigt.",
  "Saved logins": "Gespeicherte Anmeldungen",
  "Saved passwords are off": "Gespeicherte Passwörter sind aus",
  "Saving voice chat": "Sprachchat wird gespeichert",
  "Saving your conversation and preparing a summary…":
    "Ihre Unterhaltung wird gespeichert und eine Zusammenfassung vorbereitet …",
  "Saving…": "Wird gespeichert …",
  "Say something to": "Schreiben Sie an",
  "Say something to {names}.": "Schreiben Sie an {names}.",
  Scheduled: "Geplant",
  Scope: "Geltungsbereich",
  "Scrolled page": "Seite gescrollt",
  "Search by action name": "Nach Aktionsnamen suchen",
  "Search by name or address": "Nach Name oder Adresse suchen",
  "Search connections": "Verbindungen durchsuchen",
  "Search conversations": "Unterhaltungen durchsuchen",
  "Search events": "Ereignisse durchsuchen",
  "Search events…": "Ereignisse durchsuchen …",
  "Search people": "Personen durchsuchen",
  "Search…": "Suchen …",
  Secret: "Geheimnis",
  "Select all": "Alle auswählen",
  "Send answer": "Antwort senden",
  "Send message": "Nachricht senden",
  "Send or forward mail to this address to start a run.":
    "Senden oder leiten Sie eine E-Mail an diese Adresse, um einen Lauf zu starten.",
  "Sent an attachment": "Anhang gesendet",
  "Sent in a ping": "In einem Hinweis gesendet",
  "Sent to the Bot it was meant for": "An den vorgesehenen Bot gesendet",
  "Sent to the default Bot": "An den Standard-Bot gesendet",
  "Sent with every call to this vendor.":
    "Wird bei jedem Aufruf an diesen Anbieter mitgesendet.",
  "Set OTEL_EXPORTER_OTLP_ENDPOINT to stream audit events and Bot actions to your OpenTelemetry collector or SIEM. They are tagged openbot.surface.":
    "Setzen Sie OTEL_EXPORTER_OTLP_ENDPOINT, um Audit-Ereignisse und Bot-Aktionen an Ihren OpenTelemetry-Collector oder Ihr SIEM zu senden. Sie sind mit openbot.surface markiert.",
  "Set approval rules for members’ Bots and review requests to use shared accounts.":
    "Legen Sie Freigaberegeln für die Bots der Mitglieder fest und prüfen Sie Anfragen zur Nutzung gemeinsamer Konten.",
  "Set by an admin": "Von einem Admin festgelegt",
  "Set by the connector, not the tool's name. Anything unknown counts as a write.":
    "Vom Konnektor festgelegt, nicht vom Namen des Werkzeugs. Alles Unbekannte zählt als Schreibzugriff.",
  Settings: "Einstellungen",
  "Settings for this Bot": "Einstellungen für diesen Bot",
  "Settings → Approvals": "Einstellungen → Freigaben",
  Setup: "Einrichtung",
  "Setup is complete without it, and it reaches your documents only.":
    "Die Einrichtung ist auch ohne sie abgeschlossen, und sie erreicht nur Ihre Dokumente.",
  "Shared account requests": "Anfragen zur gemeinsamen Kontonutzung",
  "Shared with you": "Mit Ihnen geteilt",
  Sharing: "Teilen",
  "Show a refund with its amount, reason and status.":
    "Zeigt eine Erstattung mit Betrag, Grund und Status.",
  "Show key": "Schlüssel anzeigen",
  "Show less": "Weniger anzeigen",
  "Show live captions": "Live-Untertitel anzeigen",
  "Show more": "Mehr anzeigen",
  "Show the step": "Schritt anzeigen",
  "Show voice call": "Sprachanruf anzeigen",
  "Sign in": "Anmelden",
  "Sign in as the team account, not your own.":
    "Melden Sie sich als Teamkonto an, nicht mit Ihrem eigenen.",
  "Sign in by hand": "Selbst anmelden",
  "Sign out": "Abmelden",
  "Sign-in": "Anmeldung",
  "Sign-on URL": "Anmelde-URL",
  "Signed in": "Angemeldet",
  "Signing in…": "Anmeldung läuft …",
  "Signing secret": "Signaturgeheimnis",
  "Signing secret saved": "Signaturgeheimnis gespeichert",
  Skill: "Fähigkeit",
  "Skill sharing": "Teilen von Fähigkeiten",
  Skills: "Fähigkeiten",
  "Skills and access": "Fähigkeiten und Zugriff",
  "Skills you write show up here.":
    "Fähigkeiten, die Sie schreiben, erscheinen hier.",
  Skin: "Skin",
  Skipped: "Übersprungen",
  "Skipped. Nothing of yours was used.":
    "Übersprungen. Nichts von Ihnen wurde verwendet.",
  "Slack team ID": "Slack-Team-ID",
  "Something needs you": "Etwas braucht Sie",
  "Something outside OpenBot that starts this responsibility.":
    "Etwas außerhalb von OpenBot, das diese Zuständigkeit startet.",
  "Something you want your Bots to know": "Etwas, das Ihre Bots wissen sollen",
  "Source name": "Name der Quelle",
  "Specific people or groups": "Bestimmte Personen oder Gruppen",
  "Start a conversation with a Bot and it shows up here.":
    "Starten Sie eine Unterhaltung mit einem Bot, dann erscheint sie hier.",
  "Start a conversation.": "Starten Sie eine Unterhaltung.",
  "Start from": "Ausgehen von",
  "Start voice call": "Sprachanruf starten",
  "Started by": "Gestartet von",
  "Started this group": "Hat diese Gruppe gestartet",
  "Starts on Slack events this Bot receives. Messages sent before you added the trigger are ignored.":
    "Startet bei Slack-Ereignissen, die dieser Bot erhält. Nachrichten, die vor dem Hinzufügen des Auslösers gesendet wurden, werden ignoriert.",
  "Stop and add to draft": "Anhalten und zum Entwurf hinzufügen",
  "Stop and transcribe": "Anhalten und transkribieren",
  "Stop browser": "Browser anhalten",
  "Stop computers": "Computer anhalten",
  "Stop folder access": "Ordnerzugriff beenden",
  "Stop inactive computers": "Inaktive Computer anhalten",
  "Stop inactive computers now": "Inaktive Computer jetzt anhalten",
  "Stop the Bot": "Bot anhalten",
  Stopped: "Angehalten",
  "Stopped actions": "Gestoppte Aktionen",
  "Stopping a computer ends its running Bots and keeps its disk. The Bot gets a fresh computer next session. To stop one person's computers, go to People.":
    "Das Anhalten eines Computers beendet seine laufenden Bots und behält seinen Datenträger. Der Bot bekommt in der nächsten Sitzung einen frischen Computer. Um die Computer einer einzelnen Person anzuhalten, gehen Sie zu „Personen“.",
  Subtask: "Teilaufgabe",
  Succeeded: "Erfolgreich",
  "Success criteria": "Erfolgskriterien",
  "Suggested next steps": "Vorgeschlagene nächste Schritte",
  "Summarize this conversation": "Diese Unterhaltung zusammenfassen",
  "Summarize what we covered in this conversation so far.":
    "Fassen Sie zusammen, was wir in dieser Unterhaltung bisher besprochen haben.",
  Summary: "Zusammenfassung",
  "Sync now": "Jetzt synchronisieren",
  "System owned": "Vom System bereitgestellt",
  "Take it off your Bots list. Only your list changes.":
    "Aus Ihrer Bot-Liste nehmen. Nur Ihre Liste ändert sich.",
  "Take over to finish": "Übernehmen und abschließen",
  "Take over to sign in": "Übernehmen und anmelden",
  "Taken away from this Bot": "Diesem Bot entzogen",
  "Taking you to it…": "Sie werden weitergeleitet …",
  "Team account": "Teamkonto",
  "Team allowlist only": "Nur Zulassungsliste des Teams",
  "Team rules": "Teamregeln",
  "Team settings": "Teameinstellungen",
  "Team settings and shared account requests are in":
    "Teameinstellungen und Anfragen zur gemeinsamen Kontonutzung finden Sie unter",
  "Teammates can't see it until it has a real name and a description.":
    "Teammitglieder sehen ihn erst, wenn er einen echten Namen und eine Beschreibung hat.",
  "Tells this key apart from others for the same provider.":
    "Unterscheidet diesen Schlüssel von anderen desselben Anbieters.",
  "Test on recent activity": "An letzter Aktivität testen",
  "That routine could not be changed.":
    "Diese Routine konnte nicht geändert werden.",
  "That routine could not be started.":
    "Diese Routine konnte nicht gestartet werden.",
  "The Bot asked for a secret": "Der Bot hat nach einem Geheimnis gefragt",
  "The Bot asked for help": "Der Bot hat um Hilfe gebeten",
  "The Bot declined": "Der Bot hat abgelehnt",
  "The Bot is mentioned": "Der Bot wird erwähnt",
  "The Bot reads only the first 120,000 characters of this file.":
    "Der Bot liest nur die ersten 120.000 Zeichen dieser Datei.",
  "The Bot stopped responding": "Der Bot hat nicht mehr geantwortet",
  "The Bot wasn't created.": "Der Bot wurde nicht erstellt.",
  "The OpenBot desktop app still shows you each command before it runs.":
    "Die OpenBot-Desktop-App zeigt Ihnen weiterhin jeden Befehl, bevor er ausgeführt wird.",
  "The computer was reset": "Der Computer wurde zurückgesetzt",
  "The computer was updated": "Der Computer wurde aktualisiert",
  "The data this component can fetch to draw itself. This is separate from Available to. With all of these off, it shows only what the Bot passes it. Every read shows in Audit. Changes apply right away.":
    "Die Daten, die diese Komponente abrufen kann, um sich darzustellen. Das ist getrennt von „Verfügbar für“. Sind alle ausgeschaltet, zeigt sie nur, was der Bot ihr übergibt. Jeder Lesezugriff erscheint im Audit. Änderungen gelten sofort.",
  "The deployment registers its redirect URI itself. There is nothing to add at the vendor.":
    "Die Installation registriert ihre Weiterleitungs-URI selbst. Beim Anbieter ist nichts hinzuzufügen.",
  "The desktop app is offline. Open it to approve folders or run commands.":
    "Die Desktop-App ist offline. Öffnen Sie sie, um Ordner freizugeben oder Befehle auszuführen.",
  "The file from your identity team. It includes the signing certificate.":
    "Die Datei Ihres Identitätsteams. Sie enthält das Signaturzertifikat.",
  "The person chose this Bot": "Die Person hat diesen Bot gewählt",
  "The report contains the current quarter's graph and a source link.":
    "Der Bericht enthält die Grafik des laufenden Quartals und einen Quellenlink.",
  "The rule": "Die Regel",
  "The sample arguments aren't available.":
    "Die Beispielargumente sind nicht verfügbar.",
  "The server didn't answer": "Der Server hat nicht geantwortet",
  "The sign-in could not be completed":
    "Die Anmeldung konnte nicht abgeschlossen werden",
  "The sign-in request could not be made.":
    "Die Anmeldeanfrage konnte nicht gestellt werden.",
  "The site sent a verification code. Enter it to finish signing in.":
    "Die Website hat einen Bestätigungscode gesendet. Geben Sie ihn ein, um die Anmeldung abzuschließen.",
  "The user stopped this task before it completed.":
    "Die Person hat diese Aufgabe angehalten, bevor sie fertig war.",
  "The whole team": "Das ganze Team",
  "Their email": "E-Mail-Adresse der Person",
  "There are no Bots yet.": "Es gibt noch keine Bots.",
  "There is no Bot with that name.": "Es gibt keinen Bot mit diesem Namen.",
  "There is no component with that name.":
    "Es gibt keine Komponente mit diesem Namen.",
  "There is no plugin with that name, here or in the catalogue.":
    "Es gibt kein Plugin mit diesem Namen, weder hier noch im Katalog.",
  "There's nothing of yours to delete.": "Es gibt nichts von Ihnen zu löschen.",
  "These apply to every member's Bots. Members can't change them.":
    "Diese gelten für die Bots jedes Mitglieds. Mitglieder können sie nicht ändern.",
  "These apply to everybody. To change who gets check-ins by role or group, use":
    "Diese gelten für alle. Um nach Rolle oder Gruppe festzulegen, wer Rückfragen bekommt, nutzen Sie",
  "These change something at the vendor. Boundaries about writes apply to them.":
    "Diese ändern etwas beim Anbieter. Grenzen für Schreibzugriffe gelten für sie.",
  "These don't match a Bot you can open. They still apply to any Bot they match. Remove the ones you don't want.":
    "Diese passen zu keinem Bot, den Sie öffnen können. Sie gelten weiterhin für jeden Bot, auf den sie passen. Entfernen Sie die, die Sie nicht möchten.",
  "These only read. Boundaries about writes don't apply to them.":
    "Diese lesen nur. Grenzen für Schreibzugriffe gelten für sie nicht.",
  Thinking: "Denkt nach",
  "This Bot can't hand work to other Bots. Other Bots can still hand work to it.":
    "Dieser Bot kann keine Arbeit an andere Bots übergeben. Andere Bots können ihm weiterhin Arbeit übergeben.",
  "This Bot couldn't be created as written. It's being rewritten.":
    "Dieser Bot konnte so nicht erstellt werden. Er wird neu geschrieben.",
  "This Bot has a key, so it can use its tools. If you make a new key, the old one stops working right away.":
    "Dieser Bot hat einen Schlüssel und kann deshalb seine Werkzeuge nutzen. Wenn Sie einen neuen Schlüssel erzeugen, funktioniert der alte sofort nicht mehr.",
  "This Bot has no key yet. It can talk but can't use tools. Generate a key and add it to your agent's configuration.":
    "Dieser Bot hat noch keinen Schlüssel. Er kann sprechen, aber keine Werkzeuge nutzen. Erzeugen Sie einen Schlüssel und tragen Sie ihn in der Konfiguration Ihres Agenten ein.",
  "This Bot is still working on something. Wait for it, or stop it first.":
    "Dieser Bot arbeitet noch an etwas. Warten Sie ab oder halten Sie ihn zuerst an.",
  "This Bot isn't available to you. It may be unpublished or not shared with you.":
    "Dieser Bot steht Ihnen nicht zur Verfügung. Er ist möglicherweise nicht veröffentlicht oder nicht mit Ihnen geteilt.",
  "This Bot was deleted. You can still read this conversation, but the Bot can't reply.":
    "Dieser Bot wurde gelöscht. Sie können die Unterhaltung weiterhin lesen, aber der Bot kann nicht antworten.",
  "This Bot's generated interface": "Die vom Bot erstellte Oberfläche",
  "This Bot's profile from before each person had their own":
    "Das Profil dieses Bots aus der Zeit, bevor jede Person ein eigenes hatte",
  "This app is off": "Diese App ist aus",
  "This attachment is unavailable.": "Dieser Anhang ist nicht verfügbar.",
  "This browser blocked the tab.": "Dieser Browser hat den Tab blockiert.",
  "This connector has no tool with that name.":
    "Dieser Konnektor hat kein Werkzeug mit diesem Namen.",
  "This connector is off": "Dieser Konnektor ist aus",
  "This conversation": "Diese Unterhaltung",
  "This deployment has no data functions":
    "Diese Installation hat keine Datenfunktionen",
  "This deployment has no data functions.":
    "Diese Installation hat keine Datenfunktionen.",
  "This deployment has no public URL, so nobody can finish connecting. Set OPENBOT_PUBLIC_URL.":
    "Diese Installation hat keine öffentliche URL, deshalb kann niemand das Verbinden abschließen. Setzen Sie OPENBOT_PUBLIC_URL.",
  "This deployment registers itself with the vendor on first connect. There is nothing to paste.":
    "Diese Installation registriert sich beim ersten Verbinden selbst beim Anbieter. Es gibt nichts einzufügen.",
  "This goes straight into the Bot's browser. The Bot only learns whether it worked.":
    "Das geht direkt in den Browser des Bots. Der Bot erfährt nur, ob es geklappt hat.",
  "This key already has an active credential. Saving replaces it and revokes the old one.":
    "Für diesen Schlüssel gibt es bereits aktive Zugangsdaten. Beim Speichern werden sie ersetzt und die alten widerrufen.",
  "This needs you": "Das braucht Sie",
  "This one has settings OpenBot can't show. Choose another.":
    "Diese hat Einstellungen, die OpenBot nicht anzeigen kann. Wählen Sie eine andere.",
  "This person's profile and folder for this Bot":
    "Profil und Ordner dieser Person für diesen Bot",
  "This responsibility is": "Diese Zuständigkeit ist",
  "This responsibility is {status}. Its triggers won't start it.":
    "Diese Zuständigkeit ist {status}. Ihre Auslöser starten sie nicht.",
  "This routine is paused. Turn it on first.":
    "Diese Routine ist pausiert. Schalten Sie sie zuerst ein.",
  "This routine stops for good. You can't undo this.":
    "Diese Routine hört endgültig auf. Das lässt sich nicht rückgängig machen.",
  "This routine's runs could not be loaded.":
    "Die Läufe dieser Routine konnten nicht geladen werden.",
  "This rule is already in place.": "Diese Regel besteht bereits.",
  "This rule isn't in place anymore. It may have been removed.":
    "Diese Regel besteht nicht mehr. Sie wurde möglicherweise entfernt.",
  "This server answers as whoever is asking. Each call carries a token Microsoft Entra issues for that person, so a Bot only sees what they can see.":
    "Dieser Server antwortet als die fragende Person. Jeder Aufruf trägt ein Token, das Microsoft Entra für diese Person ausstellt, ein Bot sieht also nur, was sie sehen kann.",
  "This sign-in has ended.": "Diese Anmeldung ist beendet.",
  "This tool changes something at the vendor. Boundaries about writes apply to it.":
    "Dieses Werkzeug ändert etwas beim Anbieter. Grenzen für Schreibzugriffe gelten für es.",
  "This tool only reads. Boundaries about writes don't apply to it.":
    "Dieses Werkzeug liest nur. Grenzen für Schreibzugriffe gelten für es nicht.",
  "This vendor answers as whoever is asking. The deployment registers an OAuth client, and each person connects their own account. A Bot only sees what that person can see.":
    "Dieser Anbieter antwortet als die fragende Person. Die Installation registriert einen OAuth-Client, und jede Person verbindet ihr eigenes Konto. Ein Bot sieht nur, was diese Person sehen kann.",
  "This vendor gives every customer their own hostname. It is checked against the vendor's pattern before it is saved.":
    "Dieser Anbieter gibt jedem Kunden einen eigenen Hostnamen. Er wird vor dem Speichern gegen das Muster des Anbieters geprüft.",
  "This vendor no longer lists these. No Bot sees them, and none can call them. The access is still saved, and comes back if the vendor lists the tool again. To remove it, use the Bot's own page.":
    "Dieser Anbieter führt diese nicht mehr auf. Kein Bot sieht sie, und keiner kann sie aufrufen. Der Zugriff bleibt gespeichert und kommt zurück, wenn der Anbieter das Werkzeug wieder aufführt. Zum Entfernen nutzen Sie die Seite des Bots.",
  "This will delete:": "Das wird gelöscht:",
  Title: "Titel",
  "To the whole team": "Für das ganze Team",
  "To:": "An:",
  "Too many tools for its model": "Zu viele Werkzeuge für sein Modell",
  "Tool not found": "Werkzeug nicht gefunden",
  "Tool or app": "Werkzeug oder App",
  Tools: "Werkzeuge",
  "Tools offered for one run": "Für einen Lauf angebotene Werkzeuge",
  "Transcribe and send": "Transkribieren und senden",
  "Transcript saved. A summary couldn’t be generated.":
    "Transkript gespeichert. Eine Zusammenfassung konnte nicht erstellt werden.",
  "Trial mode": "Probemodus",
  "Trial mode is on, so this rule records matching actions without stopping them.":
    "Der Probemodus ist an, deshalb hält diese Regel passende Aktionen nur fest, ohne sie zu stoppen.",
  Trigger: "Auslöser",
  "Trigger:": "Auslöser:",
  Triggers: "Auslöser",
  "Try again": "Erneut versuchen",
  "Turn a Bot off and it never learns this component exists. Changes apply right away.":
    "Schalten Sie einen Bot aus, erfährt er nie, dass es diese Komponente gibt. Änderungen gelten sofort.",
  "Turn check-ins on or off, limit them, and see how often people start what Bots raise.":
    "Schalten Sie Rückfragen ein oder aus, begrenzen Sie sie und sehen Sie, wie oft Personen aufgreifen, was Bots ansprechen.",
  "Turn it on to see its tools.":
    "Schalten Sie ihn ein, um seine Werkzeuge zu sehen.",
  "Turn off": "Ausschalten",
  "Turn on": "Einschalten",
  "Turn on a skill to use it with this Bot. Type / in a conversation to run it.":
    "Schalten Sie eine Fähigkeit ein, um sie mit diesem Bot zu nutzen. Geben Sie / in einer Unterhaltung ein, um sie auszuführen.",
  "Turn on check-ins": "Rückfragen einschalten",
  "Turn on every read-only action": "Jede lesende Aktion einschalten",
  "Turn one on under Your apps, or ask an admin. Until then this Bot can only talk with you.":
    "Schalten Sie eine unter „Ihre Apps“ ein oder fragen Sie einen Admin. Bis dahin kann dieser Bot nur mit Ihnen sprechen.",
  "Turn this app's actions on or off one at a time.":
    "Schalten Sie die Aktionen dieser App einzeln ein oder aus.",
  "Turned off": "Ausgeschaltet",
  "Turned off by an admin": "Von einem Admin ausgeschaltet",
  "Turned off by the person": "Von der Person ausgeschaltet",
  "Twice a day": "Zweimal täglich",
  "UI components": "UI-Komponenten",
  "Under Hidden on your Bots list. Only your list changes.":
    "Unter „Ausgeblendet“ in Ihrer Bot-Liste. Nur Ihre Liste ändert sich.",
  "Unmute your microphone": "Mikrofon einschalten",
  "Unpin conversation": "Unterhaltung lösen",
  Unpublish: "Veröffentlichung aufheben",
  "Unpublished. No Bot can use it":
    "Nicht veröffentlicht. Kein Bot kann sie nutzen",
  "Unread messages": "Ungelesene Nachrichten",
  Untitled: "Ohne Titel",
  "Untitled conversation": "Unterhaltung ohne Titel",
  "Untitled file": "Datei ohne Titel",
  "Up to date": "Aktuell",
  Update: "Aktualisieren",
  "Update computer": "Computer aktualisieren",
  "Update it": "Aktualisieren",
  "Uploading…": "Wird hochgeladen …",
  "Use a saved login": "Gespeicherte Anmeldung verwenden",
  "Use the dark appearance across OpenBot.":
    "Dunkle Darstellung in der ganzen App verwenden.",
  "Use the metadata from your identity team.":
    "Verwenden Sie die Metadaten Ihres Identitätsteams.",
  "Used the browser": "Browser verwendet",
  "Username or email": "Benutzername oder E-Mail",
  "Vendor documentation": "Dokumentation des Anbieters",
  "Verification code": "Bestätigungscode",
  View: "Ansicht",
  "View audit": "Audit ansehen",
  "View runs": "Läufe anzeigen",
  Visibility: "Sichtbarkeit",
  "Voice calls need a microphone and a secure (HTTPS) connection":
    "Sprachanrufe brauchen ein Mikrofon und eine sichere Verbindung (HTTPS)",
  "Voice chat": "Sprachchat",
  "Voice history timed out":
    "Der Sprachverlauf konnte nicht rechtzeitig geladen werden",
  "Waiting for": "Wartet auf",
  "Waiting for microphone permission…": "Warte auf die Mikrofonfreigabe …",
  "Waiting for the signing secret": "Wartet auf das Signaturgeheimnis",
  "Waiting for you": "Wartet auf Sie",
  "Waiting for your approval": "Wartet auf Ihre Freigabe",
  "Waiting for your response.": "Wartet auf Ihre Antwort.",
  "Waiting for {kind}. Answer at the top of this Bot's page or in the conversation.":
    "Wartet auf {kind}. Antworten Sie oben auf der Seite dieses Bots oder in der Unterhaltung.",
  "Waiting on you": "Wartet auf Sie",
  "We couldn't load your setup. Try again to continue.":
    "Ihre Einrichtung konnte nicht geladen werden. Versuchen Sie es erneut, um fortzufahren.",
  Welcome: "Willkommen",
  "Welcome to {name}": "Willkommen bei {name}",
  "What Bots can do": "Was Bots können",
  "What Bots can reach": "Worauf Bots zugreifen können",
  "What Isolated means": "Was „Isoliert“ bedeutet",
  "What a rule can check": "Was eine Regel prüfen kann",
  "What happened": "Was passiert ist",
  "What it can use": "Was er nutzen kann",
  "What it does": "Was es tut",
  "What it stops": "Was sie stoppt",
  "What should we call you? You can change your name later in Settings.":
    "Wie sollen wir Sie nennen? Sie können Ihren Namen später in den Einstellungen ändern.",
  "What the Bot should do when this skill is used.":
    "Was der Bot tun soll, wenn diese Fähigkeit genutzt wird.",
  "What the model is told about it": "Was dem Modell darüber gesagt wird",
  "What the model reads when it decides to use this. It has no effect until the component is published.":
    "Was das Modell liest, wenn es entscheidet, dies zu nutzen. Ohne Veröffentlichung der Komponente hat es keine Wirkung.",
  "What these tools offer, from the people who maintain them.":
    "Was diese Werkzeuge bieten, von denen, die sie pflegen.",
  "What this deployment sends to the vendor. One credential for everybody.":
    "Was diese Installation an den Anbieter sendet. Eine Zugangsberechtigung für alle.",
  "What this server offers, from the people who maintain it.":
    "Was dieser Server bietet, von denen, die ihn pflegen.",
  "What to read": "Was gelesen werden soll",
  "What your Bots remember about you is in":
    "Was Ihre Bots über Sie wissen, finden Sie unter",
  "When a Bot's check-in finds something that needs you, it shows up here.":
    "Wenn bei der Rückfrage eines Bots etwas auftaucht, das Sie braucht, erscheint es hier.",
  "When there are more, you can let this Bot ask them here.":
    "Sobald es weitere gibt, können Sie hier festlegen, dass dieser Bot sie fragen darf.",
  "Where can it be reached?": "Wo ist er erreichbar?",
  "Who can get in": "Wer Zugang hat",
  "Who can see it": "Wer ihn sehen kann",
  "Who is here": "Wer hier ist",
  "Who it is published to": "Für wen er veröffentlicht ist",
  "Whole team": "Ganzes Team",
  "Whose account": "Wessen Konto",
  "With the allowlist on, Bots can only call tools on the MCP servers approved here. Calls to any other server are refused.":
    "Bei eingeschalteter Zulassungsliste können Bots nur Werkzeuge der hier freigegebenen MCP-Server aufrufen. Aufrufe an andere Server werden abgelehnt.",
  "Work you give this Bot to keep doing shows up here.":
    "Arbeit, die Sie diesem Bot dauerhaft übergeben, erscheint hier.",
  "Work you give your Bots to keep doing shows up here.":
    "Arbeit, die Sie Ihren Bots dauerhaft übergeben, erscheint hier.",
  "Working on your request": "Bearbeitet Ihre Anfrage",
  "Working…": "Arbeitet …",
  "Workspace skills": "Fähigkeiten des Arbeitsbereichs",
  "Write a component and publish it without redeploying. Your edits are a draft. Conversations only show what is published.":
    "Schreiben Sie eine Komponente und veröffentlichen Sie sie ohne erneute Bereitstellung. Ihre Änderungen sind ein Entwurf. Unterhaltungen zeigen nur, was veröffentlicht ist.",
  "Write a component and watch it render as you type.":
    "Schreiben Sie eine Komponente und sehen Sie beim Tippen, wie sie dargestellt wird.",
  "Write a skill": "Fähigkeit schreiben",
  "Write a skill for everybody": "Fähigkeit für alle schreiben",
  "Write your own": "Eigene schreiben",
  "Writing the Bot…": "Der Bot wird geschrieben …",
  "Written in CEL. A rule that can't be evaluated counts as a match, so a typo stops actions rather than letting them through.":
    "In CEL geschrieben. Eine Regel, die sich nicht auswerten lässt, gilt als Treffer. Ein Tippfehler stoppt also Aktionen, statt sie durchzulassen.",
  "Written in CEL. It is checked before every action a Bot takes.":
    "In CEL geschrieben. Sie wird vor jeder Aktion eines Bots geprüft.",
  "Wrote a file": "Datei geschrieben",
  You: "Sie",
  "You can still expand the transcript.":
    "Sie können das Transkript weiterhin aufklappen.",
  "You can't undo this.": "Das lässt sich nicht rückgängig machen.",
  "You turned off check-ins for all your Bots in":
    "Sie haben die Rückfragen für alle Ihre Bots ausgeschaltet unter",
  "You · microphone muted": "Sie · Mikrofon stummgeschaltet",
  "Your Bot": "Ihr Bot",
  "Your Bots are all pinned above.": "Alle Ihre Bots sind oben angeheftet.",
  "Your Bots are all under Needs you.":
    "Alle Ihre Bots stehen unter „Braucht Sie“.",
  "Your account": "Ihr Konto",
  "Your admin turned off check-ins for you.":
    "Ihr Admin hat die Rückfragen für Sie ausgeschaltet.",
  "Your answer": "Ihre Antwort",
  "Your apps": "Ihre Apps",
  "Your memories": "Ihre Erinnerungen",
  "Your message wasn't sent. Try again.":
    "Ihre Nachricht wurde nicht gesendet. Versuchen Sie es erneut.",
  "Your microphone is muted": "Ihr Mikrofon ist stummgeschaltet",
  "Your name has been saved.": "Ihr Name wurde gespeichert.",
  "Your own Bot": "Ihr eigener Bot",
  "Your own hostname with this vendor. It is checked against the vendor's pattern before it is saved.":
    "Ihr eigener Hostname bei diesem Anbieter. Er wird vor dem Speichern gegen das Muster des Anbieters geprüft.",
  "Your routines could not be loaded.":
    "Ihre Routinen konnten nicht geladen werden.",
  "Your skills": "Ihre Fähigkeiten",
  Yours: "Ihre",
  "a conversation": "einer Unterhaltung",
  completed: "abgeschlossen",
  "needs review": "muss geprüft werden",
  now: "jetzt",
  paused: "pausiert",
  "read {time}": "gelesen {time}",
  "that Bot's page": "der Seite dieses Bots",
};
