import Head from "next/head";
import Image from "next/image";
import Login from "./login";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import withAuth from "../services/useAuth";

function Home() {
  return (
    <div>
      <Head>
        <link rel="icon" href="%PUBLIC_URL%/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/favicon.png" />

        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
          rel="stylesheet"
        />
        <title>ShareWith</title>
      </Head>
      <Layout></Layout>
    </div>
  );
}
export default withAuth(Home);
