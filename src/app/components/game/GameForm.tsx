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
import {
  DefaultValues,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  useForm
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { avatarMap, createGameSchema, CreateFormData, updateGameSchema } from '../../../functions';
import { useAddGame, useEditGame } from '../../hooks';
import { useParams } from 'react-router-dom';
import { useGameFormDefaultValues } from '../../hooks/useGameFormDefaultValues';

export function GameForm() {
  const { gameId } = useParams();

  const { isEdit, defaultValues, gameIdN } = useGameFormDefaultValues({ gameIdParams: gameId });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateFormData>({
    defaultValues,
    resolver: yupResolver(isEdit ? updateGameSchema : createGameSchema),
    mode: 'onTouched'
  });
  const onEdit = useEditGame({ gameId: gameIdN });
  const onSubmit = useAddGame();
  return (
    <div className="mw-800 mx-auto stack-inner">
      <header className="text-center">
        <h1>Nouveau match</h1>
      </header>
      <Card>
        <form className="stack-inner" onSubmit={handleSubmit(isEdit ? onEdit : onSubmit)}>
          <section className="stack-text">
            <h3>Paramètres du match</h3>
          </section>
          {!isEdit && <NumberOfSets register={register} errors={errors} />}
          {Array.from({ length: 2 }).map((_, i) => {
            return (
              <PlayerForm
                defaultValues={defaultValues}
                key={`player-form-${i}`}
                index={i}
                register={register}
                errors={errors}
              />
            );
          })}
          <footer className="flex-inline flex-inline--right">
            <ButtonLink btnType="default" to={'/'} size="lg">
              Retour aux matchs
            </ButtonLink>
            <Button type="submit" btnType="secondary" size="lg">
              {isEdit && 'Editer'} {!isEdit && 'Créer'} le match
            </Button>
          </footer>
        </form>
      </Card>
    </div>
  );
}

function PlayerForm<T extends FieldValues>({
  index,
  errors,
  register,
  defaultValues
}: {
  index: number;
  errors: FieldErrors<CreateFormData>;
  register: UseFormRegister<CreateFormData>;
  defaultValues: DefaultValues<T>;
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
          defaultValues={defaultValues}
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
  playerIndex,
  defaultValues
}: {
  name: Path<T>;
  register: UseFormRegister<T>;
  playerIndex: number;
  defaultValues: DefaultValues<T>;
}) {
  return (
    <div className="avatar-selector" key={`form-avatar-player-${playerIndex}`}>
      {Array.from(avatarMap).map(([avatarId], i) => {
        const id = `form-avatar-player-${playerIndex}-${i}`;
        const isChecked = defaultValues.players?.[playerIndex]?.avatarId === avatarId || i === 0;
        return (
          <div className="avatar-radio" key={id}>
            <input
              className="avatar-radio__input"
              id={id}
              {...register(name)}
              defaultChecked={isChecked}
              defaultValue={avatarId}
              type="radio"
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

function NumberOfSets({
  errors,
  register
}: {
  errors: FieldErrors<CreateFormData>;
  register: UseFormRegister<CreateFormData>;
}) {
  return (
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
  );
}
