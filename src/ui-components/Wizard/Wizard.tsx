import classNames from "classnames";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Step, { StepProps } from "./Step";

interface WizardProps {
  children?: ReactNode;
  selectedStep: string;
  className?: string;
}

const Wizard = (props: WizardProps) => {
  const [steps, setSteps] = useState<StepProps[]>([]);
  const wizardRef = useRef<HTMLDivElement>(null);

  const goToStep: (target: string) => void = (target: string) => {
    const pos: number = steps.findIndex((step) => step.label === target);
    let dummie: StepProps[] = [...steps];
    let i: number = 0;
    dummie = dummie.map((step) => {
      return {
        ...step,
        status: "pending",
      };
    });
    while (i < pos) {
      dummie[i].status = "done";
      i++;
    }
    dummie[pos].status = "doing";
    setSteps(dummie);
  };

  useEffect(() => {
    // console.log("creating steps");
    let contents: NodeListOf<Element> | undefined =
      wizardRef.current?.querySelectorAll(
        'div[data-role="wizard-step-content"'
      );
    let dummie: StepProps[] = [];
    if (contents) {
      contents.forEach((element) => {
        dummie.push({
          label: element.getAttribute("data-title") || "Step",
          status: "pending",
        });
      });
      dummie[0].status = "doing";
    }
    setSteps(dummie);
  }, []);

  useEffect(() => {
    // console.log("Selecting:", props.selectedStep);
    if (steps.length > 0) {
      goToStep(props.selectedStep);
      let posTop = wizardRef.current?.offsetTop;
      if (posTop) {
        window.scrollTo(0, posTop - 40);
      }
    }
  }, [props.selectedStep]);

  return (
    <div
      className={classNames("mb-8", props.className)}
      data-role="wizard"
      data-selected={props.selectedStep}
      ref={wizardRef}
    >
      <div className="flex mb-8 w-full">
        {steps.map((step) => (
          <Step key={step.label} label={step.label} status={step.status} />
        ))}
      </div>
      {props.children}
    </div>
  );
};

export default Wizard;
