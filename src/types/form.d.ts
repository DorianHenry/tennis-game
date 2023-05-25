export type InputProps<T extends FieldValues> = {
  name: Path<T>;
  register: UseFormRegister<T>;
};
