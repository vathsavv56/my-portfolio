import { FiGithub, FiLinkedin } from "react-icons/fi";
import { TiSocialInstagram } from "react-icons/ti";
import { BsTwitter, BsTwitterX } from "react-icons/bs";

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
    icon: BsTwitterX,
    link: "https://twitter.com/yourusername",
  },
];

const ContactSection = () => {
  return (
    <div className="mt-4 ml-24">
      <p className="font-grosek text-[14px] font-normal leading-5 text-[lab(66.128_-0.0000298023_0.0000119209)] max-w-lg">
        I <strong className="text-gray-100/80"> Love </strong> building things,
        embracing the <strong className="text-gray-100/80"> Struggle </strong>,
        and living an adventurous{" "}
        <strong className="text-gray-100/80"> Life</strong>.
      </p>

      <div className="flex gap-3 mt-4">
        {socials.map((item, index) => {
          const Icon = item.icon;
          return (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white text-lg"
            >
              <Icon />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ContactSection;
