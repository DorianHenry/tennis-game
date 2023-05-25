export function FormError({ message }: { message: string | undefined }) {
  return <p className="form-error">{message}</p>;
}
