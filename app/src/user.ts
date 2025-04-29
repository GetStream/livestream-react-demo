import humanId from "human-id";

export const avatarColors = [
  "#005AE0",
  "#55C0CF",
  "#09AA7F",
  "#7A60AB",
  "#D28038",
  "#DC2625",
];

export const fallbackAvatarColor = "#5E676E";

export function getUserData(name?: string) {
  return {
    name:
      name ??
      humanId({ capitalize: true, separator: " " })
        .split(" ")
        .slice(0, 2)
        .join(" "),
    custom: {
      color:
        avatarColors[Math.floor(Math.random() * avatarColors.length)] ??
        fallbackAvatarColor,
    },
  };
}
