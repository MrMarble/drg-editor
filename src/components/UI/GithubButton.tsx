import { FaGithub } from "react-icons/fa";

type Props = {
  url?: string;
};

const GithubButton = ({
  url = "https://github.com/MrMarble/drg-editor",
}: Props) => {
  return (
    <div className="absolute -left-24 -rotate-90 opacity-20 lg:left-auto lg:bottom-6 lg:rotate-0">
      <div className="cursor-pointer justify-center rounded-md bg-slate-800 px-3 py-2 transition-all duration-300 hover:bg-slate-700">
        <a href={url} target="_blank" rel="noreferrer">
          <div className="flex flex-row justify-center gap-2">
            <FaGithub size={16} />
            <span className="my-auto text-xs">/MrMarble/drg-editor</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default GithubButton;
