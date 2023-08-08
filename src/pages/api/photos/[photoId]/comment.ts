import { auth, photosRepo } from "@/lib/server";
import { photoSchema } from "@/lib/server/schema";
import { NextApiResponse, NextApiRequest } from "next";
import nextConnect from "next-connect";

const apiRoute = nextConnect({
  onError(error: Error, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({ error: `Server Error! ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ message: "not allowed" });
  },
});

apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // TODO: implement middleware
    const authorization = auth.verify(req.headers.authorization!);
    if (authorization === false) {
      res.status(401).json({ message: "not valid request" });
    }

    const { comment } = (req.body || {}) as { comment: string };
    const { photoId } = req.query;

    const userId = auth.getUserId(req.headers.authorization!);
    const payload = { comment, photo: String(photoId), user: userId };
    const validate = photoSchema.photoComment.validate(payload);
    if (validate.error) throw validate.error.details[0].message;

    const _comment = await photosRepo.comment(payload);

    res.status(200).json(_comment);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

export default apiRoute;
