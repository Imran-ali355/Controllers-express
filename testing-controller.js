const testing = async (req, res) => {
  try {
    res.status(200).send({message: 'Testing API Route' });
  } catch(error) {
    res.status(404).send({ message: 'Any Error' });
  }
}

const testPost = async (req, res) => {
  try {
    console.log(req.body);
    res.status(200).send(req.body);
  } catch(error) {
    res.status(500).send({message: 'Internal Server Error'});
  }
}



module.exports = { testing, testPost };