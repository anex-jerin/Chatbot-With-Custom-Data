import { getAnswer } from '../LangChain/queryData.js';

export const getQueryResult = async (req, res) => {
  try {
    const { query } = req.body;
    const response = await getAnswer(query);
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
