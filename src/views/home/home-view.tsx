import { Layout } from "@/layouts/Layout";
import { UploadFile } from "../../components/FileUpload";

export const HomeView = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center">
        <img
          src="assets/logo.png"
          alt="logo"
          className="w-32 mx-auto"
          width={128}
          height={47}
        />
        <img
          src="assets/season03.png"
          alt="season logo"
          className="w-32 mx-auto"
          width={128}
          height={32}
        />
      </div>
      <UploadFile />
    </Layout>
  );
};
