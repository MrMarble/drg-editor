import { useSaveStore } from "@/stores/saveStore";
import { lazy, Suspense } from "react";
import shallow from "zustand/shallow";
import { HomeView } from "./views/home";

const editorViewPromise = import("./views/editor");
const EditorView = lazy(() => editorViewPromise);

function App() {
  const { isLoaded } = useSaveStore(
    (state) => ({ isLoaded: state.isLoaded }),
    shallow
  );

  return isLoaded ? (
    <Suspense>
      <EditorView />
    </Suspense>
  ) : (
    <HomeView />
  );
}

export default App;
