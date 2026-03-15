import { FiGithub, FiLinkedin } from "react-icons/fi";
import { TiSocialInstagram } from "react-icons/ti";
import { BsTwitter, BsTwitterX } from "react-icons/bs";
import { SiMinutemailer } from "react-icons/si";

const socials = [
  {
    icon: FiGithub,
    link: "https://github.com/vathsavv56",
  },
  {
    icon: FiLinkedin,
    link: "https://www.linkedin.com/in/vathsav-inavolu-561068368/",
  },
  {
    icon: TiSocialInstagram,
    link: "https://instagram.com/vathsavv56",
  },
  {
    icon: BsTwitter,
    hoverIcon: BsTwitterX,
    link: "https://twitter.com/yourusername",
  },
  {
    icon: SiMinutemailer,
    link: "https://mail.google.com/mail/?view=cm&fs=1&to=inavoluvathsav@gmail.com",
  },
];

const ContactSection = () => {
  return (
    <section className="mt-4 px-6">
      <p className="font-grosek text-[14px] font-normal leading-5 text-[lab(66.128_-0.0000298023_0.0000119209)] max-w-lg">
        I <strong className="text-gray-100/80">Love</strong> building things
        embracing the <strong className="text-gray-100/80">Struggle</strong> .
        and living an adventurous{" "}
        <strong className="text-gray-100/80">Life</strong>.
      </p>

      <div className="flex gap-4 mt-4">
        {socials.map((item, index) => {
          const Icon = item.icon;
          const HoverIcon = item.hoverIcon;

          return (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-gray-400 hover:text-white w-5 h-5 transition-all duration-200 hover:-translate-y-0.5"
            >
              {HoverIcon ? (
                <>
                  <Icon className="absolute inset-0 transition-all duration-300 group-hover:opacity-0 group-hover:scale-75" />
                  <HoverIcon className="absolute inset-0 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" />
                </>
              ) : (
                <Icon className="transition-transform duration-200 group-hover:scale-110" />
              )}
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default ContactSection;
