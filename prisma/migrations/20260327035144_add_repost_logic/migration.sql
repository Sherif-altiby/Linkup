-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "repostingPostId" TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_repostingPostId_fkey" FOREIGN KEY ("repostingPostId") REFERENCES "Post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
