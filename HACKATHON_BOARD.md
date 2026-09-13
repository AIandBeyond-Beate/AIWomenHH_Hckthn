# Solo-Hackathon-Board: AnkommenDE Hannover

Zeit: 6–8 Stunden  
Verantwortlich: Beate  
Unterstützung: Codex für Code, Tests und Fehlersuche  
MVP-Sprache: Englisch  
Golden Path: Maya, Nicht-EU-Studentin, Stadt Hannover, eingezogen am 10. September 2026

## Definition of Done

Die Demo ist fertig, wenn:

- Maya mit einem Klick geladen werden kann,
- ihr Plan sechs korrekte Aufgaben zeigt,
- die Frist der Wohnsitzanmeldung als Einzugsdatum plus 14 Tage berechnet wird,
- die Detailansicht Unterlagen, Online-/Vor-Ort-Weg und offizielle Quellen zeigt,
- nach Abschluss der Anmeldung der Fortschritt auf `1 of 6` steigt,
- die Anwendung auf Smartphone und Laptop deployt erreichbar ist.

Das EU-Preset, `localStorage`, deutsche Oberflächentexte und der Firecrawl-/OpenAI-Content-Compiler sind Bonusumfang.

## Arbeitsprinzipien

- Immer nur eine Aufgabe gleichzeitig beginnen.
- Nach jedem Zeitblock muss die App weiterhin startbar sein.
- Nach vier Stunden gilt Feature-Freeze.
- Ein unfertiges Bonusfeature wird vollständig deaktiviert.
- Keine API-Schlüssel in Quellcode, Browser-Bundle oder Git speichern.

## Board nach Zeitfenster

### 0:00–0:30 – Scope und Umgebung

- [x] Repository-Status prüfen.
- [x] Node.js, Paketmanager und Startbefehl prüfen.
- [ ] Deployment-Ziel festlegen.
- [x] [MVP-Spezifikation](MVP_SPEC.md) und [Hannover-Daten](planning/hannover-tasks.json) als verbindliche Basis bestätigen.
- [x] Golden Path einmal im Wireframe durchspielen.

**Gate 1:** Erst weitergehen, wenn ein leeres React/Vite-Projekt lokal startet.

### 0:30–1:15 – Grundgerüst

- [x] React/Vite/TypeScript-Projekt anlegen.
- [x] mobile App-Hülle und Design-Tokens anlegen.
- [x] `planning/hannover-tasks.json` in die App-Datenstruktur übernehmen.
- [ ] Screens als einfache Zustände verdrahten: Welcome, Profile, Plan, Task.

**Gate 2:** Welcome-Screen ist bei 360 px nutzbar und die Daten werden ohne Fehler geladen.

### 1:15–2:30 – Kernfluss

- [x] `Use Maya's demo profile` implementieren.
- [ ] Profilfragen und Validierung implementieren.
- [x] Aufgaben anhand von Staatsangehörigkeitsgruppe und Zweck filtern.
- [x] Frist als `moveInDate + 14 Kalendertage` berechnen.
- [x] Plan mit sechs Aufgaben, Reihenfolge und Status anzeigen.

**Gate 3:** Maya erzeugt sechs Aufgaben und die Anmeldefrist `24 September 2026`.

### 2:30–3:45 – Wohnsitzanmeldung

- [x] Detailansicht aus dem Hannover-Aufgabenkatalog rendern.
- [x] benötigte Unterlagen anzeigen.
- [x] Online- und Bürgeramt-Variante anzeigen.
- [x] offizielle Quellen und `checkedAt` anzeigen.
- [x] Abschluss-Checkbox und Fortschrittsänderung implementieren.

**Gate 4:** Der vollständige Golden Path funktioniert ohne manuelle Datenkopien in den Komponenten.

### 3:45–4:15 – Feature-Freeze

