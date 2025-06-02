export function allowRoles(...roles) {
  return function (req, res, next) {
    if (req.user && roles.includes(req.user.role)) {
      return next();
    }
    return res.redirect('/');
  };
}