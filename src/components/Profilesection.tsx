import pfp from "../assets/luffy.jpeg";
import { MdOutlineAlternateEmail } from "react-icons/md";
const Profilesection = () => {
  return (
    <div className="m-5 flex items-center gap-5">
      <div className="">
        <img
          src={pfp}
          alt="profile here"
          loading="lazy"
          className="size-25 rounded-full"
        />
      </div>
      <div>
        <h2 className="text-[48px] font-semibold font-manrope leading-12 whitespace-nowrap sm:text-2xl">
          Inavolu Vathsav
        </h2>
        <div className="flex items-center gap-2 text-sm font-manrope font-normal text-gray-50/50">
          <p>Student</p>
          <i>.</i>
          <p>Dilettante</p>
          <i>.</i>
          <div
            onClick={() =>
              window.open(
                "https://mail.google.com/mail/?view=cm&fs=1&to=inavoluvathsav@gmail.com",
                "_blank",
              )
            }
            className="cursor-pointer flex items-center gap-1 hover:underline hover:underline-offset-2"
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
