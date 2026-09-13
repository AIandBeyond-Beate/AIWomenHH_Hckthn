# MVP-Spezifikation: AnkommenDE Hannover

Stand: 12. September 2026  
Status: Maya-Golden-Path implementiert; Profilformular und Deployment stehen noch aus

Umsetzungsdateien:

- [JSON-Schema](planning/task-schema.json)
- [Hannover-Aufgabenkatalog](planning/hannover-tasks.json)
- [Hackathon-Board](HACKATHON_BOARD.md)

## 1. Ziel und Abnahmeumfang

In 6–8 Stunden entsteht eine mobile Web-Demo, die aus vier Profilangaben einen persönlichen Behörden-Fahrplan für die **Landeshauptstadt Hannover** erzeugt.

Der verbindliche Demonstrationspfad ist:

> Maya ist Nicht-EU-Bürgerin, zieht für ein Studium in die Stadt Hannover und ist am 10. September 2026 eingezogen.

Das Produkt zeigt ihr sechs Aufgaben in sinnvoller Reihenfolge und führt sie detailliert durch die Wohnsitzanmeldung.

## 2. Navigation und Screen-Flow

```mermaid
flowchart LR
    A[Welcome] --> B[Profile]
    B -->|valid input| C[Personal plan]
    C -->|open task| D[Address registration]
    D -->|mark completed| C
    C -->|edit profile| B
```

Es gibt keine globale Navigation, Konten oder Einstellungen. Ein kleines Logo, eine Zurück-Aktion und „Edit profile“ reichen aus.

## 3. Verbindliche Bildschirmtexte

Die MVP-Oberfläche ist Englisch. Deutsch ist ein Bonus nach vollständiger Abnahme.

### Screen 1 – Welcome

**Purpose:** Nutzen in weniger als zehn Sekunden erklären.

- Eyebrow: `STARTING IN GERMANY`
- Headline: `Your next steps in Hannover, in the right order.`
- Body: `Answer four questions. Get a personal checklist with deadlines, documents and official sources.`
- Primary action: `Create my plan`
- Secondary action: `Use Maya's demo profile`
- Trust line: `No account · No document upload · Not legal advice`

**Interaktion:**

- `Create my plan` öffnet Screen 2 mit leeren Feldern.
- `Use Maya's demo profile` setzt den Golden Path und öffnet Screen 3.

### Screen 2 – Profile

**Purpose:** Nur Daten erfragen, die im MVP eine Regel verändern.

- Back action: `Back`
- Headline: `Tell us about your move`
- Body: `We only use these answers to create your checklist.`
- Fixed location: `City of Hannover`

**Question 1**

- Label: `What is your citizenship status?`
- Options: `EU, EEA or Switzerland` / `Non-EU`

**Question 2**

- Label: `Why are you moving?`
- Options: `Study` / `Work`

**Question 3**

- Label: `Have you moved into your home in Hannover?`
- Options: `Yes` / `Not yet`

**Question 4**

- Label: `When did you move in?`
- Control: date input, only visible after `Yes`
- Validation: `Enter your move-in date to calculate your registration deadline.`

- Primary action: `Show my plan`

### Screen 3 – Personal plan

**Purpose:** Die nächste Aktion muss sofort erkennbar sein.

- Eyebrow: `YOUR PERSONAL PLAN`
- Headline: `Your first steps in Hannover`
- Golden-Path summary: `Non-EU student · Moved in 2 days ago`
- Urgency callout: `Register your address by 24 September.`
- Progress label: `0 of 6 completed`
- Utility action: `Edit profile`

**Aufgaben im Golden Path**

1. `Register your address`
   - Status: `Do this first`
   - Timing: `Due 24 Sept`
   - Summary: `Get your official registration confirmation.`
2. `Confirm your health insurance`
   - Status: `Do now`
   - Timing: `Required in Germany`
3. `Apply for your residence permit`
   - Status: `Next`
   - Timing: `Before your visa expires`
4. `Open a bank account`
   - Status: `After registration`
   - Timing: `You may need your registration confirmation`
5. `Receive your tax ID`
   - Status: `After registration`
   - Timing: `Usually sent to your registered address`
6. `Check the broadcasting fee`
   - Status: `After registration`
   - Timing: `One fee per dwelling; exemptions may apply`

Jede Karte hat die Aktion `View details`. Im Hackathon benötigt nur Aufgabe 1 eine vollständige Detailansicht. Die anderen Karten dürfen eine kurze, statische Zusammenfassung anzeigen oder nicht klickbar sein.

