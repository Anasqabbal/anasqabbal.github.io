export const commandNames = ["about", "contact", "projects", "education", "help", "clear"] as const;
export type CommandName = (typeof commandNames)[number];

export function normalizeCommand(value: string): string {
  return value.trim().replace(/^\/+/, "").toLowerCase().split(/\s+/)[0] ?? "";
}

export function resolveCommand(value: string): CommandName | null {
  const command = normalizeCommand(value);
  return commandNames.includes(command as CommandName) ? (command as CommandName) : null;
}
