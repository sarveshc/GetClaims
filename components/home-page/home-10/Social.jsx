const socialIcons = [
  {
    iconClass: "fab fa-facebook-f",
    link: "#",
    name: "Facebook",
  },
  {
    iconClass: "fab fa-twitter",
    link: "#",
    name: "Twitter",
  },
  {
    iconClass: "fab fa-linkedin-in",
    link: "#",
    name: "LinkedIn",
  },
];

const Social = () => {
  return (
    <ul className="d-flex social-icon style-none">
      {socialIcons.map((icon, index) => (
        <li key={index}>
          <a href={icon.link} target="_blank" rel="noopener noreferrer" aria-label={icon.name}>
            <i className={icon.iconClass} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Social;
