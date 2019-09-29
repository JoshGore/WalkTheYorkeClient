import React, { useContext, useEffect } from 'react';

import { useQuery, useSubscription, useMutation } from '@apollo/react-hooks';

import {
  ROUTE_DETAIL_QUERY,
  POINT_DETAIL_QUERY,
  USER_POINT_DETAIL_QUERY,
  ROUTE_COMMENT_SUBSCRIPTION_QUERY,
  POINT_COMMENT_SUBSCRIPTION_QUERY,
  USER_POINT_COMMENT_SUBSCRIPTION_QUERY,
  ROUTE_REVIEWS_QUERY,
  POINT_REVIEWS_QUERY,
  USER_POINT_REVIEWS_QUERY,
  ROUTE_REVIEW_INSERT_QUERY,
  POINT_REVIEW_INSERT_QUERY,
  USER_POINT_REVIEW_INSERT_QUERY,
  ROUTE_COMMENT_INSERT_QUERY,
  POINT_COMMENT_INSERT_QUERY,
  USER_POINT_COMMENT_INSERT_QUERY,
  COMMENT_REPLY_INSERT_QUERY,
  RouteDetailQueryData,
  RouteDetailQueryVars,
  ReviewQueryVars,
  ReviewQueryData,
  PointDetailQueryData,
  PointDetailQueryVars,
  ROUTE_COMMENT_SUBSCRIPTION_QUERY_TYPES,
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

const SelectionDetailQueryManager: React.FC<{
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
  >(ROUTE_DETAIL_QUERY, {
    variables: { id: id as number },
    skip: queryType() !== 'route',
  });
  const { loading: pointInfoLoading, data: pointInfo } = useQuery<
    PointDetailQueryData,
    PointDetailQueryVars
  >(POINT_DETAIL_QUERY, {
    variables: { id: id as number },
    skip: queryType() !== 'point',
  });
  const { loading: userPointInfoLoading, data: userPointInfo } = useQuery(
    USER_POINT_DETAIL_QUERY,
    {
      variables: { id: id as number },
      skip: queryType() !== 'userPoint',
    },
  );
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
  const {
    data: pointCommentsSubscription,
    loading: pointCommentsSubscriptionLoading,
  } = useSubscription(POINT_COMMENT_SUBSCRIPTION_QUERY, {
    variables: { id: id as number },
    skip: queryType() !== 'point',
  });
  const {
    data: userPointCommentsSubscription,
    loading: userPointCommentsSubscriptionLoading,
  } = useSubscription(USER_POINT_COMMENT_SUBSCRIPTION_QUERY, {
    variables: { id: id as number },
    skip: queryType() !== 'userPoint',
  });
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
  const { loading: userPointReviewsLoading, data: userPointReviews } = useQuery(
    USER_POINT_REVIEWS_QUERY,
    {
      variables: { id },
      skip: queryType() !== 'userPoint',
    },
  );
  const [commentOnRoute] = useMutation(ROUTE_COMMENT_INSERT_QUERY);
  const [commentOnPoint] = useMutation(POINT_COMMENT_INSERT_QUERY);
  const [commentOnUserPoint] = useMutation(USER_POINT_COMMENT_INSERT_QUERY);
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
        ? commentOnRoute({
            variables: {
              routeId: id,
              user: User.userId,
              body: commentText,
            },
          })
        : queryType() === 'point'
        ? commentOnPoint({
            variables: {
              pointId: id,
              user: User.userId,
              body: commentText,
            },
          })
        : queryType() === 'userPoint'
        ? commentOnUserPoint({
            variables: {
              pointId: id,
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
  const [submitPointReview] = useMutation(POINT_REVIEW_INSERT_QUERY);
  const [submitUserPointReview] = useMutation(USER_POINT_REVIEW_INSERT_QUERY);

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
      : queryType() === 'point'
      ? submitPointReview({
          variables: {
            point_id: id,
            user_id: User.userId,
            rating,
            review,
          },
          refetchQueries: [
            {
              query: POINT_REVIEWS_QUERY,
              variables: { id },
            },
          ],
        })
      : queryType() === 'userPoint'
      ? submitUserPointReview({
          variables: {
            point_id: id,
            user_id: User.userId,
            rating,
            review,
          },
          refetchQueries: [
            {
              query: USER_POINT_REVIEWS_QUERY,
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
      : queryType() === 'point'
      ? !pointReviewsLoading &&
        !!pointReviews &&
        !!pointReviews.reviews &&
        pointReviews.reviews.length > 0
        ? pointReviews.reviews
        : []
      : queryType() === 'userPoint'
      ? !userPointReviewsLoading &&
        !!userPointReviews &&
        !!userPointReviews.reviews &&
        userPointReviews.reviews.length > 0
        ? userPointReviews.reviews
        : []
      : [];
  const commentThreads = () =>
    queryType() === 'route' &&
    !routeCommentsSubscriptionLoading &&
    routeCommentsSubscription !== undefined
      ? routeCommentsSubscription.routes_by_pk.route_comments
      : queryType() === 'point' &&
        !pointCommentsSubscriptionLoading &&
        pointCommentsSubscription !== undefined
      ? pointCommentsSubscription.points_by_pk.point_comments
      : queryType() === 'userPoint' &&
        !userPointCommentsSubscriptionLoading &&
        userPointCommentsSubscription !== undefined
      ? userPointCommentsSubscription.user_points_by_pk.user_point_comments
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
      : queryType() === 'userPoint'
      ? !userPointInfoLoading
        ? userPointInfo!.user_points_by_pk.name
        : undefined
      : undefined;
  const shortName = () =>
    queryType() === 'route'
      ? !routeInfoLoading
        ? routeInfo!.routes_by_pk.short_name
        : undefined
      : undefined;
  const description = () =>
    queryType() === 'route'
      ? !routeInfoLoading
        ? routeInfo!.routes_by_pk.description
        : undefined
      : queryType() === 'point'
      ? !pointInfoLoading
        ? pointInfo!.points_by_pk.description
        : undefined
      : queryType() === 'userPoint'
      ? !userPointInfoLoading
        ? userPointInfo!.user_points_by_pk.description
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
  const loading = () =>
    queryType() === 'route'
      ? routeInfoLoading
      : queryType() === 'point'
      ? pointInfoLoading
      : queryType() === 'userPoint'
      ? userPointInfoLoading
      : false;
  const showReviews = () =>
    queryType() === 'route' ||
    queryType() === 'point' ||
    queryType() === 'userPoint';

  const showComments = () =>
    queryType() === 'route' ||
    queryType() === 'point' ||
    queryType() === 'userPoint';

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
      loading={loading()}
      title={name()}
      body={description()}
      multimedia={multimedia()}
      files={files()}
      count={count()}
      avgRating={avgRating()}
      id={id as number}
      queryType={queryType()}
      showReviews={showReviews()}
      reviews={reviews()}
      showComments={showComments()}
      commentThreads={commentThreads()}
      loggedIn={User.loggedIn}
      submitComment={submitComment}
      submitReview={submitReview}
    />
  );
};

export default SelectionDetailQueryManager;
