import React, { useContext, useState } from "react";
import {
  StyledContainer,
  StyledErrorMessage,
  StyledLoginCard,
  StyledLoginTitle,
  StyledLoginWrapper,
  StyledInput,
} from "./index.styled";
import { Input } from "@mantine/core";
import { IconUser, IconSquareAsterisk } from "@tabler/icons-react";
import { Formik } from "formik";
import * as Yup from "yup";
import FormData from "form-data";
import { useMutation } from "react-query";
import { authMe, login } from "../../services/user";
import Spinner from "../../components/spinner";
import { AppContext } from "../../context";
import CustomButton from "../../components/customButton";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [waiting, setWaiting] = useState(false);
  const { setUser } = useContext(AppContext);

  const { mutate: meInformations, isLoading: gettingMeInformations } =
    useMutation((token) => authMe(token), {
      onSuccess: (res) => {
        localStorage.setItem("user", JSON.stringify(res));
        setUser(res);
        window.location.replace("/");
      },
      onError: (error) => {
        setWaiting(false);
        throw error;
      },
    });
  const { mutate: doAuth, isLoading } = useMutation((values) => login(values), {
    onSuccess: (res) => {
      if (res.access_token) {
        setErrorMessage("");
        localStorage.setItem("token", res.access_token);
        meInformations(res.access_token);
      } else {
        setWaiting(false);
        setErrorMessage("Pogrešan username ili lozinka");
      }
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
    },
  });

  return (
    <>
      {(isLoading || gettingMeInformations || waiting) && (
        <Spinner message="Prijavljivanje..." />
      )}
      <StyledContainer
        style={{
          display:
            isLoading || gettingMeInformations || waiting ? "none" : "flex",
        }}
      >
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={(values) => {
            const data = new FormData();
            data.append("username", values.username);
            data.append("password", values.password);
            setWaiting(true);
            doAuth(data);
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required("Username biti unet"),
            password: Yup.string().required("Lozinka mora biti uneta"),
          })}
        >
          {({ values, errors, touched, handleSubmit, setFieldValue }) => {
            return (
              <StyledLoginWrapper>
                <StyledLoginCard>
                  <StyledLoginTitle>Prijava</StyledLoginTitle>
                  <Input.Wrapper
                    id="input-demo"
                    withAsterisk
                    label="Unesite vaš username"
                    error={
                      errors.username && touched.username ? errors.username : ""
                    }
                  >
                    <StyledInput
                      icon={<IconUser />}
                      placeholder="Username"
                      // style={{ width: 400 }}
                      value={values.username}
                      onChange={(event) =>
                        setFieldValue("username", event.target.value)
                      }
                      type="username"
                    />
                  </Input.Wrapper>
                  <Input.Wrapper
                    id="input-demo"
                    withAsterisk
                    label="Unesite vašu lozinku"
                    error={
                      errors.password && touched.password ? errors.password : ""
                    }
                  >
                    <StyledInput
                      icon={<IconSquareAsterisk />}
                      placeholder="********"
                      // style={{ width: 400 }}
                      value={values.password}
                      onChange={(event) =>
                        setFieldValue("password", event.target.value)
                      }
                      type="password"
                    />
                  </Input.Wrapper>
                  {errorMessage && (
                    <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
                  )}
                  <CustomButton
                    text={"Uloguj se"}
                    onClick={handleSubmit}
                    size={"large"}
                  />
                </StyledLoginCard>
              </StyledLoginWrapper>
            );
          }}
        </Formik>
      </StyledContainer>
    </>
  );
}
