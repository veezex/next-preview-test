import { useRouter } from "next/router";
import Head from "next/head";

export async function getStaticProps({ params: { slug }, preview }) {
  const content = {
    text1: "text 1",
    text2: "text 2",
  };

  if (preview) {
    content["text3"] = "text 3";
  }

  if (typeof content[slug] === "undefined") {
    return {
      notFound: true,
      revalidate: 1,
    };
  }

  return {
    props: { slug, content: content[slug] },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export default function Homepage({ content, slug }) {
  const { isPreview } = useRouter();
  return (
    <div>
      <Head>
        <title>{`Page ${isPreview ? " (preview)" : ""}`}</title>
      </Head>

      <h1>{slug}</h1>
      <p>{content}</p>
    </div>
  );
}
