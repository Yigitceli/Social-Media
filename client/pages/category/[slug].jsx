import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../../components/Layout";

const slug = () => {
  const Router = useRouter();
  useEffect(() => {
    console.log(Router);
  }, []);
  return (
    <Layout>
      <div>Category</div>
    </Layout>
  );
};

export default slug;
