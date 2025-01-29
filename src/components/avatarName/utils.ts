export const formatName = (name: string) => {
  const words = name.split(" ");

  if (words.length === 1) {
    return name.slice(0, 2).toUpperCase();
  }

  return (words[0][0] + words[1][0]).toUpperCase();
};

export const getConsistentColorIndex = (
  name: string,
  avatarColors: string[]
) => {
  const sum = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return sum % avatarColors.length;
};
