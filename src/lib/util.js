export default function toRes(res, status = 200) {
  return (err, thing) => {
    let thingObj = null;
    if (err) return res.status(500).send(err);
    if (thing && typeof thing.toObject === 'function') {
      thingObj = thing.toObject();
    }
    res.status(status).json(thingObj);
    return thingObj;
  };
}
