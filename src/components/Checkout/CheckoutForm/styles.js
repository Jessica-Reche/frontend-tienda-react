import styled from "@emotion/styled";



export const AppBar = styled.div`
  position: relative;
`;

export const Layout = styled.div`
  width: auto;
  margin-left: ${(props) => props.theme.spacing(2)}px;
  margin-right: ${(props) => props.theme.spacing(2)}px;
  ${(props) => props.theme.breakpoints.up(600 + props.theme.spacing(2) * 2)} {
    width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Paper = styled.div`
  margin-top: ${(props) => props.theme.spacing(3)}px;
  margin-bottom: ${(props) => props.theme.spacing(3)}px;
  padding: ${(props) => props.theme.spacing(2)}px;
  ${(props) => props.theme.breakpoints.up(600 + props.theme.spacing(3) * 2)} {
    margin-top: ${(props) => props.theme.spacing(6)}px;
    margin-bottom: ${(props) => props.theme.spacing(6)}px;
    padding: ${(props) => props.theme.spacing(3)}px;
  }
`;

export const Stepper = styled.div`
  padding: ${(props) => props.theme.spacing(3)}px 0 ${(props) => props.theme.spacing(5)}px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.button`
  margin-top: ${(props) => props.theme.spacing(3)}px;
  margin-left: ${(props) => props.theme.spacing(1)}px;
`;
