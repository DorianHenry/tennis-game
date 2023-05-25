import { object, array, string, number, InferType } from 'yup';

export type CreateFormData = InferType<typeof createGameSchema>;
export const createGameSchema = object()
  .shape({
    numberOfSets: number()
      .required('Le nombre de sets est obligatoire')
      .oneOf([2, 3], `Le nombre de sets choisi n'existe pas`),
    players: array().of(
      object().shape({
        name: string()
          .required('Le nom requis')
          .min(2, 'Le nom doit contenir au moins 2 caractères')
          .max(13, 'Le nom doit contenir maximum 13 caractères'),
        avatarId: number()
          .required(`L'avatar requis`)
          .oneOf([1, 2, 3, 4, 5], `L'avatar choisi n'existe pas !`)
      })
    )
  })
  .required();
