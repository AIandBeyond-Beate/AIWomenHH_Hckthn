# Produktplan: persönlicher Behörden-Fahrplan für Neuankommende in Deutschland

Stand: 12. September 2026  
Arbeitstitel: **AnkommenDE** (Platzhalter, Name und Marke noch nicht geprüft)

**Bestätigte Hackathon-Rahmenbedingungen:** 6–8 Stunden, eine Person, Startgebiet Landeshauptstadt Hannover.

## 1. Produktidee

Die App übersetzt die persönliche Situation eines Menschen in einen verständlichen, priorisierten und lokal passenden Fahrplan für den Start in Deutschland.

**Kernversprechen:** „Sag uns, warum und wohin du nach Deutschland ziehst. Wir zeigen dir, was du wann, wo und mit welchen Unterlagen erledigen musst.“

Die App soll kein weiteres Lexikon mit langen Artikeln sein. Sie beantwortet handlungsorientiert:

- Was ist mein nächster Schritt?
- Bis wann muss ich ihn erledigen?
- Was muss vorher fertig sein?
- Welche Unterlagen brauche ich?
- Welche Stelle ist an meinem Wohnort zuständig?
- Woher stammt die Information und wie aktuell ist sie?

## 2. Problem und Chance

Neuankommende finden viele Informationen, aber verteilt über Bundes-, Landes- und Kommunalportale. Welche Schritte gelten, hängt unter anderem von Staatsangehörigkeit, Aufenthaltszweck, Aufenthaltsdauer, Familienstatus und Wohnort ab. Selbst ein allgemeiner Schritt wie die Wohnsitzanmeldung ist lokal organisiert; die elektronische Anmeldung ist nur dort verfügbar, wo die zuständige Behörde angeschlossen ist.

Bestehende Angebote wie „Make it in Germany“, BAMF-Angebote und Integreat liefern wertvolle verlässliche Informationen. Die Differenzierung dieses Produkts ist die **personalisierte Ausführungsebene**: Abhängigkeiten, Reihenfolge, Status, Fristen und konkrete nächste Aktion statt primär redaktioneller Navigation.

## 3. Zielgruppen

Langfristig:

- internationale Studierende und Auszubildende
- EU-/EWR-/Schweizer Bürgerinnen und Bürger
- Fachkräfte und Expats aus Drittstaaten
- Familiennachzug und mitziehende Angehörige
- Arbeitssuchende, Selbstständige und Forschende
- Geflüchtete und Schutzsuchende (eigener, fachlich geprüfter Pfad)
- Rückkehrende Deutsche und binational lebende Familien

Für den Hackathon werden zwei Presets mit kuratierten Beispieldaten gezeigt:

1. EU-Fachkraft
2. Nicht-EU-Studierende mit nationalem Visum

Das zweite Preset ist der primäre „Golden Path“ für die Präsentation. Ein Pfad für Nicht-EU-Fachkräfte ist als Datenbonus möglich, aber kein Abnahmekriterium.

## 4. Vollständige Produktvision

### A. Persönlicher Fahrplan

- kurzes Onboarding: Staatsangehörigkeitsgruppe, Zweck, Dauer, Zielort, Ankunftsdatum, Beschäftigungs-/Studienstatus, Familie
- regelbasierte Auswahl der relevanten Aufgaben
- Reihenfolge anhand von Abhängigkeiten
- Fristen, Prioritäten und Fortschritt
- Phasen: vor der Einreise, erste 14 Tage, erste 90 Tage, langfristig

### B. Geführte Aufgaben

Jede Aufgabe enthält:

- „Warum ist das relevant?“ in einfacher Sprache
- Voraussetzungen
- Dokumenten-Checkliste
- zuständige Stelle und offizieller Link
- erwartetes Ergebnis, z. B. Meldebescheinigung
- typische Stolperfallen
- Quelle, Prüfdatum und Hinweis, dass keine Rechtsberatung erfolgt

### C. Dokumenten- und Fristenmanager

- sichere Dokumentenablage
- Erkennung vorhandener bzw. fehlender Dokumente
- Ablaufdaten und Erinnerungen
- Export einer persönlichen Checkliste als PDF

### D. Lokale Ebene

- Zuständigkeits- und Behördenfinder anhand von Postleitzahl/Ort
- lokale Formulare, Online-Dienste und Terminlinks
- Hinweise auf Beratungsstellen

### E. Mehrsprachige Assistenz

