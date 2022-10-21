import { Download } from './components/Download';
import { Editor } from './components/Editor';
import GithubButton from './components/UI/GithubButton';
import { UploadFile } from './components/UploadFile';
import { useSaveStore } from './stores/saveStore';

import {
  height as LogoHeight,
  src as Logo,
  width as LogoWidth,
} from './assets/logo.png?w=128&webp&meta&imagetools';
import {
  height as SeasonHeight,
  src as SeasonLogo,
  width as SeasonWidth,
} from './assets/season02.png?w=128&webp&meta&imagetools';

function App() {
  const { isLoaded } = useSaveStore();

  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center py-4">
        {isLoaded && (
          <div className="drg-title drg-framer mb-6 w-auto min-w-[400px] max-w-[90%] justify-center py-2 text-center text-2xl font-medium uppercase">
            DRG Editor
          </div>
        )}

        <div className="drg-framer drg-scrollbar max-h-[90%] max-w-[90%] overflow-auto !border-b-[15px] bg-gray-800 p-6 shadow-md transition-all duration-1000">
          {!isLoaded && (
            <>
              <div className="flex items-center justify-center">
                <img
                  src={Logo}
                  alt="logo"
                  className="mx-auto w-32"
                  height={LogoHeight}
                  width={LogoWidth}
                />
                <img
                  src={SeasonLogo}
                  alt="season logo"
                  className="mx-auto w-32"
                  height={SeasonHeight}
                  width={SeasonWidth}
                />
              </div>
              <UploadFile />
            </>
          )}
          {isLoaded && <Editor />}
          {isLoaded && <Download />}
        </div>
        <GithubButton />
      </div>
    </>
  );
}

export default App;
