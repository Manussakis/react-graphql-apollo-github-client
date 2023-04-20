import { useMutation } from "@apollo/client";

import REPOSITORY_FRAGMENT from "../fragments";
import Link from "../../Link";
import Button from "../../Button";

import "../style.css";

import {
  STAR_REPOSITORY,
  UNSTAR_REPOSITORY,
  WATCH_REPOSITORY,
} from "../mutations";
import { RepositoryItemProps } from "./type";

const VIEWER_SUBSCRIPTIONS = {
  SUBSCRIBED: "SUBSCRIBED",
  UNSUBSCRIBED: "UNSUBSCRIBED",
};

const isWatch = (viewerSubscription: string) =>
  viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED;

const getUpdatedStarData = (client: any, id: any, viewerHasStarred: any) => {
  const repository = client.readFragment({
    id: `Repository:${id}`,
    fragment: REPOSITORY_FRAGMENT,
  });

  let { totalCount } = repository.stargazers;
  totalCount = viewerHasStarred ? totalCount + 1 : totalCount - 1;

  return {
    ...repository,
    stargazers: {
      ...repository.stargazers,
      totalCount,
    },
  };
};

const RepositoryItem = ({
  id,
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  stargazers,
  watchers,
  viewerSubscription,
  viewerHasStarred,
}: RepositoryItemProps) => {
  const [updateSubscription] = useMutation(WATCH_REPOSITORY, {
    update(
      client,
      {
        data: {
          updateSubscription: {
            subscribable: { id, viewerSubscription },
          },
        },
      }
    ) {
      const repository: any = client.readFragment({
        id: `Repository:${id}`,
        fragment: REPOSITORY_FRAGMENT,
      });

      let { totalCount } = repository.watchers;
      totalCount =
        viewerSubscription === VIEWER_SUBSCRIPTIONS.SUBSCRIBED
          ? totalCount + 1
          : totalCount - 1;

      client.writeFragment({
        id: `Repository:${id}`,
        fragment: REPOSITORY_FRAGMENT,
        data: {
          ...repository,
          watchers: {
            ...repository.watchers,
            totalCount,
          },
        },
      });
    },
  });
  const [addStar] = useMutation(STAR_REPOSITORY, {
    update(
      client,
      {
        data: {
          addStar: {
            starrable: { id, viewerHasStarred },
          },
        },
      }
    ) {
      client.writeFragment({
        id: `Repository:${id}`,
        fragment: REPOSITORY_FRAGMENT,
        data: getUpdatedStarData(client, id, viewerHasStarred),
      });
    },
  });
  const [removeStar] = useMutation(UNSTAR_REPOSITORY, {
    update(
      client,
      {
        data: {
          removeStar: {
            starrable: { id, viewerHasStarred },
          },
        },
      }
    ) {
      client.writeFragment({
        id: `Repository:${id}`,
        fragment: REPOSITORY_FRAGMENT,
        data: getUpdatedStarData(client, id, viewerHasStarred),
      });
    },
  });

  return (
    <div>
      <div className="RepositoryItem-title">
        <h2>
          <Link href={url}>{name}</Link>
        </h2>
        <div>
          <Button
            className="RepositoryItem-title-action"
            data-test-id="updateSubscription"
            onClick={() =>
              updateSubscription({
                variables: {
                  id,
                  viewerSubscription: isWatch(viewerSubscription)
                    ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
                    : VIEWER_SUBSCRIPTIONS.SUBSCRIBED,
                },
                optimisticResponse: {
                  updateSubscription: {
                    __typename: "Mutation",
                    subscribable: {
                      __typename: "Repository",
                      id,
                      viewerSubscription: isWatch(viewerSubscription)
                        ? VIEWER_SUBSCRIPTIONS.UNSUBSCRIBED
                        : VIEWER_SUBSCRIPTIONS.SUBSCRIBED,
                    },
                  },
                },
              })
            }
          >
            {watchers.totalCount}{" "}
            {isWatch(viewerSubscription) ? "Unwatch" : "Watch"}
          </Button>
        </div>

        {!viewerHasStarred ? (
          <Button
            className={"RepositoryItem-title-action"}
            onClick={() =>
              addStar({
                variables: { id },
                optimisticResponse: {
                  addStar: {
                    __typename: "Mutation",
                    starrable: {
                      __typename: "Repository",
                      id,
                      viewerHasStarred: !viewerHasStarred,
                    },
                  },
                },
              })
            }
          >
            {stargazers.totalCount} Star
          </Button>
        ) : (
          <Button
            className="RepositoryItem-title-action"
            onClick={() =>
              removeStar({
                variables: { id },
                optimisticResponse: {
                  removeStar: {
                    __typename: "Mutation",
                    starrable: {
                      __typename: "Repository",
                      id,
                      viewerHasStarred: !viewerHasStarred,
                    },
                  },
                },
              })
            }
          >
            {stargazers.totalCount} Unstar
          </Button>
        )}
      </div>
      <div className="RepositoryItem-description">
        <div
          className="RepositoryItem-description-info"
          dangerouslySetInnerHTML={{ __html: descriptionHTML }}
        />
        <div className="RepositoryItem-description-details">
          <div>
            {primaryLanguage && <span>Language: {primaryLanguage.name}</span>}
          </div>
          <div>
            {owner && (
              <span>
                Owner: <a href={owner.url}>{owner.login}</a>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryItem;