- leichte, mehrsprachige Erklärungen
- kontextbezogene Fragen zur eigenen Checkliste
- Antworten nur mit belegten Quellen; bei Unsicherheit Weiterleitung an offizielle oder menschliche Beratung

### F. Partnerprodukt

- optionales Dashboard für Hochschulen, Arbeitgeber, Relocation-Services und Kommunen
- Einladungslinks für standardisierte Onboarding-Pfade
- aggregierte, datensparsame Fortschrittsansicht nur mit Einwilligung

## 5. Empfohlener Hackathon-MVP

### Eine Kernfunktion

**Personalisierter, interaktiver Behörden-Fahrplan**

Ein Nutzer beantwortet sechs bis acht Fragen und erhält sofort eine priorisierte Checkliste. Aufgaben lassen sich öffnen und abhaken; der Fortschritt bleibt lokal gespeichert.

### Eng gekoppelte zweite Funktion

**Geführte Detailansicht für die Wohnsitzanmeldung**

Sie zeigt Voraussetzungen, benötigte Unterlagen, die Zwei-Wochen-Frist, das erwartete Ergebnis und einen lokalen bzw. offiziellen Link. Damit wird sichtbar, wie aus einer generischen Aufgabe konkrete Handlungsfähigkeit wird.

Diese Kombination ist für einen Hackathon stärker als ein allgemeiner Chatbot: Der Nutzen ist sofort demonstrierbar, die Regeln sind testbar und sensible Dokumente müssen noch nicht verarbeitet werden.

### MVP-Scope

Enthalten:

- responsive Web-App/PWA
- Deutsch und Englisch
- zwei auswählbare Demo-Profile
- ausschließlich Landeshauptstadt Hannover; Stadt und Region werden nicht vermischt
- 6 kuratierte Aufgaben: Wohnsitz anmelden, Krankenversicherung, Bankkonto, Steuer-ID verstehen, ggf. Aufenthaltstitel und Rundfunkbeitrag
- Status: offen, blockiert, erledigt
- sichtbare Abhängigkeiten, Fristen und Quellen
- Speicherung im Browser
- „Profil ändern“ und Neuberechnung des Fahrplans

Nicht enthalten:

- Registrierung/Login
- Upload oder Analyse persönlicher Dokumente
- automatische Terminbuchung
- verbindliche Rechtsberatung oder vollständige Prüfung eines Einzelfalls
- flächendeckende kommunale Daten
- Unterstützung für das Umland bzw. die Region Hannover
- freie KI-Antworten ohne kuratierte Wissensbasis
- native iOS-/Android-App

## 6. Wichtigster Nutzerfluss

1. Landingpage: Nutzenversprechen und „Meinen Fahrplan erstellen“
2. Sprache wählen
3. Profilfragen beantworten
4. Ergebnis: drei nächste Aufgaben plus Gesamtfortschritt
5. Aufgabe „Wohnsitz anmelden“ öffnen
6. Unterlagen und Voraussetzungen prüfen
7. offiziellen/lokalen Dienst öffnen oder Aufgabe abhaken
8. Fahrplan aktualisiert sich; abhängige Aufgabe wird freigeschaltet

### Demo-Story

„Maya kommt aus Indien für ein Masterstudium in die Stadt Hannover und ist gestern eingezogen. Nach dem Onboarding sieht sie, dass die Wohnsitzanmeldung dringend ist. Die App zeigt ihr, dass in Hannover die Bürgerämter und nicht die Ausländerbehörde dafür zuständig sind, welche Unterlagen sie braucht und welche weiteren Schritte davon abhängen. Sie markiert die Anmeldung als erledigt; Bankkonto und weitere Aufgaben werden aktualisiert.“

## 7. Regel- und Inhaltsmodell

Das Produkt sollte nicht mit starren Personas arbeiten. Personas sind nur Demo-Abkürzungen. Die Regeln verwenden einzelne Profilmerkmale:

- `citizenship_group`: DE, EU/EWR/CH, Drittstaat
- `purpose`: Studium, Beschäftigung, Ausbildung, Familie, Selbstständigkeit, Schutz, Sonstiges
- `stay_duration`: bis 90 Tage, über 90 Tage
- `arrival_date` und `move_in_date`
- `city` bzw. `postal_code`
- `has_entry_visa`, `has_housing`, `has_health_insurance`
- `family_members`, `children`

Eine Aufgabe besteht mindestens aus:

