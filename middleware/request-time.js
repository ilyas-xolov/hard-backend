const requestTime = (req, res, next) => {
    req.requestTime = new Date();
    console.log(req.requestTime);
    next();
}

export default requestTime;