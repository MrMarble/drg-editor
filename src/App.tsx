import useSaveStore from '@/stores/saveStore';
import type { ReactElement } from 'react';
import { lazy, Suspense } from 'react';
import shallow from 'zustand/shallow';
import { HomeView } from './views/home';

const editorViewPromise = import('./views/editor/editorView');
const EditorView = lazy(async () => editorViewPromise);

function App(): ReactElement {
  const { isLoaded } = useSaveStore(
    state => ({ isLoaded: state.isLoaded }),
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
