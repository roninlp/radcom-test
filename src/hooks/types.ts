type BaseForm<T> = {
  width: T;
  height: T;
};

export type FormInputs = BaseForm<number>;

export type FormErrors = BaseForm<string[]>;

export type InputName = keyof FormInputs;
