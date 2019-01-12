export = index;
declare class index {
  static AuthorizationError(message: any, code: any, uri: any, status: any): void;
  static InternalOAuthError(message: any, err: any): void;
  static TokenError(message: any, code: any, uri: any, status: any): void;
  constructor(_options: any, _verify: any);
  authenticate(req: any, options: any): any;
  authorizationParams(options: any): any;
  parseErrorResponse(body: any, status: any): any;
  tokenParams(options: any): any;
  userProfile(accessToken: any, done: any): void;
}
declare namespace index {
  class Strategy {
    static AuthorizationError(message: any, code: any, uri: any, status: any): void;
    static InternalOAuthError(message: any, err: any): void;
    // Circular reference from index.Strategy
    static Strategy: any;
    static TokenError(message: any, code: any, uri: any, status: any): void;
    constructor(options: any, verify: any);
    name: any;
    authenticate(req: any, options: any): any;
    authorizationParams(options: any): any;
    parseErrorResponse(body: any, status: any): any;
    tokenParams(options: any): any;
    userProfile(accessToken: any, done: any): any;
  }
}
