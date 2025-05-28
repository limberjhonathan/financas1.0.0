export function getErrorFields(type?: string) {
  return {
    name: type === "all",
    email: ["all", "notEmail", "userExists"].includes(type ?? ""),
    password: ["all", "passwordsDontMatch", "shortPassword"].includes(type ?? ""),
    repeatPassword: ["all", "passwordsDontMatch", "shortPassword"].includes(type ?? ""),
  };
}
