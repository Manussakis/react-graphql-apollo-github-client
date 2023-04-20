import Loading from "../Loading";
import { ButtonUnobtrusive } from "../Button";

import "./style.css";
import { FetchMoreProps } from "./types";

const FetchMore = ({
  loading,
  hasNextPage,
  variables,
  updateQuery,
  fetchMore,
  children,
}: FetchMoreProps) => (
  <div className="FetchMore">
    {loading ? (
      <Loading />
    ) : (
      hasNextPage && (
        <ButtonUnobtrusive
          className="FetchMore-button"
          onClick={() => {
            fetchMore({ variables, updateQuery });
          }}
        >
          More {children}
        </ButtonUnobtrusive>
      )
    )}
  </div>
);

export default FetchMore;
