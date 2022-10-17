import { Suspense, useEffect } from "react";
import { lazyWithPreload } from "react-lazy-with-preload";
import Home from "./components/Home";
import { useSaveStore } from "./stores/saveStore";

const Editor = lazyWithPreload(() => import("./components/Editor/Editor"));

function App() {
  const { isLoaded } = useSaveStore();

  useEffect(() => {
    Editor.preload();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center w-full h-screen justify-center py-4">
        {isLoaded ? (
          <Suspense>
            <Editor />
          </Suspense>
        ) : (
          <Home />
        )}
      </div>
    </>
  );
}

export default App;
