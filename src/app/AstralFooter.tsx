import styles from "./AstralFooter.module.css";

export default function AstralFooter() {
  return (
    <div className={styles.centered}>
      <div className="grid">
        <div>Cell 1</div>
        <div>Cell 2</div>
        <div>Cell 3</div>
        <div>Cell 4</div>
      </div>
    </div>
  );
}
