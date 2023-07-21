// General type mapping of actions for any reducer
export type tActionMap<T extends { [key: string]: any }> = {
  [Key in keyof T]: T[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: T[Key];
      };
};

// General type of dropdown options
export type tDropDownOption = {
  key: string | number;
  value: string | JSX.Element;
};

// General type to button block
export type tButtonBlock = { text: string; action: () => void }[];

// General type to custom confirm
export type tCustomConfirm = {
  text: string;
  ok: { text: string; action: (password?: string) => void };
  cancel: { text: string; action: () => void };
  encodedPassword?: string;
  setLoading?: (value: boolean) => void;
};
