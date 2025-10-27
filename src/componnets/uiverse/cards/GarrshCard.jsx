import React from "react";
import styles from "./GarrshCard.module.css";

const GarrshCard = ({
  icon,
  title,
  description,
  width = "w-80",
  height = "h-64",
  iconSize = "w-12 h-12",
  titleSize = "text-lg",
  descSize = "text-base",
}) => {
  return (
    <div className={`${styles.card} ${width} ${height}`}>
      <div className={styles.content}>
        <div className={`${styles.icon} ${iconSize}`}>
          {typeof icon === "string" && icon.startsWith("<svg") ? (
            <div dangerouslySetInnerHTML={{ __html: icon }} />
          ) : (
            icon
          )}
        </div>
        {title && <h3 className={`${styles.title} ${titleSize}`}>{title}</h3>}
        <p className={`${styles.para} ${descSize}`}>{description}</p>
      </div>
    </div>
  );
};

export default GarrshCard;
