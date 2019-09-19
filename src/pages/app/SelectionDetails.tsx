import React, { useContext, useEffect } from 'react';

import { useQuery, useSubscription, useMutation } from '@apollo/react-hooks';
import {
  RouteDetailQuery,
  RouteDetailQueryData,
  RouteDetailQueryVars,
  PointDetailQuery,
  PointDetailQueryData,
  PointDetailQueryVars,
} from '../../queries/objectInfoQueries';

import {
  ROUTE_COMMENT_SUBSCRIPTION_QUERY,
  ROUTE_COMMENT_SUBSCRIPTION_QUERY_TYPES,
  ROUTE_REVIEWS_QUERY,
  POINT_REVIEWS_QUERY,
  ReviewQueryVars,
  ReviewQueryData,
  ROUTE_COMMENT_INSERT_QUERY,
  COMMENT_REPLY_INSERT_QUERY,
  ROUTE_REVIEW_INSERT_QUERY,
} from '../../queries/queries';

import TrailContext, {
  TrailContextProps,
  TrailEntityProps,
  TrailEntityTypes,
} from '../../contexts/TrailContext';

import UserContext, { UserContextProps } from '../../contexts/UserContext';

import DisplayDetails from './DisplayDetails';

interface SelectionDetailsProps {
  type: TrailEntityTypes;
  id: number;
}

