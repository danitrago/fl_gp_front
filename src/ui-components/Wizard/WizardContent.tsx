import classNames from "classnames";
import React, { ReactNode, useEffect, useRef, useState } from "react";

interface WizardContentProps {
  title: string;
  children?: ReactNode;
  className?: string;
  selectedStep: string;
}

const WizardContent = (props: WizardContentProps) => {
  const [show, setShow] = useState<Boolean>(false);
  const stepContentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log("RENDER");
    const parent: HTMLElement | null | undefined =
      stepContentRef.current?.parentElement;
    if (parent) {
      let selected: string | null = parent.getAttribute("data-selected");
      if (selected === props.title) {
        setShow(true);
      } else {
        setShow(false);
      }
    }
  }, [props.selectedStep]);
  return (
    <div
      ref={stepContentRef}
      data-role="wizard-step-content"
      data-title={props.title}
      className={classNames(
        "border p-4 rounded-md drop-shadow-xl bg-white",
        {
          hidden: !show,
        },
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default WizardContent;
