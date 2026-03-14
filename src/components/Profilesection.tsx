import pfp from "../assets/luffy.jpeg";
import { MdOutlineAlternateEmail } from "react-icons/md";
const Profilesection = () => {
  return (
    <div className="m-5 flex items-center gap-4 sm:gap-5">
      <div className="shrink-0">
        <img
          src={pfp}
          alt="profile here"
          loading="lazy"
          className="size-20 sm:size-25 rounded-full"
        />
      </div>
      <div className="min-w-0">
        <h2 className="text-xl sm:text-3xl md:text-[40px] font-semibold font-manrope leading-tight">
          Inavolu Vathsav{" "}
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
        </h2>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-manrope font-normal text-gray-50/50">
          <p className="hover:text-white">Student</p>
          <i>.</i>
          <p className="hover:text-white">Polymath</p>
          <i>.</i>
          <div
            onClick={() =>
              window.open(
                "https://mail.google.com/mail/?view=cm&fs=1&to=inavoluvathsav@gmail.com",
                "_blank",
              )
            }
            className="cursor-pointer flex items-center gap-1 hover:underline hover:underline-offset-2 hover:text-white text-xs"
          >
            <MdOutlineAlternateEmail />
            <p>inavoluvathsav@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilesection;
