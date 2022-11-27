import { UploadFile } from "../../components/FileUpload";

export const HomeView = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <img src="assets/logo.png" alt="logo" className="w-32 mx-auto" />
        <img
          src="assets/season03.png"
          alt="season logo"
          className="w-32 mx-auto"
        />
      </div>
      <UploadFile />
    </>
  );
};
