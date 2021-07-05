import { useState } from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import { InfoAlloIcon } from "@/components/Icons";

const PopInfo = () => {
  const [controlledVisible, setControlledVisible] = useState(false);
  const [step, setStep] = useState(0)
  const stepList = [
    "You are accessing Transvision with your Allo Bank profile. There are 2 ways to edit it.",
    "Go to Home and tap Allo Explore. Tap the settings icon to edit.",
    "Download Allo Bank and edit your profile in the app.",
  ];
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    trigger: "click",
    closeOnOutsideClick: false,
    visible: controlledVisible,
    onVisibleChange: setControlledVisible,
  });

  return (
    <>
      <div className="pop-info flex justify-center items-center absolute right-8">
        <button
          className="outline-remove active:opacity-70"
          onClick={() => setControlledVisible(!controlledVisible)}
        >
          <InfoAlloIcon className="w-8" />
        </button>
      </div>
      <div className="absolute top-16 -right-6">
        <div className="relative">
          {visible && (
            <div
              ref={setTooltipRef}
              className="p-4 gradient-blue mt-2 rounded-xl text-white text-sm w-11/12 max-w-sm relative"
            >
              <header className="font-bold">Info</header>
              <section className="text-xs relative mt-1">
                {stepList.filter((item, index) => {
                  return index === step;
                })}
              </section>
              <div className="arrow-tooltip" />
              <footer className="mt-2 flex justify-end">
                {step !== 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="p-1.5 px-4 rounded-full border-2 border-solid border-white text-xs mr-2 outline-none focus:outline-none"
                  >
                    Prev
                  </button>
                )}
                {step !== 2 && (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="p-1.5 px-4 rounded-full border-2 border-solid border-white text-xs bg-white text-blue-primary active:opacity-75 outline-none focus:outline-none"
                  >
                    Next
                  </button>
                )}
                {step === 2 && (
                  <button
                    onClick={() => {
                      setStep(0);
                      setControlledVisible(!controlledVisible);
                    }}
                    className="p-1.5 px-4 rounded-full border-2 border-solid border-white bg-white text-blue-primary active:opacity-75 text-xs outline-none focus:outline-none"
                  >
                    Finish
                  </button>
                )}
              </footer>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PopInfo;