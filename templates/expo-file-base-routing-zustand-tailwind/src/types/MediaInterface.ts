export interface IMediaInterface {
  id: string;
  uri: string;
  type: 'image' | 'video';
  width?: number;
  height?: number;
  size?: number;
}
