import { auth, photosRepo } from "@/lib/server";
import { NextApiResponse, NextApiRequest } from "next";
import nextConnect from "next-connect";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const userId = auth.getUserId(req.headers.authorization!);
    const fileName =
      userId + "_" + file.originalname.trim().replace(/\s/g, "-");
    console.log(3, fileName);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

const apiRoute = nextConnect({
  onError(error: Error, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({ error: `Server Error! ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ message: "not allowed" });
  },
});

apiRoute.use(upload.any());

apiRoute.post(
  async (
    req: NextApiRequest & { files: Express.Multer.File[] },
    res: NextApiResponse
  ) => {
    try {
      // TODO: implement middleware
      const authorization = auth.verify(req.headers.authorization!);
      if (authorization === false) {
        res.status(401).json({ message: "not valid request" });
      }

      const file = req.files[0];
      const userId = auth.getUserId(req.headers.authorization!);

      const photo = await photosRepo.post({
        photo: file.path.replace("public", ""),
        createdBy: userId,
      });

      res.status(200).json(photo);
    } catch (error) {
      throw error;
    }
  }
);

apiRoute.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // TODO: implement middleware
    const authorization = auth.verify(req.headers.authorization!);
    if (authorization === false) {
      res.status(401).json({ message: "not valid request" });
    }
    const params = req.query;

    const photos = await photosRepo.getAll({
      page: Number(Math.max(Number(params.page), 1)),
      pageSize: Number(params.pageSize) ?? 10,
      sort: (params.sort as "desc") ?? "desc",
    });

    res.status(200).json(photos);
  } catch (error) {
    console.error("err", error);
    throw error;
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
