const getters = {
  token: state => state.app.token,
  user: state => state.app.user,
  appMenus: state => state.app.appMenus,
  authMenus: state => state.app.authMenus,
  isAdmin: state => state.app.isAdmin,
};
export default getters