- ID, Titel und Phase
- Anwendungsregel
- Priorität und Fristregel
- Voraussetzungen/Abhängigkeiten
- benötigte Unterlagen
- Abschlusskriterium
- nationale und lokale Quelle
- letztes Prüfdatum
- unterstützte Sprachen

Für den MVP reicht eine versionierte JSON-Datei. Später sollte daraus ein redaktionelles System mit Vier-Augen-Freigabe und Ablaufwarnungen werden.

### Vereinfachte MVP-Logik

Vier Fragen reichen für den Hackathon:

1. EU/EWR/Schweiz oder Drittstaat?
2. Studium oder Beschäftigung?
3. Schon in Hannover eingezogen?
4. Einzugsdatum?

Der Ort ist in der Demo fest auf **Landeshauptstadt Hannover** gesetzt. Damit müssen weder Postleitzahlen aufgelöst noch Zuständigkeiten für das Umland modelliert werden.

## 8. Technischer Zuschnitt

Empfehlung für den Hackathon:

- Frontend: React/Vite mit TypeScript oder ein bereits vorbereitetes Team-Template
- Styling: leichtes Komponenten-System, mobile-first
- Regeln/Inhalte: lokale JSON-/TypeScript-Dateien
- Zustand: Browser-Speicher (`localStorage`)
- Tests: Unit-Tests für Regelentscheidungen plus wenige End-to-End-Demoflüsse
- Hosting: statisches oder serverloses Deployment

Kein Backend, keine Datenbank, keine Authentifizierung und keine externe KI-API. In 6–8 Stunden sind sie Integrationsrisiken ohne notwendigen Mehrwert für die Kerndemo.

### Einsatz der verfügbaren Hackathon-Tools

**Empfohlene optionale Integration: Firecrawl + OpenAI**

Die Nutzer-App bleibt vollständig deterministisch. Zusätzlich kann ein kleines Build-Time-Skript als „Content Compiler“ entstehen:

1. Firecrawl liest eine freigegebene offizielle Hannover-Seite als sauberes Markdown ein.
2. Die OpenAI Responses API extrahiert daraus per strengem JSON-Schema Titel, Frist, Voraussetzungen, Unterlagen, zuständige Stelle, Quell-URL und Prüfdatum.
3. Ein Mensch prüft und genehmigt das Ergebnis.
4. Nur die freigegebene JSON-Datei wird von der App verwendet.

Die Ausgabe eines Modells darf niemals ungeprüft direkt als behördliche Handlungsanweisung veröffentlicht werden. Fällt die Integration aus oder dauert das Einrichten von Zugangsdaten länger als 20 Minuten, wird die vorbereitete statische JSON-Datei genutzt; der Golden Path darf davon nicht abhängen.

**Rolle der übrigen Tools**

- **Codex:** Entwicklungsbeschleuniger für App, Tests und Deployment; kein notwendiger Bestandteil der Laufzeit.
- **n8n:** später sinnvoll für regelmäßiges Quellenmonitoring und einen Freigabe-Workflow; im Hackathon nur verwenden, wenn eine fertige Instanz und Zugänge bereitstehen.
- **anymize AI:** sehr relevant für eine spätere Dokumentenprüfung, bevor sensible Daten an ein Sprachmodell gehen; im dokumentenfreien MVP nicht erforderlich.
- **Google Cloud / Vertex AI:** langfristig eine Option für Suche, RAG und Grounding; im MVP redundant zu einer einzelnen gewählten Modellintegration.
- **Featherless AI:** mögliche Alternative für Open-Weight-Modelle; nicht parallel zu OpenAI/Vertex integrieren.
- **Beyond Presence / HeyGen:** später für sprach- oder videogeführte Erklärungen denkbar, aber kein Kernproblem dieses MVPs.
- **Prior Labs / TabPFN:** erst relevant, wenn ausreichend tabellarische Nutzungsdaten für Vorhersagen oder Priorisierung vorhanden sind.
- **Bilt:** bis zur Klärung des konkreten Sponsorprodukts und seiner API nicht einplanen.

Für die spätere Version:

- API und Datenbank mit versionierten Inhalten
- Rollen für Redaktion und fachliche Freigabe
- Audit-Trail für Quellenänderungen
- verschlüsselte Dokumentenablage nur bei klarem Bedarf
- Schnittstellen zu offiziellen Portalen, sofern rechtlich und technisch verfügbar

## 9. Informationsqualität, Recht und Vertrauen

