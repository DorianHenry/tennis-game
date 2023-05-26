import {
  Button,
  Card,
  FormTextInput,
  FormError,
  Avatar,
  FormGroup,
  FormLabelRadio,
  ButtonLink
} from '../ui';
import { FieldErrors, FieldValues, Path, UseFormRegister, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { avatarMap, createGameSchema, CreateFormData } from '../../../functions';
import { useAddGame } from '../../hooks';

export function CreateGameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateFormData>({
    resolver: yupResolver(createGameSchema),
    mode: 'onTouched'
  });
  const onSubmit = useAddGame();
  return (
    <div className="mw-800 mx-auto stack-inner">
      <header className="text-center">
        <h1>Nouveau match</h1>
      </header>
      <Card>
        <form className="stack-inner" onSubmit={handleSubmit(onSubmit)}>
          <section className="stack-text">
            <h3>Paramètres du match</h3>
            <FormGroup>
              <div className="flex-inline">
                <FormLabelRadio
                  id={`number-of-sets-2`}
                  value={2}
                  defaultChecked={true}
                  name="numberOfSets"
                  register={register}
                >
                  Match en 2 set
                </FormLabelRadio>
                <FormLabelRadio
                  id={`number-of-sets-3`}
                  value={3}
                  defaultChecked={false}
                  name="numberOfSets"
                  register={register}
                >
                  Match en 3 set
                </FormLabelRadio>
              </div>
              {errors.numberOfSets && <FormError message={errors.numberOfSets.message} />}
            </FormGroup>
          </section>

          {Array.from({ length: 2 }).map((_, i) => {
            return (
              <PlayerForm key={`player-form-${i}`} index={i} register={register} errors={errors} />
            );
          })}
          <footer className="flex-inline flex-inline--right">
            <ButtonLink btnType="default" to={'/'} size="lg">
              Retour aux matchs
            </ButtonLink>
            <Button type="submit" btnType="secondary" size="lg">
              Créer le match
            </Button>
          </footer>
        </form>
      </Card>
    </div>
  );
}

function PlayerForm({
  index,
  errors,
  register
}: {
  index: number;
  errors: FieldErrors<CreateFormData>;
  register: UseFormRegister<CreateFormData>;
}) {
  return (
    <section className="form-player stack-text" key={`form-group-player${index}`}>
      <h3>Joueur {index + 1}</h3>
      <FormGroup>
        <FormTextInput name={`players.${index}.name`} register={register}>
          Nom
        </FormTextInput>
        {errors.players?.[index]?.name && (
          <FormError message={errors.players?.[index]?.name?.message} />
        )}
      </FormGroup>
      <FormGroup>
        <PlayerFormAvatars
          register={register}
          playerIndex={index}
          name={`players.${index}.avatarId`}
        />
        {errors.players?.[index]?.avatarId && (
          <FormError message={errors.players?.[index]?.avatarId?.message} />
        )}
      </FormGroup>
    </section>
  );
}

function PlayerFormAvatars<T extends FieldValues>({
  register,
  name,
  playerIndex
}: {
  name: Path<T>;
  register: UseFormRegister<T>;
  playerIndex: number;
}) {
  return (
    <div className="avatar-selector" key={`form-avatar-player-${playerIndex}`}>
      {Array.from(avatarMap).map(([avatarId], i) => {
        const id = `form-avatar-player-${playerIndex}-${i}`;
        return (
          <div className="avatar-radio" key={id}>
            <input
              className="avatar-radio__input"
              id={id}
              {...register(name)}
              defaultChecked={i === 0}
              type="radio"
              defaultValue={avatarId}
            />
            <label className="avatar-radio__label" htmlFor={id} key={id}>
              <Avatar avatarId={avatarId} />
            </label>
          </div>
        );
      })}
    </div>
  );
}