const SelectionDetails: React.FC<{
  id: number;
  type: string;
}> = ({ id, type }) => {
  const User = useContext<UserContextProps>(UserContext);
  const TrailSelections = useContext<TrailContextProps>(TrailContext);
  const queryType = () =>
    type === 'trail' || type === 'stage' ? 'route' : type;
  const { loading: routeInfoLoading, data: routeInfo } = useQuery<
    RouteDetailQueryData,
    RouteDetailQueryVars
  >(RouteDetailQuery, {
    variables: { id: id as number },
    skip: queryType() !== 'route',
  });
  const { loading: pointInfoLoading, data: pointInfo } = useQuery<
    PointDetailQueryData,
    PointDetailQueryVars
  >(PointDetailQuery, {
    variables: { id: id as number },
    skip: queryType() !== 'point',
  });
  const {
    data: routeCommentsSubscription,
    loading: routeCommentsSubscriptionLoading,
  } = useSubscription<ROUTE_COMMENT_SUBSCRIPTION_QUERY_TYPES>(
    ROUTE_COMMENT_SUBSCRIPTION_QUERY,
    {
      variables: { id: id as number },
      skip: queryType() !== 'route',
    },
  );
  const { loading: routeReviewsLoading, data: routeReviews } = useQuery<
    ReviewQueryData,
    ReviewQueryVars
  >(ROUTE_REVIEWS_QUERY, {
    variables: { id },
    skip: queryType() !== 'route',
  });
  const { loading: pointReviewsLoading, data: pointReviews } = useQuery<
    ReviewQueryData,
    ReviewQueryVars
  >(POINT_REVIEWS_QUERY, {
    variables: { id },
    skip: queryType() !== 'point',
  });
  const [commentOnObject] = useMutation(ROUTE_COMMENT_INSERT_QUERY);
  const [replyToComment] = useMutation(COMMENT_REPLY_INSERT_QUERY);

  interface SubmitCommentProps {
    commentText: string;
    commentThreadId?: number | undefined;
  }

  const submitComment = ({
    commentText,
    commentThreadId = undefined,
  }: SubmitCommentProps) =>
    commentThreadId === undefined
      ? queryType() === 'route'
        ? commentOnObject({
            variables: {
              route: id,
              user: User.userId,
              body: commentText,
            },
          })
        : undefined
      : replyToComment({
          variables: {
            commentThreadId,
            userId: User.userId,
            body: commentText,
          },
        });

  const [submitRouteReview] = useMutation(ROUTE_REVIEW_INSERT_QUERY);

  const submitReview = ({
    review,
    rating,
  }: {
    review: string;
    rating: number;
  }) =>
    queryType() === 'route'
      ? submitRouteReview({
          variables: {
            route_id: id,
            user_id: User.userId,
            rating,
            review,
          },
          refetchQueries: [
            {
              query: ROUTE_REVIEWS_QUERY,
              variables: { id },
            },
          ],
        })
      : undefined;

  const reviews = () =>
    queryType() === 'route'
      ? !routeReviewsLoading &&
        !!routeReviews &&
        !!routeReviews.reviews &&
        routeReviews.reviews.length > 0
        ? routeReviews.reviews
        : []
      : !pointReviewsLoading &&
        !!pointReviews &&
        !!pointReviews.reviews &&
        pointReviews.reviews.length > 0
      ? pointReviews.reviews
      : [];
  const commentThreads = () =>
    queryType() === 'route' &&
    !routeCommentsSubscriptionLoading &&
    routeCommentsSubscription !== undefined
      ? routeCommentsSubscription.routes_by_pk.route_comments
      : [];
  const name = () =>
    queryType() === 'route'
      ? !routeInfoLoading
        ? routeInfo!.routes_by_pk.name
        : undefined
      : queryType() === 'point'
      ? !pointInfoLoading
        ? pointInfo!.points_by_pk.name
        : undefined
      : undefined;
  const shortName = () =>
    queryType() === 'route'
      ? !routeInfoLoading
        ? routeInfo!.routes_by_pk.short_name
        : undefined
      : undefined;
  const body = () =>
    queryType() === 'route'
      ? !routeInfoLoading
        ? routeInfo!.routes_by_pk.description
        : undefined
      : queryType() === 'point'
      ? !pointInfoLoading
        ? pointInfo!.points_by_pk.description
        : undefined
      : undefined;
  const multimedia = () =>
    queryType() === 'route'
      ? !routeInfoLoading
        ? routeInfo!.routes_by_pk.route_multimedia
        : undefined
      : queryType() === 'point'
      ? !pointInfoLoading
        ? pointInfo!.points_by_pk.point_multimedia
        : undefined
      : undefined;
  const files = () =>
    queryType() === 'route'
      ? !routeInfoLoading
        ? routeInfo!.routes_by_pk.route_files
        : undefined
      : undefined;
  const count = () =>
    queryType() === 'route'
      ? !routeInfoLoading
        ? routeInfo!.reviews_aggregate.aggregate.count
        : undefined
      : queryType() === 'point'
      ? !pointInfoLoading
        ? pointInfo!.reviews_aggregate.aggregate.count
        : undefined
      : undefined;
  const avgRating = () =>
    queryType() === 'route'
      ? !routeInfoLoading
        ? routeInfo!.reviews_aggregate.aggregate.avg.rating
        : undefined
      : queryType() === 'point'
      ? !pointInfoLoading
        ? pointInfo!.reviews_aggregate.aggregate.avg.rating
        : undefined
      : undefined;

  const title = () =>
    queryType() === 'route'
      ? !routeInfoLoading
        ? routeInfo!.routes_by_pk.name
        : undefined
      : queryType() === 'route'
      ? !pointInfoLoading
        ? pointInfo!.points_by_pk.name
        : undefined
      : undefined;

  useEffect(() => {
    if (!routeInfoLoading && !!TrailSelections.trailSection.id) {
      TrailSelections.setTrailSection({
        id,
        name: name(),
        shortName: shortName(),
        type: TrailSelections.trailSection.type,
      });
    } else if (!routeInfoLoading && !TrailSelections.trailSection.id) {
      TrailSelections.setTrailSection({ ...TrailSelections.trail });
    }
  }, [routeInfoLoading, TrailSelections.trailSection.id]);
  return (
    <DisplayDetails
      loading={routeInfoLoading}
      title={title()}
      body={body()}
      multimedia={multimedia()}
      files={files()}
      count={count()}
      avgRating={avgRating()}
      id={id as number}
      queryType={queryType()}
      showReviews={queryType() === 'route'}
      reviews={reviews()}
      showComments={queryType() === 'route'}
      commentThreads={commentThreads()}
      loggedIn={User.loggedIn}
      submitComment={submitComment}
      submitReview={submitReview}
    />
  );
};

export default SelectionDetails;
