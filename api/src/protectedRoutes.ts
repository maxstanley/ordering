const protectedRoutes: any = {
  v1: {
    account: {
      POST: false
    },
    activate: {
      GET: false
    },
    login: {
      POST: false
    },
    logout: {
      GET: false
    },
    order: {
      GET: true,
      POST: true,
      PUT: true,
      stream: {
        GET: true
      },
      "*": {
        GET: true
      }
    },
    product: {
      GET: false
    },
    token: {
      POST: false
    }
  }
};

export default protectedRoutes;