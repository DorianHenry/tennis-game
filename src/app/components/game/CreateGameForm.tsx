import { Button, FormTextInput } from '../ui';
import { useForm } from 'react-hook-form';

type FormData = {
  firstName: string;
  lastName: string;
};

export function CreateGameForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <form onSubmit={onSubmit}>
      <FormTextInput control={control} name="name" rules={{ required: true }} />
      {errors.firstName?.type === 'required' && <p role="alert">Le nom est requis</p>}
      <Button type="submit">Créer le match</Button>
    </form>
  );
}
