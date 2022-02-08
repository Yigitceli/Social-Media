import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import withAuth from "../../services/useAuth";

const Category = () => {
  const Router = useRouter();

  return (
    <Layout>
      <div>Category</div>
    </Layout>
  );
};

export default withAuth(slug);
