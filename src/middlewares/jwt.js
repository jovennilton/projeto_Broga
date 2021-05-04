const { verifyJwt, getTokenFromHeaders } = require("../helpers/jwt");

const checkJwt = (req, res, next) => {
  const { url: path } = req;

  const excludedPath = ["/auth/sign-in", "/auth/sign-up", "/auth/refresh"];
  const isExcluded = !!excludedPath.find((p) => p.startsWith(path));

  if (isExcluded) return next();

  const token = getTokenFromHeaders(req.headers);

  if (!token) {
    return res.jsonUnauthorized(null, "Token invalid");
  }

  try {
    const decoded = verifyJwt(token);
    req.accountId = decoded.id;

    next();
  } catch (error) {
    return res.jsonUnauthorized(null, "Token invalid");
  }
};

module.exports = checkJwt; //ok

