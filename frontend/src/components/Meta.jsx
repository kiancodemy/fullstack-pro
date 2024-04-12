import { Helmet } from "react-helmet-async";
function Meta({ des = "the best products", title = "welcome" }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={des} />
    </Helmet>
  );
}

export default Meta;
