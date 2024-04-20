export interface userInterface {
  id: number;
  username: string;
  password: string;
}

export interface chatInterface {
  id: number;
  message: string;
  to_user: number;
  from_user?: number;
  group_id?: number;
  created_by: number;
}

export interface dynamicRouteIsInterface {
  id: string;
}

export interface GroupInterface {
  id: number;
  group_name: string;
}

export interface chatPropsInterface {
  user?: userInterface;
  setMessage: (m: string) => void;
  sendMessage: (payload: any) => void;
  chat: chatInterface[] | undefined;
  HeaderName: string | undefined;
  params: dynamicRouteIsInterface;
  message: string;
}
