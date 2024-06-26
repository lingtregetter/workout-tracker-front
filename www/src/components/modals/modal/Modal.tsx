import { FC, ReactNode, useEffect } from "react";
import "./Modal.scss";
import { createPortal } from "react-dom";

const Backdrop: FC<{ onCancel: Function }> = (props: any) => {
  return <div className="backdrop" onClick={props.onCancel}></div>;
};

const ModalOverlay: FC<{ children: ReactNode }> = (props) => {
  return <div className="modal">{props.children}</div>;
};

const Modal: FC<{ children: ReactNode; onCancel: Function }> = (props) => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    scrollToTop();
  }, []);

  return (
    <>
      {createPortal(
        <Backdrop onCancel={props.onCancel}></Backdrop>,
        document.getElementById("backdrop-root")!
      )}
      {createPortal(
        <ModalOverlay children={props.children}></ModalOverlay>,
        document.getElementById("overlay-root")!
      )}
    </>
  );
};

export default Modal;
