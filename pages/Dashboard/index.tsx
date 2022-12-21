import React from "react";
import { NextPage } from "next";

import { Box } from "@chakra-ui/react";

import withAuth from "../../shared/HOC/withAuth";

import dashboardStyle from "./Dashboard.module.scss";

const Dashboard: NextPage = () => {
  return <Box padding={5} as="section" className={`${dashboardStyle.Dashboard}`}>
    CONTENT
  </Box>;
};

export default withAuth(Dashboard);
