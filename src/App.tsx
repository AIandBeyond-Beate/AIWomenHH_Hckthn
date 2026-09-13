import { useMemo, useState } from "react";
import catalog from "../planning/hannover-tasks.json";
import {
  calculateDueDate,
  formatDate,
  tasksForProfile,
  type DemoProfile,
  type Task,
} from "./plan";

type View = "welcome" | "plan" | "task";

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
        <span className="scope">City of Hannover</span>
      </header>

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

            <button className="primary-button" type="button" onClick={openPlan}>
              Use Maya’s demo profile
              <span aria-hidden="true">→</span>
            </button>

            <p className="trust-line">
              <span aria-hidden="true">✓</span> No account · No document upload ·
              Not legal advice
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
