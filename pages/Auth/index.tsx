import React from "react";
import { NextPage } from "next";

import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Image,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import { Field, FieldProps, Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";

import { useAuth } from "../../shared/context/AuthContext";

import { FcGoogle } from "react-icons/fc";

import AuthStyles from "./Auth.module.scss";

const signInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required."),
  password: Yup.string().required("Password is required."),
});

const signUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required."),
  password: Yup.string()
    .min(6, "Password is too short - should be 6 chars minimum")
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required."),
});

const Auth: NextPage = () => {
  const {
    loading,
    signInLoading,
    signUpLoading,
    googleAuthLoading,
    signInWithGoogle,
    signInWithPassword,
    signUpWithPassword,
  } = useAuth();

  const [signInValues /*setSignInValues*/] = React.useState<FormikValues>({
    email: "",
    password: "",
  });

  const [signUpValues /*setSignUpValues*/] = React.useState<FormikValues>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const signInUsingEmailAndPassword = (credentials: Record<string, string>) => {
    signInWithPassword(credentials);
  };

  const signUpUsingEmailAndPassword = (credentials: Record<string, string>) => {
    signUpWithPassword(credentials);
  };

  // React.useEffect(() => {
  //   console.log(user, error, isLoggedIn);
  // }, [user, error, isLoggedIn]);

  return (
    <Flex
      as="section"
      h={"100%"}
      minH={450}
      className={`${AuthStyles.Auth}`}
      zIndex={0}
      position={"relative"}
    >
      <Box className={`${AuthStyles.Auth__kite}`}>
        <Image
          opacity={0.5}
          src="https://img.freepik.com/free-vector/gradient-network-connection-background_23-2148865393.jpg?w=996&t=st=1671521667~exp=1671522267~hmac=3a84e7da37655b75f82423c9be3f561e34427dd52063c9400e0e9eb569868130"
        />
      </Box>

      <Grid
        w={"100%"}
        templateColumns={{
          md: "repeat(2, .5fr)",
          base: "repeat(2, 1fr)",
        }}
        alignItems={"center"}
        justifyContent={"end"}
        px={3}
      >
        <GridItem
          zIndex={100}
          w={"100%"}
          color={"#fff"}
          fontSize={56}
          fontWeight={"bold"}
          fontFamily={"monospace"}
          paddingLeft={48}
        >
          <p className="app-name"> Leave Management System</p>
        </GridItem>
        <GridItem w={"100%"}>
          <Box className={`${AuthStyles.Auth__formWrapper}`} mx="auto">
            <Tabs isFitted colorScheme={"custom.primary"}>
              <TabList>
                <Tab fontWeight={500} color={"#fff"}>
                  Sign in
                </Tab>
                {/* <Tab fontWeight={500}>Sign up</Tab> */}
              </TabList>

              <TabPanels>
                <TabPanel px={0} pb={0}>
                  <Formik
                    initialValues={signInValues}
                    validationSchema={signInSchema}
                    onSubmit={signInUsingEmailAndPassword}
                  >
                    {({ touched, errors }) => {
                      return (
                        <Form>
                          <Field name="email">
                            {({ field }: FieldProps) => (
                              <FormControl
                                isInvalid={!!(errors.email && touched.email)}
                                mb={3}
                              >
                                <FormLabel color={"#fff"} className="label">
                                  Email
                                </FormLabel>
                                <Input {...field} type={"email"} />
                                <FormErrorMessage>
                                  {errors.email as string}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>

                          <Field name="password">
                            {({ field }: FieldProps) => (
                              <FormControl
                                isInvalid={
                                  !!(errors.password && touched.password)
                                }
                                mb={3}
                              >
                                <FormLabel color={"#fff"} className="label">
                                  Password
                                </FormLabel>
                                <Input {...field} type={"password"} />
                                <FormErrorMessage>
                                  {errors.password as string}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>

                          <ButtonGroup w="100%" justifyContent={"end"}>
                            <Button
                              type="submit"
                              colorScheme="custom.primary"
                              isLoading={signInLoading}
                              disabled={loading}
                            >
                              Sign in
                            </Button>
                          </ButtonGroup>
                        </Form>
                      );
                    }}
                  </Formik>
                </TabPanel>

                <TabPanel px={0} pb={0}>
                  <Formik
                    initialValues={signUpValues}
                    validationSchema={signUpSchema}
                    onSubmit={signUpUsingEmailAndPassword}
                  >
                    {({ touched, errors }) => {
                      return (
                        <Form>
                          <Field name="email">
                            {({ field }: FieldProps) => (
                              <FormControl
                                isInvalid={!!(errors.email && touched.email)}
                                mb={3}
                              >
                                <FormLabel className="label">Email</FormLabel>
                                <Input {...field} type={"email"} />
                                <FormErrorMessage>
                                  {errors.email as string}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>

                          <Field name="password">
                            {({ field }: FieldProps) => (
                              <FormControl
                                isInvalid={
                                  !!(errors.password && touched.password)
                                }
                                mb={3}
                              >
                                <FormLabel className="label">
                                  Password
                                </FormLabel>
                                <Input {...field} type={"password"} />
                                <FormErrorMessage>
                                  {errors.password as string}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>

                          <Field name="confirmPassword">
                            {({ field }: FieldProps) => (
                              <FormControl
                                isInvalid={
                                  !!(
                                    errors.confirmPassword &&
                                    touched.confirmPassword
                                  )
                                }
                                mb={3}
                              >
                                <FormLabel>Confirm password</FormLabel>
                                <Input {...field} type={"password"} />
                                <FormErrorMessage>
                                  {errors.confirmPassword as string}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>

                          <ButtonGroup w="100%" justifyContent={"end"}>
                            <Button
                              type="submit"
                              colorScheme="custom.primary"
                              isLoading={signUpLoading}
                              disabled={loading}
                            >
                              Sign up
                            </Button>
                          </ButtonGroup>
                        </Form>
                      );
                    }}
                  </Formik>
                </TabPanel>
              </TabPanels>
            </Tabs>

            <Divider my={5} />

            <Button
              type="button"
              w={"100%"}
              gap={3}
              alignItems={"center"}
              isLoading={googleAuthLoading}
              disabled={loading}
              onClick={signInWithGoogle}
            >
              <>
                <FcGoogle size={20} />
                Sign in with Google
              </>
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Auth;