**EU-Regel:** Beim Preset `EU, EEA or Switzerland` wird Aufgabe 3 nicht angezeigt. Der Fortschrittsnenner ist dann 5.

**Noch nicht eingezogen:** Aufgabe 1 zeigt `Prepare now` und keine berechnete Frist. Aufgaben 4–6 zeigen `After you move and register`.

### Screen 4 – Task: address registration

**Purpose:** Eine abstrakte Pflicht in eine ausführbare Handlung übersetzen.

- Back action: `Back to my plan`
- Status: `DO THIS FIRST`
- Headline: `Register your address`
- Deadline: `Complete by 24 September 2026`
- Intro: `Everyone living in Germany must register their address. In Hannover, the citizens' offices—not the immigration office—handle registration.`

**Section: Before you start**

- `You have moved into an address in the City of Hannover.`
- `Your landlord or housing provider has given you a Wohnungsgeberbestätigung.`

**Section: What to bring**

- `Passport or ID for you and each family member`
- `Wohnungsgeberbestätigung`
- `Civil-status documents, if applicable`
- Note: `The authority may request additional documents in individual cases.`

**Section: Choose how to register**

Option A:

- Title: `Register online`
- Copy: `Available for an eligible new main residence. You need an activated online ID or eID card, BundID, the AusweisApp and a compatible smartphone.`
- Action: `Open Hannover online service`

Option B:

- Title: `Visit a citizens' office`
- Copy: `You can use any citizens' office in the City of Hannover. Book an appointment online.`
- Hint: `If the appointment is later than your deadline, Hannover states that the booking confirmation serves as proof that you met the deadline.`
- Action: `Book an appointment`

**Completion**

- Checkbox: `I received my registration confirmation.`
- Primary action after checking: `Mark as completed`
- Success message: `Address registration completed. Your next steps are ready.`

**Source block**

