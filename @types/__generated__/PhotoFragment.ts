/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PhotoFragment
// ====================================================

export interface PhotoFragment_user {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
  isFollowing: boolean;
  isMe: boolean;
}

export interface PhotoFragment {
  __typename: "Photo";
  id: number;
  file: string;
  caption: string | null;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  createdAt: string;
  isMine: boolean;
  user: PhotoFragment_user;
}
