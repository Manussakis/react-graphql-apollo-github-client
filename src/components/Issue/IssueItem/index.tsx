// import Button from '../../Button';
// import Comments from '../../Comment';
import Link from '../../Link';

import "./style.css";
import { IssueItemProps } from "./type";

const IssueItem = ({ issue }: IssueItemProps) => (
  <div className="IssueItem">
    <div className="IssueItem-content">
      <h3>
        <Link href={issue.url}>{issue.title}</Link>
      </h3>
      <div dangerouslySetInnerHTML={{ __html: issue.bodyHTML }} />
    </div>
  </div>
);

export default IssueItem;
