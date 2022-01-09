export const shortenAddress = (str: string) =>
  `${str.slice(0, 5)}...${str.slice(str.length - 4, str.length)}`;
