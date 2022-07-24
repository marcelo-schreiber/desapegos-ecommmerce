import React, { useState } from 'react';

// styles || components
import { FaEnvelopeOpen } from 'react-icons/fa';

import Ripples from 'react-ripples';

// form
import axios from 'axios';
import ReactLoading from 'react-loading';

// toast pop-up
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NextPage } from 'next/types';
import Header from '../components/Header/Header';
import formSchema from '../utils/formSchema';

const Contact: NextPage = () => {
  const [serverState, setServerState] = useState({
    submitting: false,
  });

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    motivo: '',
    detalhes: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    e.preventDefault();

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await formSchema.validate(formData);
      const form: any = e.target;
      setServerState({ submitting: true });
      axios({
        method: 'post',
        url: '',
        data: new FormData(form),
      })
        .then(() => {
          toast.success('Seu email foi enviado');
          handleServerResponse(true);
        })
        .catch(() => {
          toast.error('Um erro ocorreu ao enviar seu email');
          handleServerResponse(false);
        });
    } catch (e: any) {
      toast.error(e?.message ?? 'Um erro aconteceu :(');
    }
  };

  const handleServerResponse = (ok: boolean) => {
    setServerState({
      submitting: false,
    });
    if (ok)
      setFormData({
        nome: '',
        email: '',
        motivo: '',
        detalhes: '',
      });
  };

  return (
    <>
      <Head>
        <title>Palivendas | Contato</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="title" content="Palivendas: Contato" />
      </Head>
      <Header index={3} />
      <ToastContainer />
      <ContactTitleWrapper>
        <FaEnvelopeOpen size={36} style={{ margin: '0 auto' }} />
        <ContactTitle>Envie um email</ContactTitle>
      </ContactTitleWrapper>

      <ContactForm onSubmit={handleSubmit}>
        <Input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          maxLength={100}
          minLength={2}
        />
        <Input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          maxLength={100}
          minLength={6}
        />
        <Select name="motivo" value={formData.motivo} onChange={handleChange}>
          <option value="" disabled hidden>
            Motivo
          </option>
          <option>Dúvida sobre a entrega</option>
          <option>Dúvida sobre o produto</option>
          <option>Dúvida sobre o pagamento</option>
          <option>Duvida sobre o site</option>
          <option>Reclamação</option>
          <option>Outro</option>
        </Select>
        <Textarea
          placeholder="Detalhes"
          value={formData.detalhes}
          onChange={handleChange}
          maxLength={310}
          minLength={6}
          name="detalhes"
        />
        <Ripples>
          <SendEmailButton type="submit">
            {serverState.submitting ? (
              <ReactLoading
                type="spinningBubbles"
                color="#FFF"
                height={20}
                width={20}
              />
            ) : (
              'Enviar'
            )}
          </SendEmailButton>
        </Ripples>
      </ContactForm>
    </>
  );
};

import styled from 'styled-components';
import Head from 'next/head';

const ContactTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContactTitle = styled.h2`
  font-weight: 600;
  font-size: 4.5rem;

  text-align: center;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  height: 60rem;
`;

const Input = styled.input`
  background: #ffffff;

  border: 2px solid #d4d4d8;
  box-sizing: border-box;
  border-radius: 4px;

  height: 6.6rem;
  width: 60rem;

  max-width: 95vw;

  font-size: 2rem;

  padding-left: 1.2rem;
`;

const Select = styled.select`
  background: #ffffff;

  border: 2px solid #d4d4d8;
  box-sizing: border-box;
  border-radius: 4px;

  height: 6.6rem;
  width: 60rem;

  font-size: 2rem;

  color: #757575;

  padding-left: 1.2rem;

  max-width: 95vw;
`;

const Textarea = styled.textarea`
  background: #ffffff;

  border: 2px solid #d4d4d8;
  box-sizing: border-box;
  border-radius: 4px;

  height: 6.6rem;
  width: 60rem;

  font-style: normal;
  font-weight: normal;
  font-size: 2rem;

  color: #757575;

  padding-left: 1.2rem;
  padding-top: 0.6rem;
  height: 22.6rem;

  resize: vertical;

  max-width: 95vw;
`;

const SendEmailButton = styled.button`
  font-size: 2.88rem;

  padding: 1.8rem 4rem;

  border-radius: 15px;

  color: #fff;
  border: none;

  cursor: pointer;

  transition: 0.2s ease-in;

  margin: 0;

  background-color: #ac6411;

  :hover {
    background-color: #78460c;
  }
`;

export default Contact;
