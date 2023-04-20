import { ReactNode } from "react";

export interface FetchMoreProps {
  loading: boolean;
  hasNextPage: boolean;
  variables: any;
  updateQuery: any;
  fetchMore: any;
  children: ReactNode;
}
