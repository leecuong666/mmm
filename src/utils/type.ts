export type KeyPaths<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}` | `${K}.${KeyPaths<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;

export const getLabel = <T>(key: keyof T): string => {
  return String(key);
};
