import { useState } from "react";

const avatarColors = ["#d97706", "#0f766e", "#7c3aed", "#be185d", "#4d7c0f", "#c2410c"];

const ContactAvatar = ({ name = "?", picture, id, className = "" }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  const color = avatarColors[Math.abs(Number(id) || 0) % avatarColors.length];

  if (picture && !imageFailed) {
    return (
      <img
        className={`contact-avatar ${className}`}
        src={picture}
        alt={name}
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <span
      className={`contact-avatar contact-avatar-fallback ${className}`}
      style={{ backgroundColor: color }}
      role="img"
      aria-label={name}
    >
      {initials || "?"}
    </span>
  );
};

export default ContactAvatar;
