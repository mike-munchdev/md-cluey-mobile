export const truncate = (input: string, maxLength: number) =>
  input.length > maxLength ? `${input.substring(0, maxLength)}...` : input;
