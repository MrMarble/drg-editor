import { UploadFile } from "../UploadFile";

export const Home = () => (
  <div className="shadow-md max-w-[90%] p-6 bg-gray-800 drg-framer !border-b-[15px] max-h-[90%] overflow-auto transition-all duration-1000 drg-scrollbar">
    <div className="flex items-center justify-center">
      <img src="assets/logo.png" alt="logo" className="w-32 mx-auto" />
      <img
        src="assets/season02.png"
        alt="season logo"
        className="w-32 mx-auto"
      />
    </div>
    <UploadFile />
  </div>
);

export default Home;
