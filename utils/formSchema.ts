import * as Yup from 'yup';

const formSchema = Yup.object().shape({
  nome: Yup.string().required('Um nome é necessário'),
  email: Yup.string().email('Email inválido').required('Um email é necessário'),
  motivo: Yup.string().required('Escolha um motivo válido'),
  detalhes: Yup.string().required('Um Detalhamento é necessário'),
});

export default formSchema;
