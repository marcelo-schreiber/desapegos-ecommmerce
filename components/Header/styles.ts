import styled from "styled-components";

export const HeaderWrapper = styled.header<{ idx: number }>`
  display: flex;
  align-items: center;

  background-color: #efefef;

  padding: 3.1rem 6.6rem;

  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.13);

  margin-bottom: 8.45rem;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  a {
    margin: 0 6rem;
    color: #2b2929;

    font-family: "Poppins", --apple-system, sans-serif;
    font-size: 2.7rem;

    transition: 0.1s ease-in;

    cursor: pointer;

    :hover {
      color: #1a1919;
    }

    font-weight: 300;
  }

  a:nth-child(${(props) => props.idx}) {
    /* Adds semibold on current page nav */
    font-weight: 600;
  }

  @media only screen and (max-width: 890px) {
    flex-direction: column;
  }
`;

export const Logo = styled.img`
  @media only screen and (max-width: 890px) {
    width: 64px;
    height: 64px;
    margin-bottom: 2.2rem;
  }
`;
