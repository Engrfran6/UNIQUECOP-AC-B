import {createUploadthing, type FileRouter} from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 5,
    },
  })
    // .middleware(async () => {
    //   const {adminData, isAdmin} = useAuth();

    //   if (!adminData || !isAdmin) throw new UploadThingError("Unauthorized");

    //   return {
    //     userId: adminData?.uid,
    //   };
    // })
    .onUploadComplete(async ({file}) => {
      return {
        url: file.ufsUrl,
        // userId: metadata.userId,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
