export interface PageMatchModel {
  isExact: boolean;
  params: object;
  path: string;
  url: string;
}

export interface PageBasiocPropsModel {
  history: History;
  location: CustomLocation;
  match: PageMatchModel;
  children: any;
}

export interface CustomLocation extends Location {
  query: {
    [x: string]: string;
  };
}
