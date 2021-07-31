/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PhotoFragment
// ====================================================

export interface PhotoFragment_comments_user {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
  isFollowing: boolean;
  isMe: boolean;
}

export interface PhotoFragment_comments {
  __typename: "Comment";
  id: number;
  user: PhotoFragment_comments_user;
  text: string;
  isMine: boolean;
  createdAt: string;
}

export interface PhotoFragment_hashtags_photos {
  __typename: "Photo";
  id: number;
}

export interface PhotoFragment_hashtags {
  __typename: "Hashtag";
  id: number;
  hashtag: string;
  createdAt: string;
  photos: (PhotoFragment_hashtags_photos | null)[] | null;
}

export interface PhotoFragment {
  __typename: "Photo";
  id: number;
  file: string;
  caption: string | null;
  likeCount: number;
  commentCount: number;
  comments: PhotoFragment_comments[] | null;
  isLiked: boolean;
  createdAt: string;
  isMine: boolean;
  hashtags: PhotoFragment_hashtags[] | null;
}