- ausschließlich offizielle Quellen als Primärbelege
- jede Aufgabe zeigt Quelle und „zuletzt geprüft am“
- bundesweite Grundregel und kommunale Abweichung getrennt darstellen
- klare Unsicherheitszustände: „Bitte bei zuständiger Stelle prüfen“
- keine Behauptung, eine behördliche oder rechtliche Beratung zu ersetzen
- im MVP keine sensiblen Dokumente oder unnötigen personenbezogenen Daten erheben
- Übersetzungen fachlich prüfen; maschinelle Übersetzung sichtbar kennzeichnen
- Barrierefreiheit und einfache Sprache von Beginn an berücksichtigen

## 10. Erfolgskriterien

Für den Hackathon:

- Fahrplan in unter zwei Minuten erzeugbar
- die zwei Demo-Profile liefern reproduzierbar unterschiedliche Pläne
- Nutzer erkennt innerhalb von zehn Sekunden die nächste Aktion
- Aufgabenabhängigkeiten funktionieren korrekt
- jede verbindliche Aussage hat eine sichtbare offizielle Quelle
- Demo funktioniert mobil und ohne Backend
- ein neuer Checkout lässt sich mit dokumentierten Befehlen starten und deployen

Für einen Pilot:

- Anteil der Nutzer, die das Onboarding abschließen
- Anteil, die innerhalb einer Sitzung eine Aufgabe abschließen oder einen offiziellen Link öffnen
- Zeit bis zur Identifikation der nächsten Aufgabe
- Zahl gemeldeter falscher/veralteter Hinweise
- subjektive Sicherheit vor/nach Nutzung

## 11. Hackathon-Ablauf (6–8 Stunden, eine Person)

### Arbeitsmodus

Eine Person verantwortet Produkt, Inhalt, Umsetzung, Test und Pitch. Codex unterstützt beim Erstellen und Prüfen des Codes. Es gibt nur einen Golden Path und einen Arbeitsstand; Integrationsaufwand zwischen Teammitgliedern entfällt.

Nach spätestens vier Stunden gilt Feature-Freeze. Danach werden nur noch Pflicht-Abnahme, Deployment und Pitch bearbeitet.

### Zeitboxen

**0:00–0:30 – Scope-Freeze**

- Golden Path bestätigen
- Starterprojekt und Deployment-Ziel prüfen
- statischen Aufgabenkatalog laden

**0:30–1:15 – Grundgerüst**

- Vite/React/TypeScript starten
- mobile Grundstruktur und Design-Tokens anlegen
- Hannover-Daten anbinden

**1:15–2:30 – Kernfluss**

- Welcome und Maya-Demoprofil
- personalisierten Fahrplan erzeugen
- Frist Einzugsdatum plus 14 Tage berechnen

**2:30–3:45 – Aufgabendetail**

- Wohnsitzanmeldung mit Unterlagen und beiden Wegen
- Quellen und Prüfdatum anzeigen
- Abschlusszustand und Fortschritt umsetzen

**3:45–4:15 – Feature-Freeze und Entscheidungspunkt**

- Golden Path vollständig testen
- nur bei stabilem Stand das EU-Preset ergänzen
- Firecrawl/OpenAI ausschließlich verwenden, wenn vorab fertig vorbereitet; kein Setup während dieser Phase

**4:15–5:30 – Qualität**

- mobile Ansicht und Tastaturbedienung prüfen
- Grenzfälle und Produktionsbuild testen
- Pflichtfehler beheben

**5:30–6:30 – Deployment und Pitch**

- deployen und frischen Aufruf testen
- Drei-Minuten-Demo zweimal proben

**6:30–8:00 – Puffer**

- nur Fehler beheben; keine Scope-Erweiterung

### Streichreihenfolge bei Zeitdruck

1. Firecrawl-/OpenAI-Content-Compiler streichen
2. EU-Preset streichen; nur den Studierenden-Golden-Path zeigen
3. `localStorage` streichen; Zustand nur während der Sitzung halten
4. deutsche Inhalte nicht in der Oberfläche verwenden
5. Politur reduzieren

Nicht streichen: korrekte Aufgabenreihenfolge, Wohnsitzanmeldungs-Detail, sichtbare Quellen und funktionierende Demo.

## 12. Roadmap nach dem MVP

### Phase 1: Validierung

- 5–10 Interviews je Kernzielgruppe
- Pilot mit einer Hochschule oder einem Arbeitgeber
- mehrere Städte und weitere Aufenthaltszwecke
- Feedback- und Fehler-melden-Funktion

