import { useQuery } from "@apollo/client";
import RepositoryList from "../../components/Repository";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/Error";
import { GET_REPOSITORIES_OF_CURRENT_USER } from "./queries";

const Profile = () => {
  const { data, loading, error, fetchMore } = useQuery(
    GET_REPOSITORIES_OF_CURRENT_USER, {
      notifyOnNetworkStatusChange: true
    }
  );

  if (loading && !data?.viewer) {
    return <Loading isCenter={true} />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <RepositoryList
      loading={loading}
      repositories={data.viewer?.repositories}
      fetchMore={fetchMore}
      entry={"viewer"}
    />
  );
};

export default Profile;
