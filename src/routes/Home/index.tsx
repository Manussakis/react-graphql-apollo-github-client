import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES_OF_ORGANIZATION } from "./queries";
import ErrorMessage from "../../components/Error";
import Loading from "../../components/Loading";
import RepositoryList from "../../components/Repository";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const organizationName = useOutletContext();
  const { data, loading, error, fetchMore } = useQuery(
    GET_REPOSITORIES_OF_ORGANIZATION,
    {
      variables: {
        organizationName,
      },
      skip: organizationName === "",
      notifyOnNetworkStatusChange: true,
    }
  );

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (loading && !data?.organization) {
    return <Loading isCenter={true} />;
  }

  return (
    <RepositoryList
      loading={loading}
      repositories={data.organization?.repositories}
      fetchMore={fetchMore}
      entry={"organization"}
    />
  );
};

export { Home };
