export interface Followers {
  totalCount: number;
}

export interface Community {
  canonicalUrl: string;
  followers: Followers;
  icon: string;
  id: string;
  image?: string;
  name: string;
  preferredUsername: string;
  summary: string;
}

export interface Followers2 {
  totalCount: number;
}

export interface Name {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

export interface Summary {
  value: string;
  matchLevel: string;
  fullyHighlighted: boolean;
  matchedWords: string[];
}

export interface IndexType {
  value: string;
  matchLevel: string;
  matchedWords: string[];
  fullyHighlighted?: boolean;
}

export interface Url {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

export interface HighlightResult {
  name: Name;
  summary: Summary;
  index_type: IndexType;
  url: Url;
}

export interface Followers3 {
  totalCount: number;
}

export interface Community2 {
  canonicalUrl: string;
  followers: Followers3;
  icon: string;
  id: string;
  image?: string;
  name: string;
  preferredUsername: string;
  summary: string;
}

export interface Followers4 {
  totalCount: number;
}

export interface Hit {
  canonicalUrl: string | null;
  community?: Community;
  createdAt: string;
  followers: Followers2;
  icon: string;
  name: string;
  preferredUsername: string;
  summary: string;
  index_type: 'Community' | 'Collection' | 'Resource';
  index_instance: string;
  objectID: string;
  _highlightResult: HighlightResult;
  license?: any;
  likes: Likes;
  updatedAt: string;
  url: string;
  collection?: Collection;
  image: string;
}

export interface Followers {
  totalCount: number;
}

export interface Community {
  canonicalUrl: string;
  createdAt: Date;
  followers: Followers;
  icon: string;
  image?: string;
  index_instance: string;
  index_mothership_object_id: string;
  index_type: string;
  name: string;
  objectID: string;
  preferredUsername: string;
  summary: string;
}

export interface Followers2 {
  totalCount: number;
}

export interface Collection {
  canonicalUrl: string;
  community: Community;
  createdAt: Date;
  followers: Followers2;
  icon?: any;
  index_instance: string;
  index_mothership_object_id: string;
  index_type: string;
  name: string;
  objectID: string;
  preferredUsername: string;
  summary: string;
}

export interface Likes {
  totalCount?: any;
}

export interface RootObject {
  canonicalUrl: string;
  collection: Collection;
  createdAt: Date;
  icon: string;
  index_instance: string;
  index_mothership_object_id: string;
  index_type: string;
  licence?: any;
  likes: Likes;
  name: string;
  summary: string;
  updatedAt: Date;
  url: string;
  objectID: string;
}
