import { Download } from "./components/Download";
import { Editor } from "./components/Editor";
import { SaveUpload } from "./components/SaveUpload";
import { useSaveStore } from "./stores/saveStore";

function App() {
  const { isLoaded } = useSaveStore();

  return (
    <div className="flex items-center w-full h-screen justify-center">
      <div className="shadow-md min-w-[400px] max-w-[90%] p-6 bg-gray-800 rounded max-h-[90%] overflow-auto transition-all duration-1000">
        {!isLoaded && (
          <>
            <div className="flex items-center justify-center">
              <img src='assets/logo.png' alt="logo" className="w-32 mx-auto" />
              <img src='assets/season02.png' alt="season logo" className="w-32 mx-auto" />
            </div>
            <SaveUpload />
          </>
        )}
        {isLoaded && <Editor />}
        {isLoaded && <Download />}
      </div>
    </div>
  );
}

export default App;
