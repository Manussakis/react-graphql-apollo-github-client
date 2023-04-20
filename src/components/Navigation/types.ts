export interface NavigationProps {
  organizationName: string;
  onOrganizationSearch: (value: string) => void;
}

export interface OrganizationSearchProps extends NavigationProps {}
