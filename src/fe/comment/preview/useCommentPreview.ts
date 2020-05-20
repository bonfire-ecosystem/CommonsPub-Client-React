import { Comment } from 'graphql/types.generated';
import { useCommentPreviewQuery } from './useCommentPreview.generated';
import { useMemo } from 'react';
import { useLikeContext } from 'fe/context/like/useLikeContext';
import { useReplyComment } from '../reply/useReplyComment';

export const useCommentPreview = (commentId: Comment['id']) => {
  const commentPreviewQ = useCommentPreviewQuery({ variables: { commentId } });
  const { toggleLike } = useLikeContext(
    commentPreviewQ.data?.comment?.id,
    commentPreviewQ.data?.comment?.myLike,
    commentPreviewQ.data?.comment?.likerCount,
    'Comment'
  );
  const threadContext = commentPreviewQ.data?.comment?.thread?.context;
  const communityId =
    threadContext?.__typename === 'Resource'
      ? threadContext.collection?.community?.id
      : threadContext?.__typename === 'Collection'
      ? threadContext.community?.id
      : threadContext?.__typename === 'Community'
      ? threadContext.id
      : undefined;
  const { reply } = useReplyComment(
    commentPreviewQ.data?.comment,
    communityId,
    commentPreviewQ.data?.comment?.creator?.userName
  );
  return useMemo(() => {
    return {
      comment: commentPreviewQ.data?.comment,
      toggleLike,
      reply
    };
  }, [commentPreviewQ, toggleLike, reply]);
};
