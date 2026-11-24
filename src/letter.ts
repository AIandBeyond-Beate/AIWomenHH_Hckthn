import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

export type LetterDocument = { de: string; en: string };

export type LetterFacts = {
  recipient: string | null;
  address: string | null;
  fileNumber: string | null;
  letterDate: Date | null;
  moveInDate: Date | null;
  deadlineDays: number | null;
  fineMax: string | null;
  documents: LetterDocument[];
  noEmail: boolean;
  appointmentOnlineOnly: boolean;
};

export async function readPdfText(data: ArrayBuffer): Promise<string> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
  const pdf = await pdfjs.getDocument({ data: new Uint8Array(data) }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text +=
      content.items.map((item) => ("str" in item ? item.str : "")).join(" ") +
      " ";
  }
  return text.replace(/\s+/g, " ").trim();
}

function parseDate(value: string | undefined): Date | null {
  if (!value) return null;
  const [d, m, y] = value.split(".").map(Number);
  return new Date(y, m - 1, d);
}

// Known document types → plain-English explanation. Anything else is shown as-is.
const DOCUMENT_HINTS: { match: RegExp; en: string }[] = [
  {
    match: /Wohnungsgeberbestätigung/i,
    en: "Landlord confirmation (Wohnungsgeberbestätigung) on the official form, original, signed by your landlord",
  },
  {
    match: /Reisedokument/i,
    en: "Valid passport or travel document (certified translation if not in Latin script)",
  },
  {
    match: /Aufenthaltsrecht|Freizügigkeit/i,
    en: "Proof of your right to stay in Germany, if applicable",
  },
  {
    match: /ZWS-1|Hauptwohnung/i,
    en: "Form ZWS-1 (main residence declaration). Fill it in and sign it, even with only one home",
  },
];

export function extractFacts(text: string): LetterFacts {
  const recipient =
    text.match(/\b(?:Frau|Herr)\s+([A-ZÄÖÜ][^\d]{3,60}?)\s+(?=\S+\s?(?:str|Str|weg|platz|allee)\S*\s*\d)/)?.[1] ??
    null;
  const address =
    text.match(/([A-ZÄÖÜ][\wäöüß.\-]*(?:straße|str\.|weg|platz|allee)\s*\d+\w?(?:,\s*Zi\.\s*\d+)?)\s+(\d{5}\s+[A-ZÄÖÜ]\w+)/)?.slice(1, 3).join(", ") ??
    null;
  const fileNumber = text.match(/Aktenzeichen:\s*([\w.\-/]+)/)?.[1] ?? null;
  const letterDate = parseDate(text.match(/Datum:\s*(\d{2}\.\d{2}\.\d{4})/)?.[1]);
  const moveInDate = parseDate(
    text.match(/Wohnung\s+bereits\s+am\s+(\d{2}\.\d{2}\.\d{4})\s+bezogen/)?.[1],
  );
  const deadlineDays = Number(text.match(/Frist\s+von\s+(\d+)\s+Tagen/)?.[1]) || null;
  const fineMax = text.match(/bis\s+zu\s+([\d.,]+\s*Euro)/)?.[1] ?? null;

  const documents: LetterDocument[] = [];
  const list = text.match(/vorzulegen:\s*(.*?)\s*Die Vorlage hat/)?.[1] ?? "";
  for (const raw of list.split(/\s(?=\d\.\s)/)) {
    const de = raw.replace(/^\d\.\s*/, "").trim();
    if (!de) continue;
    const hint = DOCUMENT_HINTS.find((h) => h.match.test(de));
    documents.push({ de, en: hint?.en ?? de });
  }

  return {
    recipient,
    address,
    fileNumber,
    letterDate,
    moveInDate,
    deadlineDays,
    fineMax,
    documents,
    noEmail: /einfache[rn]? E-Mail[^.]*ausgeschlossen/.test(text),
    appointmentOnlineOnly: /ausschließlich nach vorheriger Terminvereinbarung über das Online-Terminportal/.test(text),
  };
}

// Letter counts as received on the 3rd day after posting (§ 41 Abs. 2 VwVfG, as stated in the letter).
export function receivedDate(letterDate: Date): Date {
  const d = new Date(letterDate);
  d.setDate(d.getDate() + 3);
  return d;
}

export function submitByDate(facts: LetterFacts): Date | null {
  if (!facts.letterDate || !facts.deadlineDays) return null;
  const d = receivedDate(facts.letterDate);
  d.setDate(d.getDate() + facts.deadlineDays);
  return d;
}

export function isReadable(facts: LetterFacts): boolean {
  return facts.documents.length > 0 && !!facts.letterDate;
}
