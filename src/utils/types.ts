export type PostItem = {
  title: string;
  description: string;
  id: string;
  author: string;
  post: string;
};

export enum Status {
  Rest = 'rest',
  Loading = 'loading',
  Error = 'error',
  Success = 'success',
}

export enum Page {
  Home = 'Home',
  CreateBlogPost = 'CreateBlogPost',
  EditBlogPost = 'EditBlogPost',
}

export enum NoticeType {
  Error = 'error',
  Warning = 'Warning',
}
