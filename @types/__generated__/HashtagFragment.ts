/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: HashtagFragment
// ====================================================

export interface HashtagFragment_photos {
  __typename: "Photo";
  id: number;
}

export interface HashtagFragment {
  __typename: "Hashtag";
  id: number;
  hashtag: string;
  createdAt: string;
  photos: (HashtagFragment_photos | null)[] | null;
}
