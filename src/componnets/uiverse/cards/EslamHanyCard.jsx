import styles from "./EslamHanyCard.module.css";

const EslamHanyCard = ({
  icon,
  title,
  description,
  width = "w-72",
  height = "h-60",
  iconSize = "text-5xl",
  titleSize = "text-base",
  descSize = "text-sm",
}) => {
  return (
    <div className={`${styles.card} ${width} ${height}`} title={title}>
      <div className={styles.cardContent}>
        <div className={`${styles.icon} ${iconSize}`}>{icon}</div>
        <div className={`${styles.title} ${titleSize}`}>{title}</div>
      </div>
      <div className={styles.cardHover}>
        <p className={`${styles.description} ${descSize}`}>{description}</p>
      </div>
    </div>
  );
};

export default EslamHanyCard;
