export type CitizenshipGroup = "eu_eea_ch" | "non_eu";
export type Purpose = "study" | "work";

export interface DemoProfile {
  id: string;
  displayName: string;
  citizenshipGroup: CitizenshipGroup;
  purpose: Purpose;
  movedIn: boolean;
  moveInDate: string | null;
}

export interface LocalizedText {
  en: string;
  de?: string;
}

export interface TaskVariant {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  note?: LocalizedText;
  actionLabel: LocalizedText;
  url: string;
}

export interface TaskSource {
  title: string;
  publisher: string;
  url: string;
  checkedAt: string;
}

export interface Task {
  id: string;
  order: number;
  title: LocalizedText;
  summary: LocalizedText;
  audience: {
    citizenshipGroups: CitizenshipGroup[];
    purposes: Purpose[];
  };
  dueRule:
    | { type: "days_after"; field: "moveInDate"; days: number }
    | { type: "text_only"; text: { en: string; de?: string } }
    | { type: "none" };
  readiness: {
    type: "always" | "after_move_in" | "after_task";
    taskId?: string;
    dependencyMode?: "hard" | "advisory";
    blockedLabel: LocalizedText;
  };
  documents: LocalizedText[];
  steps: LocalizedText[];
  completionCriterion: LocalizedText;
  variants?: TaskVariant[];
  sources: TaskSource[];
}

export function tasksForProfile(tasks: Task[], profile: DemoProfile): Task[] {
  return tasks
    .filter(
      (task) =>
        task.audience.citizenshipGroups.includes(profile.citizenshipGroup) &&
        task.audience.purposes.includes(profile.purpose),
    )
    .sort((left, right) => left.order - right.order);
}

export function calculateDueDate(task: Task, profile: DemoProfile): Date | null {
  if (
    task.dueRule.type !== "days_after" ||
    task.dueRule.field !== "moveInDate" ||
    !profile.movedIn ||
    !profile.moveInDate
  ) {
    return null;
  }

  const dueDate = new Date(`${profile.moveInDate}T12:00:00`);
  dueDate.setDate(dueDate.getDate() + task.dueRule.days);
  return dueDate;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
