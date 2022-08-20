import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-end;

  padding: 4rem;

  background: #ffffff;
  border: 1px solid #cfcfcf;
  border-radius: 2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  position: relative;

  align-self: flex-start;
  justify-self: center;

  height: 100%;
  max-width: 95vw;

  @media only screen and (min-width: 1230px) {
    justify-self: flex-end;

    :nth-child(2n) {
      justify-self: flex-start;
    }
  }
`;

export const Discount = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;

  font-size: 2.65rem;
`;

export const CardPrice = styled.div`
  font-weight: normal;
  font-size: 2.65rem;

  display: flex;
  align-items: center;

  color: #020202;

  margin-bottom: 2rem;
`;

export const Price = styled.span`
  margin-left: 1rem;
  font-weight: bold;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;

  position: absolute;
  bottom: -3.5rem;

  right: 0;
  left: 0;
  max-width: 30rem;
  margin-left: auto;
  margin-right: auto;

  color: #fff;

  height: 7rem;

  cursor: pointer;

  border-radius: 2rem;
  padding: 10px 20px;

  border: none;

  font-size: 2rem;

  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2));

  font-weight: 600;

  transition: 0.2s ease-in;

  background-color: #c28c3a;

  :hover {
    background-color: #886229;
  }

  > svg {
    margin-left: 15px;

    width: 4.5rem;
    height: 4.5rem;
  }
`;

export const CardTitle = styled.h2`
  font-size: 2.304rem;

  max-width: 48rem;

  cursor: pointer;

  color: #020202;
`;
