export const testsMiddleware = (req, res, next) => {
  if (req.body.validacion === "martillo") {
    console.log("Pasa la validacion del middleware");
    next();
    return;
  }

  res.json({
    status: 400,
    ok: false,
    message: "No pasa la validacion del middleware",
  });
};
