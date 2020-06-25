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
      POST: true
    },
    product: {
      GET: false
    },
    token: {
      POST: true
    }
  }
};

export default protectedRoutes;