- [x] Produktionsbuild ausführen.
- [x] Golden Path einmal vollständig durchlaufen.
- [x] offene Fehler nach Schwere sortieren.
- [x] alle nicht stabilen Bonusfunktionen deaktivieren.

Nur wenn Gate 4 bereits erfüllt ist, darf genau **ein** Bonus gewählt werden:

1. EU-Preset, oder
2. `localStorage`, oder
3. Firecrawl-/OpenAI-Content-Compiler, falls Zugänge und Test bereits vorbereitet sind.

### 4:15–5:30 – Qualität

- [x] 360-px-Ansicht ohne horizontales Scrollen prüfen.
- [ ] Tastaturbedienung und sichtbare Fokuszustände prüfen.
- [ ] Fall `Not yet moved in` ohne erfundene Frist prüfen.
- [x] externe Links und Scope `City of Hannover` prüfen.
- [x] Browser-Konsole auf Fehler prüfen.
- [x] Produktionsbuild erneut ausführen.

### 5:30–6:30 – Deployment und Pitch

- [ ] Anwendung deployen.
- [ ] Deployment in einem frischen Browser öffnen.
- [ ] Golden Path auf Smartphone testen.
- [ ] Drei-Minuten-Pitch zweimal mit Stoppuhr proben.
- [ ] einen Screenshot oder ein kurzes Backup-Video bereithalten.

### 6:30–8:00 – Puffer

- [ ] nur Blocker und sichtbare Fehler beheben.
- [ ] finalen Deployment-Smoke-Test durchführen.
- [ ] Pitch ein letztes Mal proben.

Keine neue Zielgruppe, Sprache, Karte, Dokumentenanalyse, Avatar- oder Chatfunktion beginnen.

## Solo-Streichliste

Bei Zeitdruck in dieser Reihenfolge entfernen:

1. Firecrawl-/OpenAI-Content-Compiler
2. EU-Preset
3. `localStorage`
4. deutsche Texte in der Oberfläche
5. Animationen und zusätzliche visuelle Politur

Nicht streichen:

- Maya-Golden-Path
- Fristberechnung
- Wohnsitzanmeldungs-Detail
- offizielle Quellen
- funktionierendes Deployment

## Testmatrix

| Priorität | Fall | Erwartung |
|---|---|---|
| Pflicht | Maya / Non-EU / Study / moved in 10 Sep | 6 Tasks, Anmeldung fällig 24 Sept |
| Pflicht | Non-EU / Study / not moved in | keine berechnete Anmeldefrist |
| Pflicht | Maya, Anmeldung abgeschlossen | Fortschritt 1/6; Folgeaufgaben bereit |
| Pflicht | Seite bei 360 px | kein Clipping oder horizontales Scrollen |
| Bonus | Sofia / EU / Work / moved in 10 Sep | 5 Tasks, kein Aufenthaltstitel |

## Drei-Minuten-Pitch

1. **0:00–0:25:** Verteilte Informationen erzeugen Unsicherheit; Menschen brauchen eine persönliche Reihenfolge.
2. **0:25–0:50:** Maya-Profil laden.
3. **0:50–1:30:** Frist, Reihenfolge und Abhängigkeiten im Fahrplan zeigen.
4. **1:30–2:25:** Hannover-spezifische Wohnsitzanmeldung mit Unterlagen und beiden Wegen zeigen.
5. **2:25–2:40:** Aufgabe abschließen und nächsten Schritt freischalten.
6. **2:40–3:00:** Vision: weitere Kommunen, Lebenslagen und sichere Dokumentenunterstützung.

## Was du vor dem Hackathon vorbereitest

- Codex und Repository-Zugriff testen.
- Node.js und den gewählten Paketmanager prüfen.
- Deployment-Zugang testen.
- Nur bei geplantem Content-Compiler: Firecrawl- und OpenAI-Zugang vorher einrichten und API-Schlüssel lokal als Umgebungsvariablen bereithalten.
- Die Präsentation offline verfügbar machen.