### Phase 2: Verlässliche Plattform

- redaktionelles Backend
- Quellenmonitoring und Freigabeprozess
- Erinnerungen und Kalenderexport
- PDF-Export und sichere Konten
- Beratungsstellenfinder

### Phase 3: Assistenz und Transaktionen

- dokumentengestützte Vorbereitung
- mehrsprachiger, quellengebundener Assistent
- Vorbefüllen von Formularen, soweit zulässig
- offizielle Integrationen und Partner-Dashboard

## 13. Offene Produktentscheidungen

Vor der Umsetzung sind nur noch diese Entscheidungen nötig:

1. vorhandener Tech-Stack bzw. vorbereitetes Starterprojekt
2. MVP nur Englisch oder Deutsch und Englisch
3. B2C-Produkt oder zunächst B2B2C über Hochschule/Arbeitgeber/Kommune
4. wer Inhalte fachlich prüft und langfristig aktualisiert

## 14. Geprüfte Ausgangsquellen

- [Auswärtiges Amt: Visa für Deutschland](https://www.auswaertiges-amt.de/de/service/visa-und-aufenthalt/visa-207794)
- [Make it in Germany: FAQ zu den ersten Schritten](https://www.make-it-in-germany.com/de/service/faq)
- [Make it in Germany: Wohnen und Anmelden](https://www.make-it-in-germany.com/de/leben-in-deutschland/wohnen-mobilitaet/wohnen-anmelden)
- [Bundesportal: Wohnsitz anmelden](https://verwaltung.bund.de/leistungsverzeichnis/DE/leistung/99115005104001/herausgeber/BY-365/region/090000000000)
- [Make it in Germany: Krankenversicherung](https://www.make-it-in-germany.com/en/living-in-germany/money-insurance/health-insurance)
- [Make it in Germany: Bankkonto](https://www.make-it-in-germany.com/de/leben-in-deutschland/geld-versicherung/bankkonto)
- [BAMF-NAvI](https://bamf-navi.bamf.de/de/)
- [Integreat](https://integreat-app.de/en/)
- [Hannover: An-, Um- und Abmeldung](https://www.hannover.de/Leben-in-der-Region-Hannover/Verwaltungen-Kommunen/Die-Verwaltung-der-Landeshauptstadt-Hannover/Dezernate-und-Fachbereiche-der-LHH/Finanzen%2C-Ordnung-und-Feuerwehr/Fachbereich-%C3%96ffentliche-Ordnung/Standesamt-und-Staatsangeh%C3%B6rig%C2%ADkeit/Ausl%C3%A4nderangelegen%C2%ADheiten-und-Staatsangeh%C3%B6rigkeit/Anmeldungen%2C-Ummeldungen-und-Abmeldungen-Residence-registration%2C-change-of-address-and-deregistration)
- [Hannover: Terminvereinbarung in den Bürgerämtern](https://www.hannover.de/Leben-in-der-Region-Hannover/B%C3%BCrger-Service/B%C3%BCrger-Service-in-der-Landeshauptstadt-Hannover/Termine-bei-Beh%C3%B6rden-buchen/Terminvereinbarung-in-den-B%C3%BCrger%C3%A4mtern)
- [Hannover: Elektronische Wohnsitzanmeldung](https://www.hannover.de/Service/Presse-Medien/Landeshauptstadt-Hannover/Meldungsarchiv-f%C3%BCr-das-Jahr-2025/Wohnsitzanmeldung-in-Hannover-jetzt-online-m%C3%B6glich)
- [Hannover: Willkommensservice der Ausländerbehörde](https://www.hannover.de/view/content/600680/full/1/696901)
- [Hannover: InteGREAT](https://www.hannover.de/Leben-in-der-Region-Hannover/Verwaltungen-Kommunen/Die-Verwaltung-der-Landeshauptstadt-Hannover/Dezernate-und-Fachbereiche-der-LHH/Soziales-und-Integration/Fachbereich-Gesellschaftliche-Teilhabe/Die-Struktur/Einwanderungsstadt-Hannover/Grundsatzangelegenheiten-der-Einwanderung/WIR-2.0-Migration-und-Teilhabe/Die-Entstehung/Historische-Infos-zum-WIR-2.0/InteGREAT-Hannover-%E2%80%93-Orientierung-f%C3%BCr-neu-eingewanderte-auf-einen-Klick)
