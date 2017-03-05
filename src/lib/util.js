export default function toRes(res, status = 200) {
  return (err, thing) => {
    if (err) return res.status(500).send(err);
    if (thing && typeof thing.toObject === 'function') {
      const thingObj = thing.toObject();
      res.status(status).json(thingObj);
      return thingObj;
    }
  };
}
