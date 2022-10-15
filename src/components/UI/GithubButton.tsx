import clsx from "clsx";
import { FaGithub } from "react-icons/fa";

type Props = {
  url?: string;
};

const GithubButton = ({
  url = "https://github.com/MrMarble/drg-editor",
}: Props) => {
  return (
    <div className="absolute -left-24 -rotate-90 lg:left-auto lg:rotate-0 lg:bottom-6 opacity-20">
      <div className="bg-slate-800 px-3 py-2 rounded-md justify-center hover:bg-slate-700 transition-all duration-300 cursor-pointer">
        <a href={url} target="_blank" rel="noreferrer">
          <div className="flex flex-row gap-2 justify-center">
            <FaGithub size={16} />
            <span className="my-auto text-xs">/MrMarble/drg-editor</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default GithubButton;
