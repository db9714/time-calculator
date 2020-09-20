import React from "react";
import { Modal } from "react-bootstrap";
import { Dots } from "react-activity";

import "react-activity/dist/react-activity.css";
import styles from "./css/ActivityLoader.module.css";

const ActivityLoader = (props) => (
  <Modal id="activityModal" show={props.show} centered className={styles.modalContainer}>
    <Dots size={80} color="#324767" />
  </Modal>
);

export default ActivityLoader;
