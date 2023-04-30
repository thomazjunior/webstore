import React from "react";
import { AiFillGithub, AiFillInstagram, AiFillFacebook } from "react-icons/ai";

import { SocialIcons } from "../Header/HeaderStyles";
import {
  CompanyContainer,
  FooterWrapper,
  LinkColumn,
  LinkItem,
  LinkList,
  LinkTitle,
  Slogan,
  SocialContainer,
  SocialIconsContainer,
} from "./FooterStyles";

const Footer = () => {
  return (
    <FooterWrapper>
      <LinkList>
        <LinkColumn>
          <LinkTitle>Contacto</LinkTitle>
          <LinkItem href="tel:+351914214983">+351 914214983</LinkItem>
        </LinkColumn>
        <LinkColumn>
          <LinkTitle>Email</LinkTitle>
          <LinkItem href="mailto:universodosvinho@gmail.com">
          universodovinho@gmail.com
          </LinkItem>
        </LinkColumn>
      </LinkList>
      <SocialIconsContainer>
        <CompanyContainer>
        </CompanyContainer>
        {/* <SocialIcons href="https://github.com/thomazjunior" target="_blank">
          <AiFillGithub size="3rem" />
        </SocialIcons> */}
        <SocialIcons href="https://www.facebook.com/people/Vinhos-Cad%C3%A3ocabe%C3%A7a-Do-POTE/100057610382914/?locale=pt_PT" target="_blank">
          <AiFillFacebook size="3rem" />
        </SocialIcons>
        <SocialIcons href="https://www.instagram.com/universodovinho/" target="_blank">
          <AiFillInstagram size="3rem" />
        </SocialIcons>
      </SocialIconsContainer>
    </FooterWrapper>
  );
};

export default Footer;
