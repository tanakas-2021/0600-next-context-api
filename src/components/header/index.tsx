import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faInfoCircle,
  faBell,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  return (
    <header className={styles.main}>
      <div className={styles.contents}>
        <div className={styles.contentsLeft}>Turvo</div>
        <div className={styles.contentsRight}>
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <FontAwesomeIcon icon={faPlus} size="xs" color="white" />
            </li>
            <li className={styles.menuItem}>
              <FontAwesomeIcon icon={faInfoCircle} size="xs" color="white" />
            </li>
            <li className={styles.menuItem}>
              <FontAwesomeIcon icon={faBell} size="xs" color="white" />
            </li>
          </ul>
          <div className={styles.iconUser}>
            <FontAwesomeIcon icon={faUserCircle} size="xs" color="white" />
          </div>
        </div>
      </div>
    </header>
  );
};
