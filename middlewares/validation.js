const validationMiddleware = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);

      if (error) {
        console.log("error", error);
        return res
          .status(401)
          .json({ message: "bad validation,please enter required fields" });
      }

      return next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: "smth went wrong" });
    }
  };
};

export default validationMiddleware;
