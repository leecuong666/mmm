export type KeyPaths<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}` | `${K}.${KeyPaths<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;
