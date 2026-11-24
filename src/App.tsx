import { useMemo, useState } from "react";
import catalog from "../planning/hannover-tasks.json";
import {
  calculateDueDate,
  formatDate,
  tasksForProfile,
  type DemoProfile,
  type Task,
} from "./plan";
import {
  extractFacts,
  isReadable,
  readPdfText,
  receivedDate,
  submitByDate,
  type LetterFacts,
} from "./letter";

type View = "welcome" | "intake" | "letter" | "plan" | "task";

const tasks = catalog.tasks as Task[];
const maya = catalog.demoProfiles.find(
  (profile) => profile.id === "maya_student",
) as DemoProfile;

function App() {
  const [view, setView] = useState<View>("welcome");
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [completionConfirmed, setCompletionConfirmed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const mayaTasks = useMemo(() => tasksForProfile(tasks, maya), []);
  const registrationTask = mayaTasks.find(
    (task) => task.id === "register_address",
  );
  const registrationDue = registrationTask
    ? calculateDueDate(registrationTask, maya)
    : null;
  const completedCount = completedTaskIds.size;
  const registrationCompleted = completedTaskIds.has("register_address");

  const [confirmReset, setConfirmReset] = useState(false);
  const [question, setQuestion] = useState("");
  const [facts, setFacts] = useState<LetterFacts | null>(null);
  const [letterDone, setLetterDone] = useState<Set<number>>(() => new Set());
  const [reading, setReading] = useState(false);
  const [readError, setReadError] = useState<string | null>(null);

  async function processPdf(data: ArrayBuffer) {
    setReading(true);
    setReadError(null);
    try {
      const result = extractFacts(await readPdfText(data));
      if (!isReadable(result)) {
        setReadError(
          "We could not find a deadline or a document list in this PDF. Try the demo letter.",
        );
        return;
      }
      setFacts(result);
      setLetterDone(new Set());
      setView("letter");
      window.scrollTo(0, 0);
    } catch {
      setReadError("This file could not be read. Please use a text-based PDF.");
    } finally {
      setReading(false);
    }
  }

  async function useDemoLetter() {
    const response = await fetch(
      `${import.meta.env.BASE_URL}demo-behoerdenbrief.pdf`,
    );
    await processPdf(await response.arrayBuffer());
  }

  async function onFileChosen(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) await processPdf(await file.arrayBuffer());
  }

  function toggleLetterItem(index: number) {
    setLetterDone((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function resetAll() {
    setCompletedTaskIds(new Set());
    setCompletionConfirmed(false);
    setShowSuccess(false);
    setConfirmReset(false);
    setQuestion("");
    setFacts(null);
    setLetterDone(new Set());
    setReadError(null);
    setView("welcome");
    window.scrollTo(0, 0);
  }

  function openPlan() {
    setShowSuccess(false);
    setView("plan");
  }

  function openRegistration() {
    setCompletionConfirmed(registrationCompleted);
    setShowSuccess(false);
    setView("task");
  }

  function completeRegistration() {
    if (!completionConfirmed || registrationCompleted) return;

    setCompletedTaskIds((current) => {
      const next = new Set(current);
      next.add("register_address");
      return next;
    });
    setShowSuccess(true);
    setView("plan");
  }

  function taskStatus(task: Task, index: number) {
    if (completedTaskIds.has(task.id)) return "Completed";
    if (index === 0) return "Do this first";
    if (task.readiness.type === "after_task") {
      return registrationCompleted ? "Ready now" : "After registration";
    }
    return "Next";
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="AnkommenDE home">
          <span className="brand-mark" aria-hidden="true">
            ↳
          </span>
          <span>AnkommenDE</span>
        </a>
        {view === "welcome" ? (
          <span className="scope">City of Hannover</span>
        ) : (
          <button
            className="reset-button"
            type="button"
            onClick={() => setConfirmReset(true)}
          >
            ↺ Reset
          </button>
        )}
      </header>

      {confirmReset && (
        <div className="reset-confirm" role="alertdialog" aria-labelledby="reset-title">
          <p id="reset-title">
            <strong>Start over?</strong> All your progress will be deleted.
          </p>
          <div className="reset-actions">
            <button className="reset-yes" type="button" onClick={resetAll}>
              Yes, reset
            </button>
            <button
              className="reset-no"
              type="button"
              onClick={() => setConfirmReset(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <main id="top">
        {view === "welcome" && (
          <section className="welcome" aria-labelledby="welcome-title">
            <p className="eyebrow">STARTING IN GERMANY</p>
            <h1 id="welcome-title">
              Your next steps in Hannover, in the right order.
            </h1>
            <p className="lead">
              Start with Maya’s situation and see how a personal checklist turns
              official information into clear next steps.
            </p>

            <article className="profile-card">
              <div className="avatar" aria-hidden="true">
                M
              </div>
              <div>
                <p className="profile-name">Maya</p>
                <p className="profile-meta">
                  Non-EU student · Moved to Hannover on 10 September
                </p>
              </div>
              <span className="task-count">6 steps</span>
            </article>

            <button
              className="primary-button"
              type="button"
              onClick={() => setView("intake")}
            >
              Use Maya’s demo profile
              <span aria-hidden="true">→</span>
            </button>

            <p className="trust-line">
              <span aria-hidden="true">✓</span> No account · No document upload ·
              Not legal advice
            </p>
          </section>
        )}

        {view === "intake" && (
          <section className="intake" aria-labelledby="intake-title">
            <button
              className="text-button"
              type="button"
              onClick={() => setView("welcome")}
            >
              ← Back
            </button>
            <p className="eyebrow">MAYA’S DEMO PROFILE</p>
            <h1 id="intake-title">What do you need help with?</h1>
            <p className="lead">
              Upload a letter from an office. We read it on your device and turn
              it into a checklist.
            </p>

            <label className="field-label" htmlFor="question">
              Your question (optional)
            </label>
            <textarea
              id="question"
              className="text-area"
              rows={3}
              value={question}
              placeholder="e.g. What do I have to do now, and by when?"
              onChange={(event) => setQuestion(event.target.value)}
            />

            <button
              className="primary-button"
              type="button"
              disabled={reading}
              onClick={useDemoLetter}
            >
              {reading ? "Reading letter…" : "Use the demo letter (PDF)"}
              <span aria-hidden="true">→</span>
            </button>
            <label className="secondary-button">
              Or choose your own PDF
              <input
                type="file"
                accept="application/pdf"
                onChange={onFileChosen}
                hidden
              />
            </label>
            {readError && (
              <p className="error-text" role="alert">
                {readError}
              </p>
            )}
            <p className="trust-line">
              <span aria-hidden="true">✓</span> Your file stays on this device ·
              No account · Not legal advice
            </p>
          </section>
        )}

        {view === "letter" && facts && (
          <section className="letter" aria-labelledby="letter-title">
            <button
              className="text-button"
              type="button"
              onClick={() => setView("intake")}
            >
              ← Back
            </button>
            <p className="eyebrow">WHAT YOUR LETTER SAYS</p>
            <h1 id="letter-title">You have to send documents. Time is limited.</h1>
            {question.trim() && (
              <p className="question-echo">
                <strong>Your question:</strong> “{question.trim()}”
              </p>
            )}

            {(() => {
              const due = submitByDate(facts);
              return (
                due && (
                  <div className="deadline" role="status">
                    <span className="deadline-icon" aria-hidden="true">!</span>
                    <div>
                      <strong>Submit by {formatDate(due)}</strong>
                      <span>
                        {facts.deadlineDays} days after receipt. Receipt counts
                        from{" "}
                        {facts.letterDate &&
                          formatDate(receivedDate(facts.letterDate))}
                        .
                      </span>
                    </div>
                  </div>
                )
              );
            })()}

            <dl className="fact-list">
              {facts.recipient && (
                <>
                  <dt>Addressed to</dt>
                  <dd>{facts.recipient}</dd>
                </>
              )}
              {facts.address && (
                <>
                  <dt>Address</dt>
                  <dd>{facts.address}</dd>
                </>
              )}
              {facts.fileNumber && (
                <>
                  <dt>File number</dt>
                  <dd>{facts.fileNumber}</dd>
                </>
              )}
              {facts.letterDate && (
                <>
                  <dt>Letter date</dt>
                  <dd>{formatDate(facts.letterDate)}</dd>
                </>
              )}
              {facts.moveInDate && (
                <>
                  <dt>Move-in date (per office)</dt>
                  <dd>{formatDate(facts.moveInDate)}</dd>
                </>
              )}
            </dl>

            <p className="section-kicker">WHY YOU GOT THIS LETTER</p>
            <p>
              Your address registration could not be completed. The landlord
              confirmation is missing a signature and the move-in date.
            </p>

            <p className="section-kicker">YOUR CHECKLIST</p>
            <ul className="letter-checklist">
              {facts.documents.map((doc, index) => (
                <li key={doc.de}>
                  <label>
                    <input
                      type="checkbox"
                      checked={letterDone.has(index)}
                      onChange={() => toggleLetterItem(index)}
                    />
                    <span>
                      <strong>{doc.en}</strong>
                      <small>Original wording: {doc.de}</small>
                    </span>
                  </label>
                </li>
              ))}
              {facts.appointmentOnlineOnly && (
                <li>
                  <label>
                    <input
                      type="checkbox"
                      checked={letterDone.has(facts.documents.length)}
                      onChange={() => toggleLetterItem(facts.documents.length)}
                    />
                    <span>
                      <strong>Book an appointment in the online portal</strong>
                      <small>
                        No phone booking. If no slots show, try again later.
                      </small>
                    </span>
                  </label>
                </li>
              )}
            </ul>

            <p className="section-kicker">GOOD TO KNOW</p>
            <ul className="check-list">
              {facts.noEmail && (
                <li>Plain email is not accepted. Bring the originals in person.</li>
              )}
              {facts.fineMax && (
                <li>
                  A fine of up to {facts.fineMax} is possible for late
                  registration. You may answer in writing, but you do not have to.
                </li>
              )}
              <li>
                Registration passes your data to the broadcasting fee office
                (Beitragsservice).
              </li>
            </ul>

            <button className="primary-button" type="button" onClick={openPlan}>
              See my full Hannover plan <span aria-hidden="true">→</span>
            </button>
            <p className="source-note">
              Read from your PDF on this device · Check details with the office
              · Not legal advice
            </p>
          </section>
        )}

        {view === "plan" && (
          <section className="plan" aria-labelledby="plan-title">
            <button
              className="text-button"
              type="button"
              onClick={() => setView("welcome")}
            >
              ← Back
            </button>

            <div className="plan-heading">
              <div>
                <p className="eyebrow">MAYA’S PERSONAL PLAN</p>
                <h1 id="plan-title">Your first steps in Hannover</h1>
                <p className="profile-meta">Non-EU student · City of Hannover</p>
              </div>
              <div
                className="progress-copy"
                aria-label={`${completedCount} of ${mayaTasks.length} tasks completed`}
              >
                <strong>
                  {completedCount}/{mayaTasks.length}
                </strong>
                <span>completed</span>
              </div>
            </div>

            {showSuccess ? (
              <div className="success-message" role="status">
                <span aria-hidden="true">✓</span>
                <div>
                  <strong>Address registration completed.</strong>
                  <span>Your next steps are ready.</span>
                </div>
              </div>
            ) : registrationCompleted ? (
              <div className="success-message" role="status">
                <span aria-hidden="true">✓</span>
                <div>
                  <strong>Registration confirmation received.</strong>
                  <span>Your dependent tasks are now ready.</span>
                </div>
              </div>
            ) : (
              registrationDue && (
                <div className="deadline" role="status">
                  <span className="deadline-icon" aria-hidden="true">
                    !
                  </span>
                  <div>
                    <strong>
                      Register your address by {formatDate(registrationDue)}
                    </strong>
                    <span>Your two-week registration period has started.</span>
                  </div>
                </div>
              )
            )}

            <div className="progress-track" aria-hidden="true">
              <span
                style={{ width: `${(completedCount / mayaTasks.length) * 100}%` }}
              />
            </div>

            <ol className="task-list">
              {mayaTasks.map((task, index) => {
                const isCompleted = completedTaskIds.has(task.id);
                const isRegistration = task.id === "register_address";
                const status = taskStatus(task, index);

                return (
                  <li
                    className={`task-card${
                      index === 0 && !isCompleted ? " task-card--next" : ""
                    }${isCompleted ? " task-card--completed" : ""}`}
                    key={task.id}
                  >
                    <span className="task-number" aria-hidden="true">
                      {isCompleted ? "✓" : index + 1}
                    </span>
                    <div className="task-body">
                      <div className="task-title-row">
                        <h2>{task.title.en}</h2>
                        <span
                          className={`status${
                            index === 0 && !isCompleted ? " status--urgent" : ""
                          }${isCompleted ? " status--completed" : ""}`}
                        >
                          {status}
                        </span>
                      </div>
                      <p>{task.summary.en}</p>
                      {isRegistration && (
                        <button
                          className="task-link"
                          type="button"
                          onClick={openRegistration}
                        >
                          View details <span aria-hidden="true">→</span>
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>

            <p className="source-note">
              Official sources · Content checked {catalog.checkedAt}
            </p>
          </section>
        )}

        {view === "task" && registrationTask && (
          <section className="task-detail" aria-labelledby="task-title">
            <button className="text-button" type="button" onClick={openPlan}>
              ← Back to my plan
            </button>

            <p className="eyebrow">
              {registrationCompleted ? "COMPLETED" : "DO THIS FIRST"}
            </p>
            <h1 id="task-title">{registrationTask.title.en}</h1>
            {registrationDue && (
              <p className="detail-deadline">
                {registrationCompleted ? "Completed" : "Complete by"}{" "}
                <strong>{formatDate(registrationDue)}</strong>
              </p>
            )}
            <p className="lead detail-intro">
              Everyone living in Germany must register their address. In Hannover,
              the citizens’ offices—not the immigration office—handle registration.
            </p>

            <section className="detail-section" aria-labelledby="before-title">
              <p className="section-kicker">01 · PREPARE</p>
              <h2 id="before-title">Before you start</h2>
              <ul className="check-list">
                <li>You have moved into an address in the City of Hannover.</li>
                <li>
                  Your landlord or housing provider has given you a
                  Wohnungsgeberbestätigung.
                </li>
              </ul>
            </section>

            <section className="detail-section" aria-labelledby="documents-title">
              <p className="section-kicker">02 · DOCUMENTS</p>
              <h2 id="documents-title">What to bring</h2>
              <ul className="document-list">
                {registrationTask.documents.map((document) => (
                  <li key={document.en}>
                    <span aria-hidden="true">□</span> {document.en}
                  </li>
                ))}
              </ul>
              <p className="detail-note">
                The authority may request additional documents in individual cases.
              </p>
            </section>

            <section className="detail-section" aria-labelledby="route-title">
              <p className="section-kicker">03 · CHOOSE A ROUTE</p>
              <h2 id="route-title">Choose how to register</h2>
              <div className="route-grid">
                {registrationTask.variants?.map((variant) => (
                  <article className="route-card" key={variant.id}>
                    <span className="route-label">
                      {variant.id === "online" ? "OPTION A" : "OPTION B"}
                    </span>
                    <h3>{variant.title.en}</h3>
                    <p>{variant.description.en}</p>
                    {variant.note && (
                      <p className="language-hint">{variant.note.en}</p>
                    )}
                    <a
                      className="external-link"
                      href={variant.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {variant.actionLabel.en} <span aria-hidden="true">↗</span>
                    </a>
                  </article>
                ))}
              </div>
            </section>

            <section className="completion-card" aria-labelledby="completion-title">
              <p className="section-kicker">04 · FINISH</p>
              <h2 id="completion-title">Complete this step</h2>
              <label className="confirmation-row">
                <input
                  type="checkbox"
                  checked={completionConfirmed || registrationCompleted}
                  disabled={registrationCompleted}
                  onChange={(event) => setCompletionConfirmed(event.target.checked)}
                />
                <span>{registrationTask.completionCriterion.en}</span>
              </label>
              <button
                className="primary-button completion-button"
                type="button"
                disabled={!completionConfirmed || registrationCompleted}
                onClick={completeRegistration}
              >
                {registrationCompleted ? "Completed" : "Mark as completed"}
                <span aria-hidden="true">✓</span>
              </button>
            </section>

            <section className="sources" aria-labelledby="sources-title">
              <p className="section-kicker" id="sources-title">
                OFFICIAL SOURCES · CHECKED 12 SEP 2026
              </p>
              <ul>
                {registrationTask.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noreferrer">
                      {source.title} <span aria-hidden="true">↗</span>
                    </a>
                    <span>{source.publisher}</span>
                  </li>
                ))}
              </ul>
            </section>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
