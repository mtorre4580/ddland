import { NextApiRequest, NextApiResponse } from "next";
import landingService from "../../../services/landing";
import validatorService from "../../../services/validator";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === "DELETE") {
    const {
      query: { path },
    } = req;
    const response = await landingService.deleteLanding(
      path,
      "mtorre4580@outlook.com"
    );
    if (response) {
      return res.status(200).json(response);
    }
    return res.status(400).json({ msg: "Invalid" });
  }

  if (method === "PUT") {
    const {
      query: { path },
      body,
    } = req;

    const isBadRequest = validatorService.landing(body);

    if (isBadRequest) {
      return res.status(400).json({ msg: status });
    }

    const response = await landingService.updateLanding(
      path,
      body,
      "danieltorre@outlook.com"
    );
    if (response) {
      return res.status(200).json(response);
    }
    return res.status(400).json({ msg: "Invalid" });
  }

  return res.status(400).json({ msg: "Invalid method" });
};
