import React from "react";
import {
  StyledRegisterCard,
  StyledRegisterTitle,
  StyledRegisterWrapper,
} from "./index.styled";
import { Input } from "@mantine/core";
import { IconAt, IconSquareAsterisk, IconUserEdit } from "@tabler/icons-react";
import { Button } from "@mantine/core";
import { Formik } from "formik";
import * as Yup from "yup";

export default function Register() {
  return (
    <Formik
      initialValues={{
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={(values) => {
        // console.log(values);
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required("Ime mora biti uneto")
          .min(2, "Ime mora imati najmanje 2 karaktera")
          .max(20, "Ime može imati najviše 20 karaktera"),
        surname: Yup.string()
          .required("Prezime mora biti uneto")
          .min(2, "Prezime mora imati najmanje 2 karaktera")
          .max(20, "Prezime može imati najviše 20 karaktera"),
        email: Yup.string()
          .required("Email adresa mora biti uneta")
          .email("Neispravna email adresa"),
        password: Yup.string()
          .required("Lozinka mora biti uneta")
          .min(8, "Lozinka mora imati najmanje 8 karaktera")
          .max(20, "Lozinka može imati najviše 20 karaktera")
          .matches(
            /^(?=.*[A-Z])(?=.*[0-9])/,
            "Lozinka mora sadržati barem jedno veliko slovo i barem jedan broj"
          ),
        confirmPassword: Yup.string()
          .required("Potvrda lozinke mora biti uneta")
          .oneOf([Yup.ref("password"), null], "Lozinke se ne poklapaju"),
      })}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => {
        return (
          <StyledRegisterWrapper>
            <StyledRegisterCard>
              <StyledRegisterTitle>Registracija</StyledRegisterTitle>
              <Input.Wrapper
                id="input-demo"
                withAsterisk
                label="Unesite vaše ime"
                //   description="Please enter your credit card information, we need some money"
                error={errors.name && touched.name ? errors.name : ""}
              >
                <Input
                  icon={<IconUserEdit />}
                  placeholder="Dželal"
                  style={{ width: 400 }}
                  value={values.name}
                  onChange={(event) => {
                    const capitalizedValue =
                      event.target.value.charAt(0).toUpperCase() +
                      event.target.value.slice(1);
                    setFieldValue("name", capitalizedValue);
                  }}
                  type="text"
                />
              </Input.Wrapper>
              <Input.Wrapper
                id="input-demo"
                withAsterisk
                label="Unesite vaše prezime"
                //   description="Please enter your credit card information, we need some money"
                error={errors.surname && touched.surname ? errors.surname : ""}
              >
                <Input
                  icon={<IconUserEdit />}
                  placeholder="Dupljak"
                  style={{ width: 400 }}
                  value={values.surname}
                  onChange={(event) => {
                    const capitalizedValue =
                      event.target.value.charAt(0).toUpperCase() +
                      event.target.value.slice(1);
                    setFieldValue("surname", capitalizedValue);
                  }}
                  type="text"
                />
              </Input.Wrapper>
              <Input.Wrapper
                id="input-demo"
                withAsterisk
                label="Unesite vaš email"
                //   description="Please enter your credit card information, we need some money"
                error={errors.email && touched.email ? errors.email : ""}
              >
                <Input
                  icon={<IconAt />}
                  placeholder="email@gmail.com"
                  style={{ width: 400 }}
                  value={values.email}
                  onChange={(event) =>
                    setFieldValue("email", event.target.value)
                  }
                  type="email"
                />
              </Input.Wrapper>
              <Input.Wrapper
                id="input-demo"
                withAsterisk
                label="Unesite lozinku"
                //   description="Please enter your credit card information, we need some money"
                error={
                  errors.password && touched.password ? errors.password : ""
                }
              >
                <Input
                  icon={<IconSquareAsterisk />}
                  placeholder="********"
                  style={{ width: 400 }}
                  value={values.password}
                  onChange={(event) =>
                    setFieldValue("password", event.target.value)
                  }
                  type="password"
                />
              </Input.Wrapper>
              <Input.Wrapper
                id="input-demo"
                withAsterisk
                label="Potvrdite lozinku"
                //   description="Please enter your credit card information, we need some money"
                error={
                  errors.confirmPassword && touched.confirmPassword
                    ? errors.confirmPassword
                    : ""
                }
              >
                <Input
                  icon={<IconSquareAsterisk />}
                  placeholder="********"
                  style={{ width: 400 }}
                  value={values.confirmPassword}
                  onChange={(event) =>
                    setFieldValue("confirmPassword", event.target.value)
                  }
                  type="password"
                />
              </Input.Wrapper>
              <Button
                radius="md"
                size="md"
                fullWidth={400}
                onClick={handleSubmit}
              >
                Registruj se
              </Button>
            </StyledRegisterCard>
          </StyledRegisterWrapper>
        );
      }}
    </Formik>
  );
}
