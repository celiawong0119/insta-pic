export interface IPostData {
  id: number;
  imageName: string;
  caption: string;
  createdDate: number;
  author: { userId: number; name: string };
}