- Label: `Official sources · Checked 12 Sep 2026`
- Links:
  - [Hannover: registration information](https://www.hannover.de/Leben-in-der-Region-Hannover/Verwaltungen-Kommunen/Die-Verwaltung-der-Landeshauptstadt-Hannover/Dezernate-und-Fachbereiche-der-LHH/Finanzen%2C-Ordnung-und-Feuerwehr/Fachbereich-%C3%96ffentliche-Ordnung/Standesamt-und-Staatsangeh%C3%B6rig%C2%ADkeit/Ausl%C3%A4nderangelegen%C2%ADheiten-und-Staatsangeh%C3%B6rigkeit/Anmeldungen%2C-Ummeldungen-und-Abmeldungen-Residence-registration%2C-change-of-address-and-deregistration)
  - [Hannover: citizens' office appointments](https://www.hannover.de/Leben-in-der-Region-Hannover/B%C3%BCrger-Service/B%C3%BCrger-Service-in-der-Landeshauptstadt-Hannover/Termine-bei-Beh%C3%B6rden-buchen/Terminvereinbarung-in-den-B%C3%BCrger%C3%A4mtern)
  - [Hannover: electronic residence registration](https://www.hannover.de/Service/Presse-Medien/Landeshauptstadt-Hannover/Meldungsarchiv-f%C3%BCr-das-Jahr-2025/Wohnsitzanmeldung-in-Hannover-jetzt-online-m%C3%B6glich)

## 4. Regeldefinition

```text
registration_due_date = move_in_date + 14 calendar days

IF moved_in = false
  registration.status = "prepare"
  registration_due_date = null

IF citizenship_status = "non_eu"
  include residence_permit task

IF citizenship_status = "eu_eea_ch"
  exclude residence_permit task

IF registration.completed = true
  progress += 1
  tasks tagged after_registration become "ready"
```

Im MVP ist `City of Hannover` eine feste, sichtbare Konstante. Die App behauptet nicht, für Garbsen, Langenhagen, Laatzen oder andere Kommunen der Region Hannover zu gelten.

### Quellenregister für die sechs Aufgaben

- Wohnsitzanmeldung: [Landeshauptstadt Hannover](https://www.hannover.de/Leben-in-der-Region-Hannover/Verwaltungen-Kommunen/Die-Verwaltung-der-Landeshauptstadt-Hannover/Dezernate-und-Fachbereiche-der-LHH/Finanzen%2C-Ordnung-und-Feuerwehr/Fachbereich-%C3%96ffentliche-Ordnung/Standesamt-und-Staatsangeh%C3%B6rig%C2%ADkeit/Ausl%C3%A4nderangelegen%C2%ADheiten-und-Staatsangeh%C3%B6rigkeit/Anmeldungen%2C-Ummeldungen-und-Abmeldungen-Residence-registration%2C-change-of-address-and-deregistration)
- Krankenversicherung: [Make it in Germany](https://www.make-it-in-germany.com/en/living-in-germany/money-insurance/health-insurance)
- Aufenthaltstitel: [Willkommensservice Hannover](https://www.hannover.de/view/content/600680/full/1/696901) und [Auswärtiges Amt](https://www.auswaertiges-amt.de/en/visa-service/215870-215870)
- Bankkonto: [Make it in Germany](https://www.make-it-in-germany.com/en/living-in-germany/money-insurance/bank-account)
- Steuer-ID: [Bundeszentralamt für Steuern](https://www.bzst.de/SharedDocs/Downloads/DE/IdNr/hinweis_idnr_gefluechtete_deutsch.pdf?__blob=publicationFile&v=3)
- Rundfunkbeitrag: [Beitragsservice – Informationen in anderen Sprachen](https://www.rundfunkbeitrag.de/welcome)

## 5. Abnahmekriterien

### Funktional

- **AC-01:** Maya's demo profile erzeugt ohne weitere Eingabe einen Plan mit sechs Aufgaben.
- **AC-02 (Bonus):** Das EU-Preset erzeugt einen Plan ohne Aufenthaltstitel-Aufgabe und mit fünf Aufgaben insgesamt.
- **AC-03:** Bei vorhandenem Einzugsdatum wird die Anmeldefrist korrekt als Datum plus 14 Kalendertage berechnet.
- **AC-04:** Bei `Not yet` wird keine erfundene Frist angezeigt.
- **AC-05:** Nach Abschluss der Wohnsitzanmeldung steigt der Fortschritt und die nachgelagerten Aufgaben wechseln in den bereiten Zustand.
- **AC-06:** Neuladen erhält Profil und Fortschritt, sofern `localStorage` nicht gemäß Streichliste entfernt wurde.
- **AC-07:** `Edit profile` berechnet den Plan neu; `Reset` stellt den Ausgangszustand wieder her.
- **AC-08:** Alle externen Aktionen verlinken ausschließlich auf die festgelegten offiziellen Quellen.

### Inhalt und Vertrauen

- **AC-09:** Auf jedem Aufgaben-Detail sind Quelle und Prüfdatum sichtbar.
- **AC-10:** Der Scope `City of Hannover` ist auf Profil und Plan sichtbar.
- **AC-11:** Der Hinweis `Not legal advice` erscheint vor dem Erstellen des Plans.
- **AC-12:** Es werden keine personenbezogenen Daten an einen Server übertragen.

### Bedienung

- **AC-13:** Der gesamte Golden Path funktioniert bei 360 px Breite ohne horizontales Scrollen.
- **AC-14:** Alle Aktionen sind per Tastatur erreichbar und haben einen sichtbaren Fokuszustand.
- **AC-15:** Auswahl und Status werden nicht ausschließlich über Farbe vermittelt.
- **AC-16:** Die nächste Aufgabe ist auf dem Plan ohne Scrollen sichtbar.

### Demo

- **AC-17:** Ein frischer Browser kann die Demo innerhalb von 60 Sekunden starten.
- **AC-18:** Der vollständige Pitch-Flow dauert höchstens drei Minuten.
- **AC-19:** Nach Deployment wird der Golden Path einmal auf Smartphone und Laptop vollständig getestet.

## 6. Drei-Minuten-Pitch

1. **Problem, 25 Sekunden:** Informationen sind vorhanden, aber verteilt und nicht als persönliche Reihenfolge aufbereitet.
2. **Profil, 25 Sekunden:** Maya's Situation in einem Klick laden.
3. **Fahrplan, 45 Sekunden:** Frist, Reihenfolge und Abhängigkeiten zeigen.
4. **Wohnsitzanmeldung, 60 Sekunden:** Unterlagen, Hannover-Zuständigkeit und Online-/Vor-Ort-Wege zeigen.
5. **Fortschritt, 15 Sekunden:** Aufgabe abschließen und nächsten Schritt freischalten.
6. **Vision, 10 Sekunden:** Weitere Orte, Lebenslagen und sichere Dokumentenunterstützung.

## 7. Scope-Freeze

Bis der Golden Path alle Abnahmekriterien erfüllt, werden keine Kartenansicht, Chatfunktion, Terminabfrage, Dokumentenanalyse, Nutzerkonten, Animationen oder zusätzlichen Zielgruppen begonnen.
