export const commandNames = ["about", "connect", "projects", "education", "help", "clear"];
export const normalizeCommand = (input: string) => input.trim().toLowerCase().replace(/^\/+/, "");
